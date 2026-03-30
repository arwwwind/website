import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionGridBackground({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative w-full bg-white dark:bg-black',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]',
          'dark:bg-black',
        )}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
