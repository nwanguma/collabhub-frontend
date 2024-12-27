"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLatestConversation = exports.addToConversations = exports.fetchConversations = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const initialState = {
    data: [],
    latestConversation: "",
    hasFetched: false,
    isLoading: false,
    error: null,
};
exports.fetchConversations = (0, toolkit_1.createAsyncThunk)("conversations/fetchConversations", async () => {
    const response = await axiosInstance_1.default.get("/api/proxy/conversations", {
        params: {
            limit: 1000,
            page: 1,
        },
    });
    return response.data?.data;
});
const conversationsSlice = (0, toolkit_1.createSlice)({
    name: "conversations",
    initialState,
    reducers: {
        addToConversations: (state, action) => {
            state.data = [action.payload, ...state.data];
        },
        setLatestConversation: (state, action) => {
            state.latestConversation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(exports.fetchConversations.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(exports.fetchConversations.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.hasFetched = true;
        });
        builder.addCase(exports.fetchConversations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message || "Failed to fetch conversations";
        });
    },
});
_a = conversationsSlice.actions, exports.addToConversations = _a.addToConversations, exports.setLatestConversation = _a.setLatestConversation;
exports.default = conversationsSlice.reducer;
//# sourceMappingURL=index.js.map