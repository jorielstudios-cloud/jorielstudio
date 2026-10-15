from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
GALLERY_FILE = ROOT / "src" / "lib" / "portfolio-gallery.ts"
PORTFOLIO_DIR = ROOT / "public" / "assets" / "portfolio"

def main():
    if not GALLERY_FILE.exists():
        print(f"ERROR: Cannot find {GALLERY_FILE}")
        return

    content = GALLERY_FILE.read_text(encoding="utf-8")

    pattern = re.compile(r'asset\("([^"]+)"\)')
    replacements = 0
    missing = []

    def replace_image(match):
        nonlocal replacements

        original_path = match.group(1)

        # Decode URL-encoded characters such as %20 (spaces).
        decoded_path = original_path.replace("%20", " ")

        original_file = PORTFOLIO_DIR / Path(decoded_path)
        webp_file = original_file.with_suffix(".webp")

        if webp_file.is_file():
            replacements += 1
            return f'asset("{webp_file.relative_to(PORTFOLIO_DIR).as_posix()}")'

        missing.append(original_path)
        return match.group(0)

    updated = pattern.sub(replace_image, content)

    if replacements == 0:
        print("No gallery references were changed.")
        print("Check that WebP files exist in the portfolio folder.")
        return

    # Back up the gallery file before modifying it.
    backup = GALLERY_FILE.with_suffix(".ts.backup")
    if not backup.exists():
        backup.write_text(content, encoding="utf-8")

    GALLERY_FILE.write_text(updated, encoding="utf-8")

    print(f"Gallery references updated: {replacements}")
    print(f"Backup saved to: {backup}")

    if missing:
        print(f"\nReferences left unchanged: {len(missing)}")
        for item in missing:
            print(f"  - {item}")

    print("\nOriginal photographs remain untouched.")

if __name__ == "__main__":
    main()
