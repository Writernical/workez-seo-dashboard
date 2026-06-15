// examples/blog-page.example.tsx
// HOW TO ADD AUTOMATIC SCHEMA TO BLOG POSTS.
// Your real file is something like: app/blog/[slug]/page.tsx
// Because the data comes from Payload, every new post gets schema automatically —
// no manual step per post.

import { JsonLd } from '../components/JsonLd'
import { blogPageSchemas } from '../lib/seo/schema'
import type { BlogPost, FaqItem } from '../lib/seo/types'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Replace with your real Payload fetch for a single published post.
  const doc: any = await fetchPostBySlug(params.slug)
  if (!doc) return null // your existing notFound() handling

  // Map CMS fields → BlogPost. Adjust field names to your Posts collection.
  const post: BlogPost = {
    slug: doc.slug,
    title: doc.title,
    description: doc.metaDescription ?? doc.excerpt ?? '',
    image: doc.ogImage?.url ?? doc.heroImage?.url,
    authorName: doc.author?.name,
    datePublished: doc.publishedAt ?? doc.createdAt,
    dateModified: doc.updatedAt,
    section: doc.category?.title,
    keywords: doc.keywords,
    wordCount: doc.wordCount,
    // If your posts have a structured FAQ block, map it here so FAQPage builds
    // automatically. If FAQs are only in the rich-text body, leave undefined.
    faqs: (doc.faqs ?? []).map((f: any): FaqItem => ({ question: f.question, answer: f.answer })),
  }

  const schemas = blogPageSchemas(post) // ← Article (+ FAQ if present) + Breadcrumb

  return (
    <>
      <JsonLd schema={schemas} />
      {/* …the rest of your existing blog post markup… */}
    </>
  )
}

declare function fetchPostBySlug(slug: string): Promise<any> // placeholder
