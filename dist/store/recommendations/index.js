"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecommendations = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const initialState = {
    profiles: [],
    projects: [],
    profilesToFollow: [],
    isLoading: false,
    error: null,
    hasFetched: false,
};
exports.fetchRecommendations = (0, toolkit_1.createAsyncThunk)("recommendations/fetchRecommendations", async () => {
    const response = await axiosInstance_1.default.get("/api/proxy/recommendations");
    return response.data?.data;
});
const recommendationsSlice = (0, toolkit_1.createSlice)({
    name: "recommendations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(exports.fetchRecommendations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(exports.fetchRecommendations.fulfilled, (state, action) => {
            state.isLoading = false;
            const { profiles, projects, profilesToFollow } = action.payload;
            state.profiles = profiles || [];
            state.projects = projects || [];
            state.profilesToFollow = profilesToFollow || [];
            state.hasFetched = true;
            state.error = null;
        });
        builder.addCase(exports.fetchRecommendations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to fetch recommendations";
        });
    },
});
exports.default = recommendationsSlice.reducer;
//# sourceMappingURL=index.js.map