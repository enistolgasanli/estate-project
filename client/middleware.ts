import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const adminPanelUrl = new URL("/admin", request.url);
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    const isAuthenticated = request.cookies.has("admin_session");

    // if (request.nextUrl.pathname.startsWith("/admin")) {
    //     if (isAuthenticated) {
    //         if (request.nextUrl.pathname === adminPanelUrl.pathname) {
    //             return NextResponse.redirect(dashboardUrl);
    //         }
    //     } else {
    //         if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    //             return NextResponse.redirect(adminPanelUrl);
    //         }
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}