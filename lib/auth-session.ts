import { cookies } from "next/headers";

export interface SiteUser {
  name: string;
  email: string;
}

const USER_COOKIE = "gwd_user";
const ADMIN_COOKIE = "gwd_admin";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function parseUserCookie(raw: string): SiteUser | null {
  const candidates = [raw];
  try {
    candidates.push(decodeURIComponent(raw));
  } catch {
    // ignore
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as SiteUser;
      if (parsed.name && parsed.email) return parsed;
    } catch {
      // try next candidate
    }
  }

  return null;
}

export async function getSiteUser(): Promise<SiteUser | null> {
  const store = await cookies();
  const raw = store.get(USER_COOKIE)?.value;
  if (!raw) return null;
  return parseUserCookie(raw);
}

export async function setSiteUser(user: SiteUser): Promise<void> {
  const store = await cookies();
  store.set(USER_COOKIE, JSON.stringify(user), {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSiteUser(): Promise<void> {
  const store = await cookies();
  store.delete(USER_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "1", {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export function getAdminPassword(): string {
  return process.env.REVIEW_ADMIN_PASSWORD || "gamingworlddaily-admin";
}

export { USER_COOKIE, ADMIN_COOKIE, COOKIE_OPTIONS };
