import { User } from "@/common/constants";
interface InitialState {
    data: User;
    error: null | string;
}
export declare const fetchUser: import("@reduxjs/toolkit").AsyncThunk<any, string, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchCurrentUser: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setUser">, updateProfile: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/updateProfile">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<InitialState>>;
export default _default;
