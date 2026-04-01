// WorkEZ Meta Tags — Auto-generated from SEO Command Centre
// Usage: import { getMetadata } from './meta-tags'
// Then in your page: export const metadata = getMetadata('/about-us/')

import metaConfig from './workez-meta-tags.json'

export function getMetadata(path) {
  const page = metaConfig.pages[path]
  if (!page) {
    console.warn(`No meta config found for path: ${path}`)
    return {
      title: 'WorkEZ — Managed Office Spaces',
      description: 'Enterprise managed office spaces across Chennai, Bangalore & Coimbatore.',
    }
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords || '',
    alternates: {
      canonical: page.canonical,
    },
    robots: page.robots,
    openGraph: {
      title: page.og.title,
      description: page.og.description,
      type: page.og.type,
      url: page.og.url,
      siteName: page.og.site_name,
      locale: page.og.locale,
      images: [{ url: page.og.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: page.twitter.card,
      title: page.twitter.title,
      description: page.twitter.description,
      site: page.twitter.site,
      images: [page.twitter.image],
    },
  }
}

// For pages with dynamic routes (blog posts, etc.)
export function getBlogPostMetadata(slug, title, description, image) {
  return {
    title: `${title} — WorkEZ Blog`,
    description,
    alternates: { canonical: `https://workez.in/blog/${slug}` },
    robots: 'index, follow',
    openGraph: {
      title: `${title} — WorkEZ Blog`,
      description,
      type: 'article',
      url: `https://workez.in/blog/${slug}`,
      siteName: 'WorkEZ',
      locale: 'en_IN',
      images: [{ url: image || 'https://workez.in/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — WorkEZ Blog`,
      description,
      site: '@workez_',
      images: [image || 'https://workez.in/og-default.jpg'],
    },
  }
}
