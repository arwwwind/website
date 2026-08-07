#!/usr/bin/env python3
"""Convert blog markdown into a Next.js page.tsx using HTML body (anatomy style)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import mistune

SITE = "https://arwwwind.com"
SLUG = "pathology-of-an-agentic-ai-system"
CATEGORY = "AI Engineering"
COMPONENT = "PathologyOfAnAgenticAISystemPostPage"
MID_MARKER = "BLOGRELATEDADMARKER"
FURTHER_MARKER = "FURTHERREADINGMARKER"


class BlogRenderer(mistune.HTMLRenderer):
    def link(self, text: str, url: str, title: str | None = None) -> str:
        attrs = []
        href = url
        if href.startswith(SITE):
            href = href[len(SITE) :] or "/"
        if href.startswith("http://") or href.startswith("https://"):
            attrs.append(f'href="{mistune.escape_url(href)}"')
            attrs.append('target="_blank"')
            attrs.append('rel="noopener noreferrer"')
        else:
            attrs.append(f'href="{mistune.escape_url(href)}"')
        if title:
            attrs.append(f'title="{mistune.escape(title)}"')
        return f'<a {" ".join(attrs)}>{text}</a>'

    def heading(self, text: str, level: int, **attrs) -> str:
        return f"<h{level}>{text}</h{level}>\n"


def wrap_tables(html: str) -> str:
    return re.sub(
        r"<table>\n?",
        '<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>\n',
        html,
    ).replace("</table>", "</table></div>")


def strip_frontmatter(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4 :].lstrip("\n")
    return text


def prepare_body(md: str) -> tuple[str, str, str]:
    """Return (lede, body_md, further_md)."""
    md = strip_frontmatter(md)
    # Drop H1 (rendered by page header)
    md = re.sub(r"^# .+\n+", "", md, count=1)
    # Extract italic lede as first paragraph if present
    lede = ""
    m = re.match(r"^\*(.+?)\*\n+", md, flags=re.S)
    if m:
        lede = m.group(1).strip()
        md = md[m.end() :]
    # Drop thematic breaks (visual only in source)
    md = re.sub(r"^---\s*$", "", md, flags=re.M)
    # Insert mid-ad marker after Part the Third heading block ends —
    # specifically after §9 section (before Part the Fourth)
    md = md.replace(
        "## Part the Fourth: Generation, or Where the Money Goes",
        f"{MID_MARKER}\n\n## Part the Fourth: Generation, or Where the Money Goes",
    )
    # Split further reading for JSX Links
    parts = re.split(
        r"\n## Further reading on this site\n",
        md,
        maxsplit=1,
    )
    body = parts[0].rstrip()
    further = parts[1].strip() if len(parts) > 1 else ""
    if further:
        body = body + "\n\n" + FURTHER_MARKER + "\n"
    return lede, body, further


def md_to_html(md: str) -> str:
    render = mistune.create_markdown(
        renderer=BlogRenderer(),
        plugins=["table", "strikethrough", "url"],
    )
    html = render(md)
    html = wrap_tables(html)
    # First paragraph gets lede class if we pass it separately
    return html.strip()


def further_to_jsx(further_md: str) -> str:
    """Convert '- [Title](url) — blurb' list to JSX ul."""
    items = []
    for line in further_md.splitlines():
        line = line.strip()
        if not line.startswith("- "):
            continue
        line = line[2:]
        m = re.match(r"\[([^\]]+)\]\(([^)]+)\)\s*[—–-]\s*(.+)", line)
        if not m:
            continue
        title, url, blurb = m.group(1), m.group(2), m.group(3)
        if url.startswith(SITE):
            href = url[len(SITE) :] or "/"
        else:
            href = url
        blurb_jsx = (
            mistune.escape(blurb)
            .replace("'", "&apos;")
            .replace('"', "&quot;")
        )
        items.append(
            f"""            <li>
              <Link href='{href}'>
                {title}
              </Link>{{' '}}
              — {blurb_jsx}
            </li>"""
        )
    return "\n".join(items)


def word_count(md: str) -> int:
    text = strip_frontmatter(md)
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"[|#*_`\[\]()>~-]", " ", text)
    return len(re.findall(r"\S+", text))


def build_page(lede: str, body_html: str, further_jsx: str) -> str:
    # Split on mid marker
    if MID_MARKER in body_html:
        before, after = body_html.split(MID_MARKER, 1)
        mid_injection = True
    else:
        before, after = body_html, ""
        mid_injection = False

    # Remove further marker from HTML if present
    after = after.replace(f"<p>{FURTHER_MARKER}</p>", "").replace(FURTHER_MARKER, "")
    before = before.replace(f"<p>{FURTHER_MARKER}</p>", "").replace(FURTHER_MARKER, "")

    # Escape backticks and ${ for template safety inside dangerouslySetInnerHTML
    def esc_html_chunk(s: str) -> str:
        # Use template literal in TSX — escape ` and ${
        return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    lede_block = ""
    if lede:
        lede_esc = mistune.escape(lede)
        lede_block = f'          <p className=\'blog-prose__lede\'>{lede_esc}</p>\n'

    chunks = []
    if before.strip():
        chunks.append(
            "          <div\n"
            "            dangerouslySetInnerHTML={{\n"
            f"              __html: `{esc_html_chunk(before.strip())}`,\n"
            "            }}\n"
            "          />"
        )
    if mid_injection:
        chunks.append("          <BlogRelatedAd slug={SLUG} />")
    if after.strip():
        chunks.append(
            "          <div\n"
            "            dangerouslySetInnerHTML={{\n"
            f"              __html: `{esc_html_chunk(after.strip())}`,\n"
            "            }}\n"
            "          />"
        )

    body_jsx = "\n\n".join(chunks)

    further_block = ""
    if further_jsx:
        further_block = f"""
          <h2>Further reading on this site</h2>
          <ul className='blog-prose__refs'>
{further_jsx}
          </ul>
"""

    return f"""import type {{ Metadata }} from 'next';
import Link from 'next/link';
import {{ BlogCover }} from '@/components/blog/blog-cover';
import {{ BlogHook }} from '@/components/blog/blog-hook';
import {{
  BlogContinueReading,
  BlogRelatedAd,
  BlogSeriesBanner,
}} from '@/components/blog/blog-related';
import {{
  formatPostDate,
  getPostBySlug,
  postDocumentTitle,
  postUrl,
  SITE_URL,
}} from '@/lib/blog-posts';

const SLUG = '{SLUG}';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${{SITE_URL}}${{post.ogImage}}`;
const publishedIso = `${{post.date}}T12:00:00.000Z`;

export const metadata: Metadata = {{
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'RAG pathology',
    'agentic AI failures',
    'retrieval debugging',
    'LLM ops',
    'production RAG',
    'GraphRAG',
    'ColPali',
    'Langfuse',
    'Arvind Narayan',
  ],
  authors: [{{ name: 'Arvind Narayan', url: SITE_URL }}],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: '{CATEGORY}',
  alternates: {{
    canonical: url,
    types: {{
      'application/rss+xml': `${{SITE_URL}}/blogs/feed.xml`,
    }},
  }},
  robots: {{
    index: true,
    follow: true,
    googleBot: {{
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }},
  }},
  openGraph: {{
    type: 'article',
    url,
    title: post.title,
    description: post.description,
    siteName: 'arwwwind',
    locale: 'en_US',
    publishedTime: publishedIso,
    modifiedTime: publishedIso,
    authors: ['Arvind Narayan'],
    tags: post.tags,
    section: '{CATEGORY}',
    images: [
      {{
        url: ogAbsolute,
        width: 1200,
        height: 630,
        alt: post.coverAlt,
        type: 'image/jpeg',
      }},
    ],
  }},
  twitter: {{
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: [ogAbsolute],
    creator: '@arwwwind',
  }},
  other: {{
    'article:published_time': publishedIso,
    'article:modified_time': publishedIso,
    'article:author': SITE_URL,
    'article:section': '{CATEGORY}',
    'article:tag': post.tags.join(','),
  }},
}};

const jsonLd = [
  {{
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${{url}}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    mainEntityOfPage: {{
      '@type': 'WebPage',
      '@id': url,
    }},
    datePublished: publishedIso,
    dateModified: publishedIso,
    inLanguage: 'en-US',
    wordCount: post.wordCount,
    timeRequired: `PT${{post.readingMinutes}}M`,
    keywords: post.tags.join(', '),
    articleSection: '{CATEGORY}',
    image: [
      {{
        '@type': 'ImageObject',
        url: ogAbsolute,
        width: 1200,
        height: 630,
      }},
      {{
        '@type': 'ImageObject',
        url: `${{SITE_URL}}${{post.coverPath}}/cover-1200.jpg`,
        width: 1200,
        height: 669,
      }},
    ],
    author: {{
      '@type': 'Person',
      '@id': `${{SITE_URL}}/#person`,
      name: 'Arvind Narayan',
      url: SITE_URL,
      jobTitle: 'Staff AI/ML Engineer',
    }},
    publisher: {{
      '@type': 'Person',
      '@id': `${{SITE_URL}}/#person`,
      name: 'Arvind Narayan',
      url: SITE_URL,
      logo: {{
        '@type': 'ImageObject',
        url: `${{SITE_URL}}/logo.png`,
      }},
    }},
    isPartOf: {{
      '@type': 'Blog',
      '@id': `${{SITE_URL}}/blogs#blog`,
      name: 'Arvind Narayan — Blog',
      url: `${{SITE_URL}}/blogs`,
    }},
    about: post.tags.map((tag) => ({{
      '@type': 'Thing',
      name: tag.replace(/-/g, ' '),
    }})),
  }},
  {{
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {{
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      }},
      {{
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${{SITE_URL}}/blogs`,
      }},
      {{
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      }},
    ],
  }},
];

export default function {COMPONENT}() {{
  return (
    <main className='blog-main blog-main--article'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(jsonLd) }}}}
      />

      <article
        className='blog-article'
        itemScope
        itemType='https://schema.org/BlogPosting'
      >
        <link itemProp='mainEntityOfPage' href={{url}} />
        <meta itemProp='author' content='Arvind Narayan' />
        <meta itemProp='datePublished' content={{publishedIso}} />
        <meta itemProp='dateModified' content={{publishedIso}} />
        <meta itemProp='headline' content={{post.title}} />
        <meta itemProp='description' content={{post.description}} />
        <meta itemProp='image' content={{ogAbsolute}} />

        <nav className='blog-article__crumb' aria-label='Breadcrumb'>
          <ol>
            <li>
              <Link href='/blogs'>Blog</Link>
            </li>
            <li aria-current='page'>{{post.title}}</li>
          </ol>
        </nav>

        <header className='blog-article__header'>
          <p className='blog-article__meta'>
            <time dateTime={{post.date}}>{{formatPostDate(post.date)}}</time>
            <span aria-hidden='true'> · </span>
            <span>{{post.readingMinutes}} min read</span>
            <span aria-hidden='true'> · </span>
            <span>Bengaluru</span>
          </p>
          <h1 className='blog-article__title' itemProp='name'>
            {{post.title}}
          </h1>
          <p className='blog-article__dek'>{{post.description}}</p>
          <ul className='blog-article__tags' aria-label='Tags'>
            {{post.tags.map((tag) => (
              <li key={{tag}}>
                <span>#{{tag}}</span>
              </li>
            ))}}
          </ul>
        </header>

        <figure className='blog-article__cover'>
          <BlogCover
            basePath={{post.coverPath}}
            alt={{post.coverAlt}}
            priority
            className='blog-article__cover-img'
          />
          <figcaption className='sr-only'>{{post.coverAlt}}</figcaption>
        </figure>

        <BlogSeriesBanner slug={{SLUG}} />

        <div className='blog-prose' itemProp='articleBody'>
{lede_block}{body_jsx}
{further_block}        </div>

        <BlogContinueReading slug={{SLUG}} />
        <BlogHook />

        <footer className='blog-article__footer'>
          <p>
            Written by{{' '}}
            <a href={{SITE_URL}} rel='author'>
              Arvind Narayan
            </a>
            . Bengaluru, August 2026.
          </p>
          <Link href='/blogs' className='blog-article__back'>
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}}
"""


def main() -> int:
    src = Path(sys.argv[1])
    out = Path(sys.argv[2])
    raw = src.read_text(encoding="utf-8")
    wc = word_count(raw)
    mins = max(1, round(wc / 230))
    print(f"words={wc} minutes≈{mins}")

    lede, body_md, further_md = prepare_body(raw)
    body_md_marked = body_md.replace(
        MID_MARKER, f"\n\n{MID_MARKER}\n\n"
    ).replace(FURTHER_MARKER, "")
    html = md_to_html(body_md_marked)
    # mistune wraps the marker in <p>; normalize to bare token for split
    html = re.sub(rf"<p>\s*{MID_MARKER}\s*</p>", MID_MARKER, html)
    html = html.replace(MID_MARKER, MID_MARKER)

    further_jsx = further_to_jsx(further_md) if further_md else ""
    page = build_page(lede, html, further_jsx)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")
    print(f"wrote {out} ({out.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
