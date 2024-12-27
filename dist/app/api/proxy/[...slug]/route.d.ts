import { NextResponse } from "next/server";
declare function handler(req: Request): Promise<NextResponse<any>>;
export declare const GET: typeof handler;
export declare const POST: typeof handler;
export declare const PUT: typeof handler;
export declare const DELETE: typeof handler;
export declare const PATCH: typeof handler;
export {};
