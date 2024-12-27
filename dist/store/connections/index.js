"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConnections = exports.fetchConnections = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const initialState = {
    data: {
        followers: [],
        following: [],
    },
    error: false,
    isLoading: false,
};
exports.fetchConnections = (0, toolkit_1.createAsyncThunk)("connections/fetchConnections", async () => {
    const response = await axiosInstance_1.default.get("/api/proxy/profiles/connections/all");
    return response.data?.data;
});
const connectionsSlice = (0, toolkit_1.createSlice)({
    name: "connections",
    initialState,
    reducers: {
        setConnections: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(exports.fetchConnections.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});
exports.setConnections = connectionsSlice.actions.setConnections;
exports.default = connectionsSlice.reducer;
//# sourceMappingURL=index.js.map