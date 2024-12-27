export declare const useFetch: <T>(url: string, options?: RequestInit) => {
    data: T;
    loading: boolean;
    error: Error;
};
