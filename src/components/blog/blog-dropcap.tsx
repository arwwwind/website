type BlogDropcapProps = {
  word: string;
};

/** Newspaper-style drop cap on the first letter of the opening word. */
export function BlogDropcap({ word }: BlogDropcapProps) {
  if (!word) return null;

  const first = word.charAt(0);
  const rest = word.slice(1);

  return (
    <>
      <span className='blog-dropcap' aria-hidden='true'>
        {first}
      </span>
      <span className='sr-only'>{first}</span>
      {rest}
    </>
  );
}
