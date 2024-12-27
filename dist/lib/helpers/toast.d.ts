import { CustomError } from "./class";
export declare const successToast: (message: string, id?: string) => string;
export declare const errorToast: (message: string, id?: string) => string;
export declare const errorToastWithCustomError: (error: CustomError, id?: string) => string;
export declare const infoToast: (message: string, id?: string) => string;
