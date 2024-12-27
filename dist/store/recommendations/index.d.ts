import { Profile, Project } from "@/common/constants";
interface RecommendationsState {
    profiles: Profile[];
    profilesToFollow: Profile[];
    projects: Project[];
    isLoading: boolean;
    error: string | null;
    hasFetched: boolean;
}
export declare const fetchRecommendations: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<RecommendationsState>;
export default _default;
