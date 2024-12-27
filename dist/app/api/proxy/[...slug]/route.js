"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCH = exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const axios_1 = __importDefault(require("axios"));
const perf_hooks_1 = require("perf_hooks");
const crypto_1 = __importDefault(require("crypto"));
const server_1 = require("next/server");
async function parseRequestBody(req) {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const body = await req.json();
        return body;
    }
    else if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await req.formData();
        const body = {};
        formData.forEach((value, key) => {
            body[key] = value;
        });
        return body;
    }
    else if (contentType.includes("multipart/form-data")) {
        return await req.formData();
    }
    return null;
}
async function handler(req) {
    const start = perf_hooks_1.performance.now();
    const url = new URL(req.url);
    const slug = url.pathname.split("/api/proxy/")[1];
    const nonce = crypto_1.default.randomBytes(16).toString("base64");
    const reqBody = await parseRequestBody(req);
    try {
        const formData = reqBody instanceof FormData ? reqBody : null;
        const data = formData ? formData : reqBody;
        const isMultipart = req.headers
            .get("content-type")
            ?.includes("multipart/form-data");
        const response = await (0, axios_1.default)({
            method: req.method,
            url: `${process.env.BACKEND_URL}/${slug}${url.search ? url.search : ""}`,
            headers: {
                ...req.headers,
                "x-forwarded-for": req.headers.get("x-forwarded-for") || req.headers.get("host") || "",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
                "x-client-api-key": process.env.CLIENT_API_KEY,
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "Content-Security-Policy": `default-src 'self'; script-src 'nonce-${nonce}'`,
                Authorization: req.headers.get("Authorization") || req.headers.get("authorization"),
                ...(isMultipart && { "Content-Type": req.headers.get("content-type") }),
            },
            data,
            timeout: 40000,
        });
        console.log(`[PROXY] ${req.method} ${slug} - ${response.status} - ${perf_hooks_1.performance.now() - start}ms`);
        const responseHeaders = new Headers(response.headers);
        const nextResponse = server_1.NextResponse.json(response.data, {
            status: response.status,
            headers: responseHeaders,
        });
        return nextResponse;
    }
    catch (error) {
        const status = error.response?.status || 500;
        console.error(`[PROXY ERROR] ${req.method} ${slug} - ${status} - ${perf_hooks_1.performance.now() - start}ms: ${error.message}`);
        return server_1.NextResponse.json({
            error: status == 500 || !error.response.data?.message
                ? "An error occurred while processing your request. Please try again later."
                : error.response.data?.message,
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        }, { status });
    }
}
exports.GET = handler;
exports.POST = handler;
exports.PUT = handler;
exports.DELETE = handler;
exports.PATCH = handler;
//# sourceMappingURL=route.js.map