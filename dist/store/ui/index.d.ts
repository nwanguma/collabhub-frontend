export declare const setPageLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "ui/setPageLoading">, setMainFeedSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "ui/setMainFeedSettings">;
declare const _default: import("redux").Reducer<{
    mainFeedSettings: {
        contentTypeFrom: string;
        contentType: string;
    };
    isPageLoading: boolean;
}>;
export default _default;
