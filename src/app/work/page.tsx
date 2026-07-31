import Link from 'next/link';
import Image from 'next/image';
import { SectionGridBackground } from '@/components/ui/section-grid-background';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/seo/json-ld';
import {
  workIndexJsonLd,
  workIndexMetadata,
  workProjects,
} from '@/lib/work-projects';

export const metadata = workIndexMetadata();

export default function WorkPage() {
  return (
    <div className='min-h-screen bg-black'>
      <JsonLd data={workIndexJsonLd()} />
      <SectionGridBackground>
        <div className='max-w-screen-xl mx-auto px-4 py-24'>

          {/* Back */}
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-teal-400 text-sm transition-colors mb-12'
          >
            ← Back
          </Link>

          {/* Header */}
          <div className='mb-4'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Portfolio
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            <GradientText>Selected Work</GradientText>
          </h1>
          <p className='text-neutral-400 text-base mb-16 md:w-[60%]'>
            Products shipped, platforms scaled, and ML systems deployed — from AI recruitment
            agents to molecular property prediction. Each project is a case study in building
            things that actually work.
          </p>

          {/* Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {workProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className='group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60'
              >
                {/* Image or gradient hero */}
                <div className={`relative h-48 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className='object-cover object-top opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className={`text-5xl font-black ${p.accentColor} opacity-20 group-hover:opacity-30 transition-opacity tracking-tight`}>
                        {p.title.split(' ')[0]}
                      </span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                  <span className='absolute bottom-3 right-3 text-xs text-neutral-500 font-mono'>
                    {p.year}
                  </span>
                </div>

                {/* Content */}
                <div className='p-5 bg-neutral-950'>
                  <h2 className={`text-lg font-bold text-white mb-1 group-hover:${p.accentColor} transition-colors`}>
                    {p.title}
                  </h2>
                  <p className='text-neutral-400 text-sm mb-4 leading-relaxed'>{p.tagline}</p>
                  <div className='flex flex-wrap gap-1.5'>
                    {p.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='outline'
                        className='text-xs border-neutral-800 text-neutral-500'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className='absolute top-4 right-4 w-7 h-7 rounded-full bg-black/50 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span className='text-white text-xs'>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
