import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/seo';
import { workProjects } from '@/lib/work-projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const latestPostDate = posts[0]
    ? new Date(`${posts[0].date}T12:00:00.000Z`)
    : now;

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...workProjects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/blogs`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: new Date(`${post.date}T12:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
