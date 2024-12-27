"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkills = void 0;
const react_query_1 = require("@tanstack/react-query");
const axiosInstance_1 = __importDefault(require("@/lib/axiosInstance"));
const fetchSkills = async () => {
    const result = await axiosInstance_1.default.get("/api/proxy/skills");
    return result.data?.data;
};
const useSkills = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ["skills"],
        queryFn: fetchSkills,
        staleTime: Infinity,
        cacheTime: Infinity,
    });
};
exports.useSkills = useSkills;
//# sourceMappingURL=useSkills.js.map