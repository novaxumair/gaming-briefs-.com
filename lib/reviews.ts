import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  pageSlug: string;
  pageTitle: string;
  pagePath: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  body: string;
  status: ReviewStatus;
  createdAt: string;
}

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

async function readReviewsFile(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(REVIEWS_FILE, "utf8");
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeReviewsFile(reviews: Review[]): Promise<void> {
  await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
  await fs.writeFile(REVIEWS_FILE, `${JSON.stringify(reviews, null, 2)}\n`, "utf8");
}

export async function listReviews(options?: {
  status?: ReviewStatus | ReviewStatus[];
  pageSlug?: string;
}): Promise<Review[]> {
  const reviews = await readReviewsFile();
  let filtered = reviews;

  if (options?.pageSlug) {
    filtered = filtered.filter((review) => review.pageSlug === options.pageSlug);
  }

  if (options?.status) {
    const statuses = Array.isArray(options.status) ? options.status : [options.status];
    filtered = filtered.filter((review) => statuses.includes(review.status));
  }

  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createReview(input: {
  pageSlug: string;
  pageTitle: string;
  pagePath: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  body: string;
}): Promise<Review> {
  const reviews = await readReviewsFile();
  const review: Review = {
    id: randomUUID(),
    pageSlug: input.pageSlug,
    pageTitle: input.pageTitle,
    pagePath: input.pagePath,
    authorName: input.authorName.trim(),
    authorEmail: input.authorEmail.trim().toLowerCase(),
    rating: input.rating,
    body: input.body.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  await writeReviewsFile(reviews);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<Review | null> {
  const reviews = await readReviewsFile();
  const index = reviews.findIndex((review) => review.id === id);
  if (index === -1) return null;

  reviews[index] = { ...reviews[index], status };
  await writeReviewsFile(reviews);
  return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await readReviewsFile();
  const next = reviews.filter((review) => review.id !== id);
  if (next.length === reviews.length) return false;
  await writeReviewsFile(next);
  return true;
}
