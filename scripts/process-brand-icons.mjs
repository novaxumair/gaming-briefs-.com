/**
 * Strips near-black pixels to alpha for logo/favicon PNGs.
 * Usage: node scripts/process-brand-icons.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assetsDir =
  "C:\\Users\\Bader\\.cursor\\projects\\c-Users-Bader-Desktop-gaming-briefs-com-main-gaming-briefs-com-main\\assets";

const sources = {
  invader:
    "c__Users_Bader_AppData_Roaming_Cursor_User_workspaceStorage_4bf2324c2549e3bd893e6adee28542c9_images_image-6552e275-0919-47e5-b56d-19d7ee0b5a93.png",
};

async function stripBlackBackground(inputPath, outputPath, threshold = 28) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: true })
    .toFile(outputPath);
}

async function cropAndStripLogoMark(inputPath, outputPath, threshold = 28) {
  const meta = await sharp(inputPath).metadata();
  const cropWidth = Math.min(meta.width ?? 64, Math.round((meta.height ?? 64) * 1.15));

  const { data, info } = await sharp(inputPath)
    .extract({ left: 0, top: 0, width: cropWidth, height: meta.height ?? cropWidth })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function resizeSquare(inputPath, outputPath, size) {
  await sharp(inputPath)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function main() {
  await mkdir(path.join(root, "public", "images"), { recursive: true });

  const invaderSrc = path.join(assetsDir, sources.invader);

  const invaderPng = path.join(root, "public", "images", "favicon-invader.png");

  await stripBlackBackground(invaderSrc, invaderPng);

  // App router icons (favicon + apple touch)
  await resizeSquare(invaderPng, path.join(root, "app", "icon.png"), 512);
  await resizeSquare(invaderPng, path.join(root, "app", "apple-icon.png"), 180);
  await resizeSquare(invaderPng, path.join(root, "public", "favicon-32.png"), 32);

  // Manifest / OG sizes
  await resizeSquare(
    invaderPng,
    path.join(root, "public", "web-app-manifest-192x192.png"),
    192,
  );
  await resizeSquare(
    invaderPng,
    path.join(root, "public", "web-app-manifest-512x512.png"),
    512,
  );
  console.log("Brand icons processed with transparent backgrounds.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
