import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * proxy.ts — Next.js 16 route guard (replaces deprecated middleware.ts).
 *
 * Protected routes: /dashboard/** and /trainer/**
 * Auth routes (redirect away if already logged in): /login, /signup
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not add logic between createServerClient and getUser.
  // A simple mistake could make it very hard to debug issues with users being
  // randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/trainer");

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  // Unauthenticated user hitting a protected route → send to login
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user hitting login/signup → send to their dashboard
  if (isAuthRoute && user) {
    const role = (user.user_metadata?.role as string) ?? "learner";
    const dest = role === "trainer" ? "/trainer" : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.nextUrl));
  }

  return supabaseResponse;
}

// Run on all routes except static assets, images, and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
