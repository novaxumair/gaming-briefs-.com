import { NextResponse } from "next/server";
import { ADMIN_COOKIE, COOKIE_OPTIONS, USER_COOKIE } from "@/lib/auth-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(USER_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  response.cookies.set(ADMIN_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });

  return response;
}
