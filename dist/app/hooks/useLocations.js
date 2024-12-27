"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocations = void 0;
const react_query_1 = require("@tanstack/react-query");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const fetchLocations = async () => {
    const result = await axiosInstance_1.default.get("/api/proxy/locations");
    return result.data?.data;
};
const useLocations = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ["locations"],
        queryFn: fetchLocations,
        staleTime: Infinity,
        cacheTime: Infinity,
    });
};
exports.useLocations = useLocations;
//# sourceMappingURL=useLocations.js.map