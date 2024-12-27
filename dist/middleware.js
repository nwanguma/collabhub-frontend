"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const jwt_1 = require("next-auth/jwt");
const server_1 = require("next/server");
async function middleware(req) {
  const token = await (0, jwt_1.getToken)({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");
  if (isProtected && !token) {
    const url = new URL("/", req.url);
    return server_1.NextResponse.redirect(url);
  }
  if (!isProtected && token) {
    return server_1.NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return server_1.NextResponse.next();
}
exports.config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};
//# sourceMappingURL=middleware.js.map
