import { ErrorResponse } from "./constants";
export declare class CustomError extends Error {
    response?: ErrorResponse;
    constructor(message: string, response?: ErrorResponse);
}
