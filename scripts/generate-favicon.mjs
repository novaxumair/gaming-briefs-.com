import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web";

const SRC = path.join(ROOT, "public/saturn-source.png");
const BG = { r: 9, g: 8, b: 25, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function render(size, background = BG) {
  return sharp(SRC)
    .resize(size, size, { fit: "contain", background })
    .png()
    .toBuffer();
}

async function writeIcon(rel, size, background = TRANSPARENT) {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(SRC)
    .resize(size, size, { fit: "contain", background })
    .png()
    .toFile(dest);
  console.log("Wrote", rel);
}

async function main() {
  fs.mkdirSync(path.join(ROOT, "public/icons"), { recursive: true });
  fs.mkdirSync(path.join(ROOT, "public/images"), { recursive: true });

  const outputs = [
    ["app/icon.png", 512],
    ["app/apple-icon.png", 180],
    ["public/icons/icon-192.png", 192],
    ["public/icons/icon-512.png", 512],
    ["public/web-app-manifest-192x192.png", 192],
    ["public/web-app-manifest-512x512.png", 512],
  ];

  for (const [rel, size] of outputs) {
    await writeIcon(rel, size, TRANSPARENT);
  }

  const { default: toIco } = await import("to-ico");
  const ico = await toIco([
    await render(16, BG),
    await render(32, BG),
    await render(48, BG),
  ]);
  fs.writeFileSync(path.join(ROOT, "app/favicon.ico"), ico);
  console.log("Wrote app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
