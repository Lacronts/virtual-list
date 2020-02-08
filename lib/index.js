"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/styles");
var useStyles = styles_1.makeStyles(function () {
    return styles_1.createStyles({
        view: function (props) { return ({
            height: props.itemHeight * props.itemsCount + "px"
        }); },
        wrapper: function (props) { return ({
            height: props.viewHeight + "px",
            position: 'relative',
            border: '1px solid red',
            overflow: ' hidden scroll'
        }); }
    });
});
var AsyncVirtualList = function (_a) {
    var renderItem = _a.renderItem, viewHeight = _a.viewHeight, itemHeight = _a.itemHeight, itemsCount = _a.itemsCount;
    var _b = react_1.useState(0), scrollTop = _b[0], setScroll = _b[1];
    var divRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        var scrollableDivRef = divRef.current;
        (_a = scrollableDivRef) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', handleScroll);
        return function () { var _a; return (_a = scrollableDivRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', handleScroll); };
    }, []);
    var handleScroll = function (event) {
        var _a;
        var offset = ((_a = divRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0;
        if (event.target !== divRef.current || offset < 0) {
            return;
        }
        setScroll(offset);
    };
    var classes = useStyles({ renderItem: renderItem, viewHeight: viewHeight, itemHeight: itemHeight, itemsCount: itemsCount });
    var startIdx = Math.max(0, Math.floor(scrollTop / itemHeight - 2));
    var lastIdx = Math.min(itemsCount, startIdx + viewHeight / itemHeight + 4);
    var ids = [];
    var idx = startIdx;
    while (idx < lastIdx) {
        ids.push(idx);
        idx++;
    }
    return (react_1["default"].createElement("div", { className: classes.wrapper, ref: divRef },
        react_1["default"].createElement("div", { className: classes.view }),
        ids.map(function (idx) { return renderItem(idx, computeStyle(idx, itemHeight)); })));
};
exports.AsyncVirtualList = AsyncVirtualList;
function computeStyle(idx, itemHeight) {
    var style = {
        position: 'absolute',
        width: '100%',
        top: idx * itemHeight + "px"
    };
    return style;
}
