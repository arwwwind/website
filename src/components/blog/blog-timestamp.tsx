'use client';

import { useEffect, useState } from 'react';
import { formatBlogTimestamp } from '@/lib/blog-date';

export function BlogTimestamp() {
  const [label, setLabel] = useState(() => formatBlogTimestamp());

  useEffect(() => {
    setLabel(formatBlogTimestamp());
  }, []);

  return <p className='blog-intro__date'>{label}</p>;
}
