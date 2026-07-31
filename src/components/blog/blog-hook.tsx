import Link from 'next/link';

export function BlogHook() {
  return (
    <aside className='blog-hook' aria-label='Get in touch'>
      <p className='blog-hook__eyebrow'>Still here? Nice.</p>
      <h2 className='blog-hook__title'>So… what&apos;d you think?</h2>

      <div className='blog-hook__grid'>
        <div className='blog-hook__card blog-hook__card--yes'>
          <div className='blog-hook__gif-wrap'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/blog/dwight-elf-nod.gif'
              alt=''
              width={240}
              height={200}
              className='blog-hook__gif'
              loading='lazy'
              decoding='async'
            />
          </div>
          <p className='blog-hook__label'>Liked it</p>
          <p className='blog-hook__copy'>
            Hope you liked the read. If you wanna reach out —{' '}
            <Link href='/#hero'>say hi</Link>. I answer. Eventually. Usually
            before your coffee goes cold.
          </p>
        </div>

        <div className='blog-hook__card blog-hook__card--nah'>
          <div className='blog-hook__gif-wrap'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/blog/dwight-elf-inspect.gif'
              alt=''
              width={240}
              height={200}
              className='blog-hook__gif'
              loading='lazy'
              decoding='async'
            />
          </div>
          <p className='blog-hook__label'>Have notes</p>
          <p className='blog-hook__copy'>
            Didn&apos;t like it? Strong feelings about my takes? Still <Link href='/#hero'>Reach out</Link>. I can take it. My ego has unit tests.
          </p>
        </div>
      </div>
    </aside>
  );
}
