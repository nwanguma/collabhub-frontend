"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recommendProfiles = ({ currentUser, profiles, }) => {
    const { profile: userProfile } = currentUser;
    return profiles
        .filter((profile) => profile.id !== currentUser.id)
        .map((profile) => {
        let score = 0;
        const skillMatches = profile.skills.filter((skill) => userProfile.skills.includes(skill.title)).length;
        score += skillMatches * 5;
        if (profile.location === userProfile.location) {
            score += 3;
        }
        const activityScore = Math.min(profile.views, 100) / 10;
        score += activityScore;
        return { profile, score };
    })
        .sort((a, b) => b.score - a.score)
        .map((result) => result.profile);
};
exports.default = recommendProfiles;
//# sourceMappingURL=profileRecommendations.js.map