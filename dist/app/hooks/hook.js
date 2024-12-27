"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
const react_1 = require("react");
const useFetch = (url, options) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = (await response.json());
                setData(result);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, options]);
    return { data, loading, error };
};
exports.useFetch = useFetch;
//# sourceMappingURL=hook.js.map