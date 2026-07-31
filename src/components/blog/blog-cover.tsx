type BlogCoverProps = {
  basePath: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

const WIDTHS = [480, 640, 768, 1024, 1200] as const;

function srcSet(basePath: string, ext: 'webp' | 'jpg'): string {
  return WIDTHS.map((w) => `${basePath}/cover-${w}.${ext} ${w}w`).join(', ');
}

export function BlogCover({
  basePath,
  alt,
  priority = false,
  className,
}: BlogCoverProps) {
  return (
    <picture>
      <source
        type='image/webp'
        srcSet={srcSet(basePath, 'webp')}
        sizes='(max-width: 42rem) 100vw, 42rem'
      />
      <img
        src={`${basePath}/cover-1024.jpg`}
        srcSet={srcSet(basePath, 'jpg')}
        sizes='(max-width: 42rem) 100vw, 42rem'
        width={1024}
        height={571}
        alt={alt}
        className={className}
        decoding='async'
        {...(priority
          ? { fetchPriority: 'high' as const, loading: 'eager' as const }
          : { loading: 'lazy' as const })}
      />
    </picture>
  );
}
