"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const axios_1 = __importDefault(require("axios"));
const authOptions = {
    providers: [
        (0, credentials_1.default)({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                token: { label: "Token", type: "token" },
            },
            async authorize(credentials) {
                if (!credentials)
                    return null;
                let authCredentials;
                if (credentials.token &&
                    credentials.token === process.env.GUEST_AUTH_TOKEN) {
                    authCredentials = {
                        email: process.env.GUEST_AUTH_EMAIL,
                        password: process.env.GUEST_AUTH_PASSWORD,
                    };
                }
                else {
                    authCredentials = {
                        email: credentials.email,
                        password: credentials.password,
                    };
                }
                try {
                    const response = await axios_1.default.post(`${process.env.BACKEND_URL}/auth/login`, authCredentials, {
                        headers: {
                            "x-client-api-key": process.env.CLIENT_API_KEY,
                        },
                    });
                    const result = response.data?.data;
                    if (result && response.status === 201) {
                        return {
                            ...result.user,
                            accessToken: result.access_token,
                        };
                    }
                }
                catch (error) {
                    return null;
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const isUserWithTokens = (user) => user.accessToken !== undefined;
                if (isUserWithTokens(user)) {
                    return {
                        accessToken: user.accessToken,
                    };
                }
            }
            return token;
        },
        async session({ session, token, }) {
            const tokenWithAccess = token;
            session.accessToken = tokenWithAccess.accessToken;
            session.error = tokenWithAccess.error;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    debug: process.env.NODE_ENV === "development",
};
async function refreshAccessToken(token) {
    try {
        const response = await axios_1.default.post(`${process.env.BACKEND_URL}/auth/refresh`, {
            refresh_token: token.refreshToken,
        }, {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`,
                "x-client-api-key": process.env.CLIENT_API_KEY,
            },
        });
        const refreshedTokens = response.data.data;
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
        };
    }
    catch (error) {
        console.error("Error refreshing access token:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
const handler = (0, next_auth_1.default)(authOptions);
exports.GET = handler;
exports.POST = handler;
//# sourceMappingURL=route.js.map