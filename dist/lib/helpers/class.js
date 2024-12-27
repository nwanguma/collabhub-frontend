"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, response) {
        super(message);
        this.name = this.constructor.name;
        this.response = response;
        const error = response?.data?.error;
        if (Array.isArray(error)) {
            this.message = error[0];
        }
        else if (typeof error === "string") {
            this.message = error;
        }
        else {
            this.message =
                "An error occurred while processing your request. Please try again later.";
        }
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=class.js.map