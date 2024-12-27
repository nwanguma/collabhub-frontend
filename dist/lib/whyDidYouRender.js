"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(react_1.default, {
        trackAllPureComponents: true,
        trackHooks: true,
        logOnDifferentValues: true,
    });
}
//# sourceMappingURL=whyDidYouRender.js.map