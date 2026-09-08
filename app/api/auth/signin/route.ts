import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  COOKIE_OPTIONS,
  USER_COOKIE,
  clearAdminSession,
  getAdminPassword,
} from "@/lib/auth-session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    adminPassword?: string;
  };

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid name and email." }, { status: 400 });
  }

  const adminPassword = body.adminPassword?.trim();
  let isAdmin = false;
  let warning: string | undefined;

  if (adminPassword) {
    if (adminPassword !== getAdminPassword()) {
      warning = "Signed in, but the admin password was incorrect.";
    } else {
      isAdmin = true;
    }
  }

  const response = NextResponse.json({
    ok: true,
    isAdmin,
    user: { name, email },
    warning,
  });

  response.cookies.set(USER_COOKIE, JSON.stringify({ name, email }), {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 30,
  });

  if (isAdmin) {
    response.cookies.set(ADMIN_COOKIE, "1", {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    response.cookies.set(ADMIN_COOKIE, "", {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    });
  }

  return response;
}
