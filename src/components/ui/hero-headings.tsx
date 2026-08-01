'use client';

import { FlipWords } from '@/components/ui/flip-words';
import { CrypticText } from '@/components/ui/cryptic-text';
import { useCrawlMode } from '@/components/ui/crawl-mode';

/**
 * Real users keep the animated greeting as H1.
 * Bots get the name as H1 so the primary entity is crawlable.
 */
export function HeroHeadings({
  greetings,
  roles,
}: {
  greetings: string[];
  roles: string[];
}) {
  const isBot = useCrawlMode();
  const GreetingTag = isBot ? 'p' : 'h1';
  const NameTag = isBot ? 'h1' : 'h2';

  return (
    <>
      <GreetingTag data-hero className='text-2xl md:text-3xl py-1'>
        <FlipWords words={greetings} waitForBoot />
      </GreetingTag>
      <NameTag
        data-hero
        className='text-3xl md:text-5xl px-2 py-1 leading-tight'
      >
        <span>{`I'm `}</span>
        <CrypticText
          text='Arvind Narayan'
          waitForBoot
          cps={16}
          flipsPerChar={3}
          scrambleWindow={4}
          className='bg-gradient-to-r from-teal-400 via-rose-300 to-teal-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[cryptic-shimmer-italic_4s_linear_infinite]'
        />
      </NameTag>
      <div data-hero className='text-xl md:text-2xl mt-1 text-neutral-300'>
        <FlipWords words={roles} waitForBoot />
      </div>
    </>
  );
}
