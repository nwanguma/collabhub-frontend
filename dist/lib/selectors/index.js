"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectLatestConversation = exports.selectConversationsError = exports.selectConversationsData = exports.selectConnectionsData = exports.selectCurrentUserError = exports.selectCurrentUserProfileUpdateStatus = exports.selectCurrentUser = exports.selectRecommendationsError = exports.selectRecommendationsHasFetched = exports.selectIsRecommendationsLoading = exports.selectProjectRecommendations = exports.selectProfilesRecommendations = void 0;
const reselect_1 = require("reselect");
const selectRecommendations = (state) => state.recommendations;
const selectUser = (state) => state.user;
const selectConnections = (state) => state.connections;
const selectConversations = (state) => state.conversations;
exports.selectProfilesRecommendations = (0, reselect_1.createSelector)(selectRecommendations, (recommendations) => [...recommendations.profiles]);
exports.selectProjectRecommendations = (0, reselect_1.createSelector)(selectRecommendations, (recommendations) => [...recommendations.projects]);
exports.selectIsRecommendationsLoading = (0, reselect_1.createSelector)(selectRecommendations, (recommendations) => !!recommendations.isLoading);
exports.selectRecommendationsHasFetched = (0, reselect_1.createSelector)(selectRecommendations, (recommendations) => !!recommendations.hasFetched);
exports.selectRecommendationsError = (0, reselect_1.createSelector)(selectRecommendations, (recommendations) => recommendations.error);
exports.selectCurrentUser = (0, reselect_1.createSelector)(selectUser, (user) => user.data);
exports.selectCurrentUserProfileUpdateStatus = (0, reselect_1.createSelector)(selectUser, (user) => user?.data?.profile?.requires_update);
exports.selectCurrentUserError = (0, reselect_1.createSelector)(selectUser, (user) => user?.error);
exports.selectConnectionsData = (0, reselect_1.createSelector)(selectConnections, (connections) => Object.assign({}, connections.data));
exports.selectConversationsData = (0, reselect_1.createSelector)(selectConversations, (conversations) => typeof conversations?.data === "object" && conversations?.data?.length
    ? [...conversations.data]
    : []);
exports.selectConversationsError = (0, reselect_1.createSelector)(selectConversations, (conversations) => conversations?.error);
exports.selectLatestConversation = (0, reselect_1.createSelector)(selectConversations, (conversations) => conversations?.latestConversation);
//# sourceMappingURL=index.js.map