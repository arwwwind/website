'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CrypticText } from '@/components/ui/cryptic-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { HeroStats } from '@/components/HeroStats';
import { StreamCell, useSequentialStream } from '@/components/ui/stream-in';

const HERO_BIO = `10 years, one recurring theme: teach the machines to handle the tedious 90% so a human can get on with the interesting 10%.
I've inflicted this on advertising at Yahoo, education at upGrad, underwriting and finance at Egen.ai (car-loan risk models, mostly, taught to behave), and retail for Ahold Delhaize USA and its brands.
Currently: Biotech, at GATC Health, where a multi-agent research platform I built gets used by scientists combing biomedical literature for actual drug candidates. The models we built predict molecular properties at an F1 of ≈0.90 and an AUROC near 0.92.`;

function HeroActions({ active }: { active: boolean }) {
  // 0 Book a Call | 1 Email Me | 2 LinkedIn | 3 GitHub
  const { ref, count } = useSequentialStream(4, {
    whenVisible: false,
    enabled: active,
    intervalMs: 90,
    startDelay: 120,
  });

  if (!active && count === 0) {
    return <div ref={ref} className='mt-6 min-h-[5.5rem]' aria-hidden />;
  }

  return (
    <div ref={ref}>
      <div className='flex flex-wrap gap-3 px-2 mt-6'>
        {count >= 1 && (
          <StreamCell>
            <MagneticButton>
              <a
                href='https://calendly.com/thearvindnarayan/15min'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button
                  type='button'
                  className='text-white bg-rose-800 ring-2 focus:outline-none ring-rose-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-500 hover:to-rose-800 transition-all flex items-center gap-2'
                >
                  <i className='lni lni-google-meet'></i>
                  <span>Book a Call</span>
                </button>
              </a>
            </MagneticButton>
          </StreamCell>
        )}
        {count >= 2 && (
          <StreamCell>
            <MagneticButton>
              <a
                href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button
                  type='button'
                  className='text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 ring-2 focus:outline-none ring-neutral-700 hover:ring-teal-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex items-center gap-2'
                >
                  <i className='lni lni-envelope'></i>
                  <span>Email Me</span>
                </button>
              </a>
            </MagneticButton>
          </StreamCell>
        )}
      </div>

      {(count >= 3 || count >= 4) && (
        <div className='flex gap-3 px-2 mt-3'>
          {count >= 3 && (
            <StreamCell>
              <a
                href='https://www.linkedin.com/in/arwwwind/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  variant='outline'
                  size='sm'
                  className='text-xs hover:border-teal-700/50 hover:text-teal-400 transition-colors'
                >
                  <i className='lni lni-linkedin-original mr-1'></i>LinkedIn
                </Button>
              </a>
            </StreamCell>
          )}
          {count >= 4 && (
            <StreamCell>
              <a
                href='https://github.com/arwwwind'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  variant='outline'
                  size='sm'
                  className='text-xs hover:border-teal-700/50 hover:text-teal-400 transition-colors'
                >
                  <i className='lni lni-github-original mr-1'></i>GitHub
                </Button>
              </a>
            </StreamCell>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Hero bio → stats → CTAs, sequenced like an LLM response.
 */
export function HeroBio() {
  const [paraDone, setParaDone] = useState(false);
  const [statsDone, setStatsDone] = useState(false);
  const onStatsDone = useCallback(() => setStatsDone(true), []);

  return (
    <>
      <CrypticText
        as='p'
        waitForBoot
        delay={80}
        cps={38}
        flipsPerChar={2}
        scrambleWindow={5}
        text={HERO_BIO}
        className='px-2 pt-6 md:w-[92%] font-normal text-sm text-neutral-300 tracking-wide leading-relaxed'
        onComplete={() => setParaDone(true)}
      />
      <HeroStats active={paraDone} onComplete={onStatsDone} />
      <HeroActions active={statsDone} />
    </>
  );
}
