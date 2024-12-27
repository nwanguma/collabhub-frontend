"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoToast = exports.errorToastWithCustomError = exports.errorToast = exports.successToast = void 0;
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const _1 = require(".");
const successToast = (message, id) => react_hot_toast_1.default.success((0, _1.capitalizeFirstLetter)(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
        backgroundColor: "#f0fdf4",
        fontSize: "15px",
    },
    iconTheme: {
        primary: "#f7f7f7",
        secondary: "#16a34a",
    },
});
exports.successToast = successToast;
const errorToast = (message, id) => react_hot_toast_1.default.error((0, _1.capitalizeFirstLetter)(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
        backgroundColor: "#fff1f2",
        fontSize: "15px",
    },
    iconTheme: {
        primary: "#f7f7f7",
        secondary: "#dc2626",
    },
});
exports.errorToast = errorToast;
const errorToastWithCustomError = (error, id) => {
    const message = (0, _1.formatErrorResponse)(error);
    return (0, exports.errorToast)(message, id);
};
exports.errorToastWithCustomError = errorToastWithCustomError;
const infoToast = (message, id) => (0, react_hot_toast_1.default)((0, _1.capitalizeFirstLetter)(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
        backgroundColor: "#dbeafe",
        fontSize: "15px",
    },
    iconTheme: {
        primary: "#f7f7f7",
        secondary: "#1d4ed8",
    },
});
exports.infoToast = infoToast;
//# sourceMappingURL=toast.js.map