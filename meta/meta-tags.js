import META from './workez-meta-tags.json';
// Next.js App Router. Usage:
//   import { getMetadata } from '@/seo/meta/meta-tags'
//   export const metadata = getMetadata('/location/managed-office-space-kochi/kakkanad-it-twin-towers')
export function getMetadata(path){
  const m = META[path]; if(!m) return {};
  return {
    title: m.title, description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og['og:title'], description: m.og['og:description'], url: m.og['og:url'], type: 'website', images: [m.og['og:image']] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
  };
}
