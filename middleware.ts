import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/organization(.*)",
  "/select-org",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }

  if (auth().userId) {
    let path = "/select-org";

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    if (!auth().orgId && request.nextUrl.pathname !== "/select-org") {
      path = "/select-org";
    }

    const orgSelection = new URL(path, request.url);

    if (
      request.nextUrl.pathname !== path &&
      !request.nextUrl.pathname.split("organization/")[1]
    ) {
      return NextResponse.redirect(orgSelection);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
