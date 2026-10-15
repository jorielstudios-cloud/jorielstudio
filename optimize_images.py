from pathlib import Path
from PIL import Image, ImageOps
import os

ROOT = Path(__file__).resolve().parent
IMAGE_DIR = ROOT / "public" / "assets" / "portfolio"

SUPPORTED = {".jpg", ".jpeg", ".png"}
QUALITY = 82

def main():
    if not IMAGE_DIR.exists():
        print(f"ERROR: Portfolio folder not found: {IMAGE_DIR}")
        return

    files = [
        p for p in IMAGE_DIR.rglob("*")
        if p.is_file() and p.suffix.lower() in SUPPORTED
    ]

    if not files:
        print("No JPG, JPEG or PNG images found.")
        return

    original_total = 0
    compressed_total = 0
    successful = 0
    failed = 0

    print(f"Portfolio folder: {IMAGE_DIR}")
    print(f"Images found: {len(files)}")
    print("-" * 60)

    for source in files:
        destination = source.with_suffix(".webp")

        try:
            original_size = source.stat().st_size
            original_total += original_size

            with Image.open(source) as image:
                image = ImageOps.exif_transpose(image)

                if image.mode not in ("RGB", "RGBA"):
                    if "A" in image.getbands():
                        image = image.convert("RGBA")
                    else:
                        image = image.convert("RGB")

                image.save(
                    destination,
                    "WEBP",
                    quality=QUALITY,
                    method=6
                )

            new_size = destination.stat().st_size
            compressed_total += new_size
            successful += 1

            reduction = (
                (1 - new_size / original_size) * 100
                if original_size else 0
            )

            print(
                f"OK: {source.relative_to(IMAGE_DIR)}"
                f" | {original_size / 1024:.1f} KB"
                f" -> {new_size / 1024:.1f} KB"
                f" | {reduction:.1f}% smaller"
            )

        except Exception as error:
            failed += 1
            print(f"FAILED: {source} | {error}")

    print("\n" + "=" * 60)
    print("COMPRESSION SUMMARY")
    print("=" * 60)
    print(f"Successfully converted: {successful}")
    print(f"Failed: {failed}")
    print(f"Original image sizes: {original_total / 1024 / 1024:.2f} MB")
    print(f"WebP image sizes: {compressed_total / 1024 / 1024:.2f} MB")

    if original_total:
        saved = original_total - compressed_total
        percentage = saved / original_total * 100
        print(f"Size difference: {saved / 1024 / 1024:.2f} MB")
        print(f"Size reduction: {percentage:.1f}%")

    print("\nOriginal photographs have not been deleted.")
    print("Website references have not been changed yet.")

if __name__ == "__main__":
    main()
