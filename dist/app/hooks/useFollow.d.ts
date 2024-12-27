interface JustFollowed {
    [key: string]: boolean;
}
export declare const useFollow: (handleCloseModal?: () => void) => {
    handleInitiateConversations: (recipientId: string) => void;
    handleFollow: (profileId: string) => void;
    handleUnfollow: (profileId: string) => void;
    justFollowed: JustFollowed;
};
export {};
