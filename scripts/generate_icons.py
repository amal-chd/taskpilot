"""Generate the SiteCommons app icons and optional product website/store assets."""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

MOBILE = Path(__file__).resolve().parents[1]
INK = "#101C2B"
GOLD = "#FFC460"
PAPER = "#F4F7FA"
MARK = (
    (PAPER, ((18, 22), (44, 22), (44, 35), (31, 35), (31, 48), (18, 48))),
    (PAPER, ((56, 22), (82, 22), (82, 48), (69, 48), (69, 35), (56, 35))),
    (PAPER, ((18, 52), (31, 52), (31, 65), (44, 65), (44, 78), (18, 78))),
    (PAPER, ((69, 52), (82, 52), (82, 78), (56, 78), (56, 65), (69, 65))),
    (GOLD, ((50, 37), (63, 50), (50, 63), (37, 50))),
)
DENSITIES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}


def mark(size: int, background: str | None = INK) -> Image.Image:
    scale = 3
    canvas = Image.new("RGBA", (size * scale, size * scale), background or (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    for color, points in MARK:
        draw.polygon([(round(x * size * scale / 100), round(y * size * scale / 100))
                      for x, y in points], fill=color)
    result = canvas.resize((size, size), Image.Resampling.LANCZOS)
    return result.convert("RGB") if background else result


def write_mobile() -> None:
    images = MOBILE / "assets" / "images"
    mark(1024).save(images / "logo.png")
    mark(1024).save(images / "app_icon.png")
    mark(1024, None).save(images / "adaptive_icon_foreground.png")

    ios_assets = MOBILE / "ios" / "Runner" / "Assets.xcassets"
    for path in (ios_assets / "AppIcon.appiconset").glob("*.png"):
        with Image.open(path) as existing:
            size = existing.width
        mark(size).save(path)
    for path in (ios_assets / "LaunchImage.imageset").glob("LaunchImage*.png"):
        with Image.open(path) as existing:
            width, height = existing.size
        canvas = Image.new("RGBA", (width, height))
        size = round(min(width, height) * 0.72)
        canvas.paste(mark(size), ((width - size) // 2, (height - size) // 2))
        canvas.save(path)

    res = MOBILE / "android" / "app" / "src" / "main" / "res"
    for density, size in DENSITIES.items():
        mark(size).save(res / f"mipmap-{density}" / "ic_launcher.png")
        foreground = res / f"drawable-{density}" / "ic_launcher_foreground.png"
        with Image.open(foreground) as existing:
            foreground_size = existing.width
        mark(foreground_size, None).save(foreground)

    mark(64).save(MOBILE / "web" / "favicon.png")
    for size in (192, 512):
        mark(size).save(MOBILE / "web" / "icons" / f"Icon-{size}.png")
        canvas = Image.new("RGB", (size, size), INK)
        inner = round(size * 0.72)
        canvas.paste(mark(inner), ((size - inner) // 2, (size - inner) // 2))
        canvas.save(MOBILE / "web" / "icons" / f"Icon-maskable-{size}.png")


def write_web(root: Path) -> None:
    public = root / "public"
    brand = root / "docs" / "brand"
    mark(512).save(public / "logo.png")
    paths = [
        f'<polygon points="{" ".join(f"{x},{y}" for x, y in points)}" fill="{color}"/>'
        for color, points in MARK
    ]
    svg = "\n".join([
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
        f'<rect width="100" height="100" rx="20" fill="{INK}"/>',
        *paths,
        '</svg>',
        '',
    ])
    (public / "favicon.svg").write_text(svg)
    mark(512).convert("RGBA").save(brand / "play-store-icon.png")

    for width, height, output in (
        (1200, 630, public / "og-image.jpg"),
        (1024, 500, brand / "play-feature-graphic.png"),
    ):
        canvas = Image.new("RGB", (width, height), INK)
        draw = ImageDraw.Draw(canvas)
        x, y = round(width * 0.08), round(height * 0.17)
        for inset in (0, 66, 132):
            draw.line([(width - 310 + inset, height), (width + inset, height - 310)],
                      fill="#304054", width=2)
        draw.rounded_rectangle((x, y, x + 86, y + 86), radius=17, fill="#243447")
        logo = mark(70, None)
        canvas.paste(logo, (x + 8, y + 8), logo)
        draw.text((x + 105, y + 8), "SiteCommons", fill=PAPER,
                  font=ImageFont.load_default(size=57), stroke_width=1)
        draw.text((x, y + 135), "Every project.", fill=PAPER,
                  font=ImageFont.load_default(size=round(width * 0.057)), stroke_width=1)
        draw.text((x, y + 211), "One workspace.", fill=GOLD,
                  font=ImageFont.load_default(size=round(width * 0.057)), stroke_width=1)
        draw.text((x, y + 310), "Daily logs  /  Site photos  /  Task ownership", fill="#B6C3D1",
                  font=ImageFont.load_default(size=round(width * 0.024)))
        canvas.save(output, quality=92)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--web-root", type=Path, help="Website repository root")
    arguments = parser.parse_args()
    write_mobile()
    if arguments.web_root:
        write_web(arguments.web_root)
