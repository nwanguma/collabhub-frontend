"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.fetchMessagesLong = exports.fetchMessages = exports.deleteComment = exports.createReaction = exports.createComment = exports.initiateConversation = exports.unfollowUser = exports.followUser = exports.fetchProfiles = exports.fetchProfile = exports.fetchProjects = exports.deleteProjectFeedback = exports.deleteProject = exports.fetchProject = exports.fetchProjectsData = exports.fetchActivities = void 0;
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const fetchActivities = async () => {
    try {
        const response = await axiosInstance_1.default.get("/api/proxy/activities");
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchActivities = fetchActivities;
const fetchProjectsData = async (pagination, contentType) => {
    try {
        const response = await axiosInstance_1.default.get("/api/proxy/projects", {
            params: {
                limit: pagination.limit,
                page: pagination.page,
                contentType,
            },
        });
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchProjectsData = fetchProjectsData;
const fetchProject = async (id) => {
    try {
        const response = await axiosInstance_1.default.get(`/api/proxy/projects/${id}`);
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchProject = fetchProject;
const deleteProject = async (projectId) => {
    const response = await axiosInstance_1.default.delete(`/api/proxy/projects/${projectId}`);
    return response.data.data;
};
exports.deleteProject = deleteProject;
const deleteProjectFeedback = async (projectId, feedbackId) => {
    const response = await axiosInstance_1.default.delete(`/api/proxy/projects/${projectId}/${feedbackId}/feedbacks`);
    return response.data.data;
};
exports.deleteProjectFeedback = deleteProjectFeedback;
const fetchProjects = async (pagination, filters) => {
    try {
        const { skills, ...rest } = filters;
        const response = await axiosInstance_1.default.get("/api/proxy/projects", {
            params: {
                contentType: "all",
                ...pagination,
                ...rest,
                ...(skills && { skills: [skills] }),
            },
        });
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchProjects = fetchProjects;
const fetchProfile = async (id) => {
    try {
        const response = await axiosInstance_1.default.get(`/api/proxy/profiles/${id}`);
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchProfile = fetchProfile;
const fetchProfiles = async (pagination, filters) => {
    try {
        const { skills, type, ...rest } = filters;
        const response = await axiosInstance_1.default.get("/api/proxy/profiles", {
            params: {
                ...pagination,
                ...rest,
                ...(skills && { skills: [skills] }),
                ...(type && { is_mentor: true }),
            },
        });
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
};
exports.fetchProfiles = fetchProfiles;
const followUser = async (profileId) => {
    const response = await axiosInstance_1.default.patch(`/api/proxy/profiles/${profileId}/follow`);
    return response.data.data;
};
exports.followUser = followUser;
const unfollowUser = async (profileId) => {
    const response = await axiosInstance_1.default.patch(`/api/proxy/profiles/${profileId}/unfollow`);
    return response.data.data;
};
exports.unfollowUser = unfollowUser;
const initiateConversation = async (recipientId) => {
    const response = await axiosInstance_1.default.post(`/api/proxy/conversations/${recipientId}`);
    return response.data?.data;
};
exports.initiateConversation = initiateConversation;
const createComment = async (resource, resourceId, data) => {
    const response = await axiosInstance_1.default.post(`/api/proxy/${resource}/${resourceId}/comments`, data);
    return response.data.data;
};
exports.createComment = createComment;
const createReaction = async (resource, resourceId) => {
    const response = await axiosInstance_1.default.post(`/api/proxy/${resource}/${resourceId}/reactions`, {
        type: "like",
    });
    return response.data.data;
};
exports.createReaction = createReaction;
const deleteComment = async (resource, resourceId, commentId) => {
    const response = await axiosInstance_1.default.delete(`/api/proxy/${resource}/${resourceId}/${commentId}/comments`);
    return response.data.data;
};
exports.deleteComment = deleteComment;
const fetchMessages = async (conversationId, pagination) => {
    const result = await axiosInstance_1.default.get(`/api/proxy/conversations/${conversationId}/messages`, {
        params: {
            limit: pagination.limit,
            page: pagination.page,
        },
    });
    return result.data.data;
};
exports.fetchMessages = fetchMessages;
const fetchMessagesLong = async (conversationId, pagination) => {
    const result = await axiosInstance_1.default.get(`/api/proxy/conversations/${conversationId}/messages/long-poll`, {
        params: {
            limit: pagination.limit,
            page: pagination.page,
        },
    });
    return result.data.data;
};
exports.fetchMessagesLong = fetchMessagesLong;
const sendMessage = async (message) => {
    const result = await axiosInstance_1.default.post(`/api/proxy/messages`, message);
    return result.data.data;
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map