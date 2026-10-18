import { readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDirectory = path.resolve('public', 'assets');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const maxDimension = 2400;
const imagePaths = [];

async function collectImages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectImages(entryPath);
    } else if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      imagePaths.push(entryPath);
    }
  }
}

await collectImages(assetsDirectory);

let originalBytes = 0;
let optimizedBytes = 0;
let optimizedCount = 0;

for (const imagePath of imagePaths) {
  const original = await stat(imagePath);
  originalBytes += original.size;
  const source = await readFile(imagePath);
  const image = sharp(source);
  const { format, width, height } = await image.metadata();

  if (width <= maxDimension && height <= maxDimension) {
    optimizedBytes += original.size;
    continue;
  }

  const pipeline = image
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    });

  if (format === 'jpeg') {
    pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true });
  } else if (format === 'webp') {
    pipeline.webp({ quality: 80, effort: 5 });
  } else if (format === 'png') {
    pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else {
    continue;
  }

  const output = await pipeline.toBuffer();

  if (output.length < original.size) {
    const temporaryPath = `${imagePath}.optimized`;
    await writeFile(temporaryPath, output);
    await rename(temporaryPath, imagePath);
    optimizedCount += 1;
    optimizedBytes += output.length;
  } else {
    optimizedBytes += original.size;
  }
}

const savedBytes = originalBytes - optimizedBytes;
const savedPercent = originalBytes === 0 ? 0 : (savedBytes / originalBytes) * 100;

console.log(
  `Optimized ${optimizedCount} of ${imagePaths.length} images. ` +
    `Saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB (${savedPercent.toFixed(1)}%).`,
);
