import { createSelector } from "reselect";

import { RootState } from "../../store";

const selectRecommendations = (state: RootState) => state.recommendations;
const selectUser = (state: RootState) => state.user;
const selectConnections = (state: RootState) => state.connections;
const selectConversations = (state: RootState) => state.conversations;

export const selectProfilesRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations?.profiles]
);

export const selectProjectRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations?.projects]
);

export const selectIsRecommendationsLoading = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.isLoading
);

export const selectRecommendationsHasFetched = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.hasFetched
);

export const selectRecommendationsError = createSelector(
  selectRecommendations,
  (recommendations) => recommendations.error
);

export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.data
);

export const selectCurrentUserProfileUpdateStatus = createSelector(
  selectUser,
  (user) => user?.data?.profile?.requires_update
);

export const selectCurrentUserError = createSelector(
  selectUser,
  (user) => user?.error
);

export const selectConnectionsData = createSelector(
  selectConnections,
  (connections) => Object.assign({}, connections.data)
);

export const selectConversationsData = createSelector(
  selectConversations,
  (conversations) =>
    typeof conversations?.data === "object" && conversations?.data?.length
      ? [...conversations.data]
      : []
);

export const selectConversationsError = createSelector(
  selectConversations,
  (conversations) => conversations?.error
);

export const selectLatestConversation = createSelector(
  selectConversations,
  (conversations) => conversations?.latestConversation
);
