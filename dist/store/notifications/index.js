"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.resetNotifications = exports.fetchNotifications = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const conversations_1 = require("../conversations");
const helpers_1 = require("@/lib/helpers");
const connections_1 = require("../connections");
exports.fetchNotifications = (0, toolkit_1.createAsyncThunk)("notifications/fetchNotifications", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await axiosInstance_1.default.get("/api/proxy/notifications/long-poll");
        if (response.data?.data?.length > 0) {
            dispatch((0, connections_1.fetchConnections)());
        }
        if (response.data?.messages?.length > 0) {
            dispatch((0, conversations_1.fetchConversations)());
        }
        return response.data;
    }
    catch (error) {
        return rejectWithValue("Failed to fetch notifications");
    }
});
const initialState = {
    data: [],
    messages: [],
    status: "idle",
    error: null,
};
const notificationsSlice = (0, toolkit_1.createSlice)({
    name: "notifications",
    initialState,
    reducers: {
        resetNotifications: (state) => {
            state.data = [];
            state.messages = [];
        },
        markAsRead: (state, action) => {
            state.data = state.data.filter((data) => data !== action.payload.data);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchNotifications.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchNotifications.fulfilled, (state, action) => {
            if (action.payload.data?.length > 0) {
                state.status = "succeeded";
                const newData = [...state.data, ...action.payload.data];
                const newMessages = [...state.messages, ...action.payload.messages];
                if (!(0, helpers_1.arraysEqual)(state.data, newData)) {
                    state.data = Array.from(new Set(newData));
                }
                if (!(0, helpers_1.arraysEqual)(state.messages, newMessages)) {
                    state.messages = Array.from(new Set(newMessages));
                }
            }
        })
            .addCase(exports.fetchNotifications.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});
_a = notificationsSlice.actions, exports.resetNotifications = _a.resetNotifications, exports.markAsRead = _a.markAsRead;
exports.default = notificationsSlice.reducer;
//# sourceMappingURL=index.js.map