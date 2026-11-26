import type { ImgHTMLAttributes } from 'react';
import { BRAND_NAME } from '../../lib/site';

type ProductScreenshotProps = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

export function ProductScreenshot({ src, alt, className, width, height, ...imageProps }: ProductScreenshotProps) {
  const isComposite = src.endsWith('/hero-combined-mockup.webp');
  if (!isComposite && !src.startsWith('/images/screenshots/web-')) {
    return <img src={src} alt={alt} className={className} width={width} height={height} {...imageProps} />;
  }

  const x = isComposite ? 69 : 15;
  const y = isComposite ? 71 : 15;
  return (
    <svg viewBox="0 0 1600 1000" width={width ?? 1600} height={height ?? 1000}
      className={className} role={alt ? 'img' : undefined} aria-label={alt || undefined}
      aria-hidden={!alt || undefined}>
      <image href={src} width="1600" height="1000" />
      <rect x={x} y={y} width="202" height="49" fill="#0e1422" />
      <image href="/logo.png" x={x + 7} y={y + 6} width="36" height="36" />
      <text x={x + 53} y={y + 24} fill="#f4f7fa" fontFamily="system-ui, sans-serif" fontSize="19" fontWeight="750">
        {BRAND_NAME}
      </text>
      <text x={x + 53} y={y + 39} fill="#ffc460" fontFamily="system-ui, sans-serif" fontSize="10" letterSpacing="1.2">
        FIELD OPERATIONS
      </text>
    </svg>
  );
}
