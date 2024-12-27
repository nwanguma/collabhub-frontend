export declare const fetchNotifications: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
interface NotificationState {
    data: string[];
    messages: string[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
export declare const resetNotifications: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notifications/resetNotifications">, markAsRead: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "notifications/markAsRead">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<NotificationState>>;
export default _default;
