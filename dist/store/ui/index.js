"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMainFeedSettings = exports.setPageLoading = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const uiSlice = (0, toolkit_1.createSlice)({
    name: "ui",
    initialState: {
        mainFeedSettings: {
            contentTypeFrom: "following",
            contentType: "projects",
        },
        isPageLoading: false,
    },
    reducers: {
        setPageLoading(state, action) {
            state.isPageLoading = action.payload;
        },
        setMainFeedSettings(state, action) {
            state.mainFeedSettings = action.payload;
        },
    },
});
_a = uiSlice.actions, exports.setPageLoading = _a.setPageLoading, exports.setMainFeedSettings = _a.setMainFeedSettings;
exports.default = uiSlice.reducer;
//# sourceMappingURL=index.js.map