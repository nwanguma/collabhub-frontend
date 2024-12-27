import { Conversation } from "@/common/constants";
export interface ConversationsSlice {
    data: Conversation[];
    latestConversation: string;
    isLoading: boolean;
    error: string | null;
    hasFetched: boolean;
}
export declare const fetchConversations: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addToConversations: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "conversations/addToConversations">, setLatestConversation: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "conversations/setLatestConversation">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<ConversationsSlice>>;
export default _default;
