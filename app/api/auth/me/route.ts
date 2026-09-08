import { NextResponse } from "next/server";
import { getSiteUser, isAdmin } from "@/lib/auth-session";

export async function GET() {
  const user = await getSiteUser();
  const admin = await isAdmin();
  return NextResponse.json({ user, isAdmin: admin });
}
