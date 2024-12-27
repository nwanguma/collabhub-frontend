export declare const fetchConnections: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setConnections: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "connections/setConnections">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<{
    data: {
        followers: any[];
        following: any[];
    };
    error: boolean;
    isLoading: boolean;
}>>;
export default _default;
