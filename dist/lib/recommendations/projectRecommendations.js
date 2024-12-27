"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recommendProjects = ({ currentUser, projects, }) => {
    const { profile: userProfile } = currentUser;
    return projects
        .map((project) => {
        let score = 0;
        const skillMatches = project.description
            .split(" ")
            .filter((word) => userProfile.skills.map((skill) => skill.title).includes(word)).length;
        score += skillMatches * 5;
        if (project.location === userProfile.location) {
            score += 3;
        }
        const recentUpdate = (new Date(project.updated_at).getTime() - Date.now()) /
            (1000 * 3600 * 24);
        if (recentUpdate < 30) {
            score += 2;
        }
        const popularityScore = Math.min(project?.collaborators?.length || 0, 50) / 5;
        score += popularityScore;
        return { project, score };
    })
        .sort((a, b) => b.score - a.score)
        .map((result) => result.project);
};
exports.default = recommendProjects;
//# sourceMappingURL=projectRecommendations.js.map