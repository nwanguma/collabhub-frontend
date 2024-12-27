export interface DateInfo {
    dayOfWeek: string;
    day: string;
    month: string;
}
export declare enum FormatDateOptionsEnum {
    LONG = "long",
    SHORT = "short"
}
export interface FormatDateOptions {
    monthType: FormatDateOptionsEnum;
    weekdayType: FormatDateOptionsEnum;
}
export interface ErrorResponse {
    data?: {
        error?: string | string[];
    };
}
export declare const feedbackTextMapper: {
    create: (tag: string) => string;
    delete: (tag: string) => string;
    update: (tag: string) => string;
};
