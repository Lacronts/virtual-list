import React from 'react';
interface IProps {
    renderItem: (idx: number, style: React.CSSProperties) => JSX.Element;
    viewHeight: number;
    itemHeight: number;
    itemsCount: number;
}
declare const AsyncVirtualList: ({ renderItem, viewHeight, itemHeight, itemsCount }: IProps) => JSX.Element;
export { AsyncVirtualList };
