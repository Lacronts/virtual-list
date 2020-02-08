import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

interface IProps {
  renderItem: (idx: number, style: React.CSSProperties) => JSX.Element;
  viewHeight: number;
  itemHeight: number;
  itemsCount: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    view: (props: IProps) => ({
      height: `${props.itemHeight * props.itemsCount}px`
    }),
    wrapper: (props: IProps) => ({
      height: `${props.viewHeight}px`,
      position: 'relative',
      border: '1px solid red',
      overflow: ' hidden scroll'
    })
  })
);

const AsyncVirtualList = ({
  renderItem,
  viewHeight,
  itemHeight,
  itemsCount
}: IProps) => {
  const [scrollTop, setScroll] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollableDivRef = divRef.current;
    scrollableDivRef?.addEventListener('scroll', handleScroll);
    return () => scrollableDivRef?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (event: Event) => {
    const offset = divRef.current?.scrollTop || 0;
    if (event.target !== divRef.current || offset < 0) {
      return;
    }
    setScroll(offset);
  };

  const classes = useStyles({ renderItem, viewHeight, itemHeight, itemsCount });

  const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight - 2));
  const lastIdx = Math.min(itemsCount, startIdx + viewHeight / itemHeight + 4);

  let ids: number[] = [];
  let idx = startIdx;
  while (idx < lastIdx) {
    ids.push(idx);
    idx++;
  }

  return (
    <div className={classes.wrapper} ref={divRef}>
      <div className={classes.view} />
      {ids.map(idx => renderItem(idx, computeStyle(idx, itemHeight)))}
    </div>
  );
};

function computeStyle(idx: number, itemHeight: number) {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    top: `${idx * itemHeight}px`
  };
  return style;
}

export { AsyncVirtualList };
