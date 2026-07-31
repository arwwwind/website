import { getAllPosts, postUrl, SITE_URL } from '@/lib/blog-posts';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllPosts();
  const lastBuild = posts[0]?.date
    ? new Date(`${posts[0].date}T12:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = postUrl(post.slug);
      const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.tags.join(', '))}</category>
      <enclosure url="${SITE_URL}${post.ogImage}" type="image/jpeg" />
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Arvind Narayan — Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Engineering, AI, and opinions from Arvind Narayan (arwwwind).</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/blogs/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
