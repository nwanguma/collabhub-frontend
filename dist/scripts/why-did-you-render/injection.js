"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const why_did_you_render_1 = __importDefault(require("@welldone-software/why-did-you-render"));
console.debug("Applying whyDidYouRender, to help you locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render");
(0, why_did_you_render_1.default)(react_1.default, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOwnerReasons: true,
    collapseGroups: true,
    include: [/./],
    logOnDifferentValues: true,
});
//# sourceMappingURL=injection.js.map