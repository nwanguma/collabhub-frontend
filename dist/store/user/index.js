"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.setUser = exports.fetchCurrentUser = exports.fetchUser = void 0;
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    data: {
        id: "",
        email: "",
        created_at: "",
        status: "",
        last_seen: new Date(),
        profile: {
            id: "",
            first_name: "",
            views: 0,
            email: "string",
            last_name: "",
            avatar: "",
            bio: "",
            location: "",
            phone: "",
            website: "",
            linkedin: "",
            github: "",
            resume: "",
            languages: [],
            comments: [],
            reactions: [],
            heading: "",
            title: "",
            skills: [],
            followers: [],
            following: [],
        },
    },
    error: null,
};
exports.fetchUser = (0, toolkit_1.createAsyncThunk)("user/fetchUser", async (userId) => {
    const response = await axiosInstance_1.default.get(`/api/proxy/users/${userId}`);
    return response.data?.data;
});
exports.fetchCurrentUser = (0, toolkit_1.createAsyncThunk)("user/fetchCurrentUser", async () => {
    const response = await axiosInstance_1.default.get(`/api/proxy/users/me`);
    return response.data?.data;
});
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        updateProfile: (state, action) => {
            state.data.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(exports.fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(exports.fetchUser.rejected, (state, action) => {
            state.error = action.error?.message || "Failed to fetch user";
        });
        builder.addCase(exports.fetchCurrentUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(exports.fetchCurrentUser.rejected, (state, action) => {
            state.error = action.error?.message || "Failed to fetch user";
        });
    },
});
_a = userSlice.actions, exports.setUser = _a.setUser, exports.updateProfile = _a.updateProfile;
exports.default = userSlice.reducer;
//# sourceMappingURL=index.js.map