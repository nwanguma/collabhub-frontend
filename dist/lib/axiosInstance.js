"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = require("next-auth/react");
const store_1 = require("@/store");
const axiosInstance = axios_1.default.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const excludedRoutes = [
    "/api/proxy/profile",
    "/api/proxy/files/upload",
    "/auth",
];
axiosInstance.interceptors.request.use(async (config) => {
    const profileRequiresUpdate = store_1.store.getState()?.user?.data?.profile?.requires_update;
    const isExcludedRoute = excludedRoutes.some((route) => config.url?.startsWith(route) && !config.url?.includes("follow"));
    if (profileRequiresUpdate &&
        config.method &&
        config.method.toLowerCase() !== "get" &&
        !isExcludedRoute) {
        throw new Error("Please update your profile to unlock full access!");
    }
    const session = await (0, react_1.getSession)();
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        (0, react_1.signOut)();
        localStorage.clear();
    }
    return Promise.reject(error);
});
exports.default = axiosInstance;
//# sourceMappingURL=axiosInstance.js.map