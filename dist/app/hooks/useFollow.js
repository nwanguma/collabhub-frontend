"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFollow = void 0;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const navigation_1 = require("next/navigation");
const react_query_1 = require("@tanstack/react-query");
const conversations_1 = require("@/store/conversations");
const api_1 = require("@/api");
const connections_1 = require("@/store/connections");
const toast_1 = require("@/lib/helpers/toast");
const selectors_1 = require("@/lib/selectors");
const useFollow = (handleCloseModal) => {
    const router = (0, navigation_1.useRouter)();
    const { conversations } = (0, react_redux_1.useSelector)((state) => ({
        conversations: (0, selectors_1.selectConversationsData)(state),
    }));
    const dispatch = (0, react_redux_1.useDispatch)();
    const [justFollowed, setJustFollowed] = (0, react_1.useState)({});
    const followMutation = (0, react_query_1.useMutation)({
        mutationFn: (profileId) => (0, api_1.followUser)(profileId),
        onSuccess: (data, profileId) => {
            setJustFollowed((prevState) => ({
                ...prevState,
                [profileId]: true,
            }));
            dispatch((0, connections_1.fetchConnections)());
        },
        onError: (error) => {
            (0, toast_1.errorToastWithCustomError)(error);
        },
    });
    const unfollowMutation = (0, react_query_1.useMutation)({
        mutationFn: (profileId) => (0, api_1.unfollowUser)(profileId),
        onSuccess: (data, profileId) => {
            setJustFollowed((prevState) => ({
                ...prevState,
                [profileId]: false,
            }));
            dispatch((0, connections_1.fetchConnections)());
        },
        onError: (error) => {
            (0, toast_1.errorToastWithCustomError)(error);
        },
    });
    const initiateConversationsMutation = (0, react_query_1.useMutation)({
        mutationFn: (recipientId) => (0, api_1.initiateConversation)(recipientId),
        onSuccess: (data) => {
            const isExistingConversation = conversations.find((conversation) => {
                return conversation.id === data.id;
            });
            if (isExistingConversation) {
                dispatch((0, conversations_1.setLatestConversation)(data.id));
            }
            else {
                dispatch((0, conversations_1.addToConversations)(data));
            }
            setTimeout(() => {
                router.push("/dashboard/messages");
            }, 2000);
        },
        onError: (error) => {
            (0, toast_1.errorToastWithCustomError)(error);
        },
        onSettled: () => {
            handleCloseModal && handleCloseModal();
        },
    });
    const handleFollow = (profileId) => {
        followMutation.mutate(profileId);
    };
    const handleUnfollow = (profileId) => {
        unfollowMutation.mutate(profileId);
    };
    const handleInitiateConversations = (recipientId) => {
        initiateConversationsMutation.mutate(recipientId);
    };
    return {
        handleInitiateConversations,
        handleFollow,
        handleUnfollow,
        justFollowed,
    };
};
exports.useFollow = useFollow;
//# sourceMappingURL=useFollow.js.map