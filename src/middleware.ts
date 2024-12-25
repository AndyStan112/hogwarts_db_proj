import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const isGuestRoute = createRouteMatcher(["/guest(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, sessionId } = await auth();
  let role = sessionClaims?.metadata?.role;
  const userId = sessionClaims?.sub;
  if (!role && userId) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    if (user) {
      await clerk.users.updateUser(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          role: "guest",
        },
      });
      role = "guest";
    }
  }

  const url = new URL("/", req.url);

  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(url);
  }

  if (isTeacherRoute(req) && !["admin", "teacher"].includes(role!)) {
    return NextResponse.redirect(url);
  }

  if (isStudentRoute(req) && !["admin", "teacher", "student"].includes(role!)) {
    return NextResponse.redirect(url);
  }

  if (
    isGuestRoute(req) &&
    !["admin", "teacher", "student", "guest"].includes(role!)
  ) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
