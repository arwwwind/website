'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { CrypticText } from '@/components/ui/cryptic-text';
import { StreamCell, useSequentialStream } from '@/components/ui/stream-in';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineEntryRow = ({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) => {
  return (
    <StreamCell>
      <div className='flex justify-start pt-5 md:pt-40 md:gap-10'>
        <div className='sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full'>
          <div className='h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center'>
            <div className='h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-700 p-2 shadow-[0_0_8px_rgba(45,212,191,0.5)]' />
          </div>
          <h3 className='hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500'>
            <CrypticText
              text={item.title}
              cps={20}
              flipsPerChar={2}
              scrambleWindow={3}
              delay={index === 0 ? 0 : 40}
            />
          </h3>
        </div>

        <div className='relative pl-20 pr-4 md:pl-4 w-full'>
          <h3 className='md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500'>
            {item.title}
          </h3>
          {item.content}
        </div>
      </div>
    </StreamCell>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [headerDone, setHeaderDone] = useState(false);

  const { ref: listRef, count } = useSequentialStream(data.length, {
    intervalMs: 120,
    startDelay: 200,
    enabled: headerDone,
    whenVisible: true,
  });

  // If the title animation never reports complete, still stream entries.
  useEffect(() => {
    const t = setTimeout(() => setHeaderDone(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    const measure = () => setHeight(node.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [count, listRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className='w-full bg-neutral-950 bg-opacity-50 md:px-10'
      ref={containerRef}
    >
      <div className='max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-5'>
        <h2 className='text-lg md:text-4xl mb-4 text-white max-w-4xl font-bold'>
          <CrypticText
            text='A Decade of Shipping'
            whenVisible
            cps={14}
            flipsPerChar={4}
            scrambleWindow={4}
            className='bg-gradient-to-r from-teal-400 via-rose-300 to-teal-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[cryptic-shimmer_4s_linear_infinite]'
            onComplete={() => setHeaderDone(true)}
          />
        </h2>
        <CrypticText
          as='p'
          whenVisible
          delay={400}
          cps={32}
          flipsPerChar={2}
          scrambleWindow={4}
          text='From BASIC programs to distributed systems at scale.'
          className='text-neutral-500 text-sm'
        />
      </div>

      <div ref={listRef} className='relative max-w-7xl mx-auto pb-20'>
        {data.slice(0, count).map((item, index) => (
          <TimelineEntryRow key={item.title} item={item} index={index} />
        ))}
        <div
          style={{ height: height + 'px' }}
          className='absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]'
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className='absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-teal-400 via-rose-400 to-teal-300 from-[0%] via-[40%] rounded-full'
          />
        </div>
      </div>
    </div>
  );
};
