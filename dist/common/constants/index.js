"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatus = exports.mapLanguageToFlag = exports.ActivityTypes = void 0;
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes["FOLLOW"] = "follow";
    ActivityTypes["LIKE"] = "like";
    ActivityTypes["COMMENT"] = "comment";
})(ActivityTypes || (exports.ActivityTypes = ActivityTypes = {}));
exports.mapLanguageToFlag = {
    english: "england",
    french: "france",
    spanish: "spain",
    italian: "italy",
    german: "germany",
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["IN_PROGRESS"] = "in progress";
    ProjectStatus["PAUSED"] = "paused";
    ProjectStatus["NEED_COLLABORATORS"] = "need collaborators";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
//# sourceMappingURL=index.js.map