"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recommendEvents = ({ currentUser, events, }) => {
    const { profile: userProfile } = currentUser;
    const today = new Date();
    return events
        .filter((event) => new Date(event.event_end_date) > today)
        .map((event) => {
        let score = 0;
        const daysUntilEvent = (new Date(event.event_start_date).getTime() - today.getTime()) /
            (1000 * 3600 * 24);
        score += Math.max(0, 10 - daysUntilEvent);
        const skillMatches = userProfile.skills.some((skill) => event.description?.includes(skill.title));
        if (skillMatches)
            score += 5;
        if (event.location === userProfile.location) {
            score += 3;
        }
        else if (!event.location) {
            score += 2;
        }
        return { event, score };
    })
        .sort((a, b) => b.score - a.score)
        .map((result) => result.event);
};
exports.default = recommendEvents;
//# sourceMappingURL=eventRecommendations.js.map