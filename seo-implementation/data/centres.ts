// data/centres.ts
// The 13 live WorkEZ centres (4 cities). Single source of truth for location
// schema. There is NO "One National Park, Velachery" — the Velachery centre is
// Helix. Do not re-add it.
//
// DATA NOTES (please confirm against the live page / CMS before relying on schema):
//  - GEO coordinates are the corrected values (verified). Safe to use.
//  - ADDRESSES come from the previous schema set, except Hansa which was updated
//    from the live page (the old one was outdated). Spot-check the rest.
//  - SARAVANAMPATTI postcode was wrong in the old data (560103 is a Bengaluru
//    code) — corrected here to 641035 (Coimbatore). Confirm the exact code.
//  - OMR Urban Square postcode in old data (600002) looked wrong for OMR;
//    set to 600096 here and flagged CONFIRM.
//  - SEATS and PRICES are intentionally left out. Add them per centre only if you
//    have authoritative numbers (ideally read them from the same CMS field the
//    page already shows, so schema can never drift from the visible page).
//  - heroImage: live assets follow /locations/{city}/{centre}/hero.webp. Confirm
//    each folder name; where unsure it is left undefined and the builder falls
//    back to the default OG image.

import type { Centre } from '../lib/seo/types'

export const CENTRES: Centre[] = [
  {
    slug: 'annasalai-clubhouse',
    path: '/location/managed-office-space-chennai/annasalai-clubhouse',
    name: 'WorkEZ Clubhouse, Anna Salai',
    city: 'Chennai',
    address: { street: 'Club House Road, Off Anna Salai, Thousand Lights', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600002' },
    geo: { lat: 13.061182, lng: 80.264064 },
    heroImage: '/locations/chennai/clubhouse/hero.webp',
  },
  {
    slug: 'annasalai-hansa',
    path: '/location/managed-office-space-chennai/annasalai-hansa',
    name: 'WorkEZ Hansa, Anna Salai',
    city: 'Chennai',
    // Address updated from the live page (old schema had No.53 / 600002).
    address: { street: 'RK Swamy Centre, Block-B, Door No.3, 147, Pathari Rd, Thousand Lights', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600006' },
    geo: { lat: 13.060433, lng: 80.256889 },
    heroImage: '/locations/chennai/hansa/hero.webp',
  },
  {
    slug: 'guindy-willow-square',
    path: '/location/managed-office-space-chennai/guindy-willow-square',
    name: 'WorkEZ Willow Square, Guindy',
    city: 'Chennai',
    address: { street: 'Willow Square, SIDCO Industrial Estate, Guindy', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600032' },
    geo: { lat: 13.010464, lng: 80.209073 },
    heroImage: '/locations/chennai/willow-square/hero.webp',
  },
  {
    slug: 'guindy-chambers',
    path: '/location/managed-office-space-chennai/guindy-chambers',
    name: 'WorkEZ Chambers, Guindy',
    city: 'Chennai',
    address: { street: 'Chambers, SIDCO Industrial Estate, Guindy', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600032' },
    geo: { lat: 13.01215, lng: 80.208739 },
    heroImage: '/locations/chennai/chambers/hero.webp',
  },
  {
    slug: 'perungudi-sm-towers',
    path: '/location/managed-office-space-chennai/perungudi-sm-towers',
    name: 'WorkEZ SM Towers, Perungudi',
    city: 'Chennai',
    address: { street: 'SM Towers, Old Mahabalipuram Road (OMR), Perungudi', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600096' },
    geo: { lat: 12.953716, lng: 80.242003 },
    heroImage: '/locations/chennai/sm-towers/hero.webp',
  },
  {
    slug: 'omr-urban-square',
    path: '/location/managed-office-space-chennai/omr-urban-square',
    name: 'WorkEZ Urban Square, OMR',
    city: 'Chennai',
    // CONFIRM postcode — old data said 600002 (wrong for OMR); set to 600096.
    address: { street: 'Urban Square, Old Mahabalipuram Road (OMR), Elango Nagar', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600096' },
    geo: { lat: 12.973081, lng: 80.250865 },
    heroImage: '/locations/chennai/urban-square/hero.webp',
  },
  {
    slug: 'omr-the-ark',
    path: '/location/managed-office-space-chennai/omr-the-ark',
    name: 'WorkEZ The Ark, OMR',
    city: 'Chennai',
    address: { street: 'The Ark, Old Mahabalipuram Road (OMR), Sholinganallur', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600119' },
    geo: { lat: 12.906496, lng: 80.228672 },
    heroImage: '/locations/chennai/the-ark/hero.webp',
  },
  {
    slug: 'pallavaram-the-address',
    path: '/location/managed-office-space-chennai/pallavaram-the-address',
    name: 'WorkEZ The Address, Pallavaram',
    city: 'Chennai',
    address: { street: 'The Address, Pallavaram, Near Chennai Airport', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600043' },
    geo: { lat: 12.952281, lng: 80.162912 },
    heroImage: '/locations/chennai/the-address/hero.webp',
  },
  {
    slug: 'velachery-helix',
    path: '/location/managed-office-space-chennai/velachery-helix',
    name: 'WorkEZ Helix, Velachery',
    city: 'Chennai',
    address: { street: 'Helix, Velachery Main Road, Velachery', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600042' },
    geo: { lat: 12.99141, lng: 80.219024 },
    heroImage: '/locations/chennai/helix/hero.webp',
  },
  {
    slug: 'alwarpet-park-centre',
    path: '/location/managed-office-space-chennai/alwarpet-park-centre',
    name: 'WorkEZ Park Centre, Alwarpet',
    city: 'Chennai',
    address: { street: 'Park Centre, Alwarpet', locality: 'Chennai', region: 'Tamil Nadu', postalCode: '600018' },
    geo: { lat: 13.030116, lng: 80.252066 },
    heroImage: '/locations/chennai/park-centre/hero.webp',
  },
  {
    slug: 'bellandur',
    path: '/location/managed-office-space-bengaluru/bellandur',
    name: 'WorkEZ Techshire, Bellandur',
    city: 'Bengaluru',
    address: { street: 'Devarabisanahalli, Outer Ring Road, Bellandur', locality: 'Bengaluru', region: 'Karnataka', postalCode: '560103' },
    geo: { lat: 12.931127, lng: 77.687287 },
    heroImage: '/locations/bengaluru/techshire/hero.webp',
  },
  {
    slug: 'saravanampatti',
    path: '/location/managed-office-space-coimbatore/saravanampatti',
    name: 'WorkEZ Vivera, Saravanampatti',
    city: 'Coimbatore',
    // Address + pincode 641035 VERIFIED against the live page (old data had 560103, a Bengaluru code).
    address: { street: 'No.173, Sathy Rd, Saravanampatti', locality: 'Coimbatore', region: 'Tamil Nadu', postalCode: '641035' },
    geo: { lat: 11.07857, lng: 77.003213 },
    heroImage: '/locations/coimbatore/vivera/hero.webp',
  },
  {
    slug: 'kakkanad-it-twin-towers',
    path: '/location/managed-office-space-kochi/kakkanad-it-twin-towers',
    name: 'WorkEZ IT Twin Towers, Kakkanad',
    city: 'Kochi',
    address: { street: '17th Floor, North Block, LuLu IT Twin Towers, SmartCity, Edachira, Kakkanad', locality: 'Kochi', region: 'Kerala', postalCode: '682030' },
    geo: { lat: 10.012517, lng: 76.372393 },
    heroImage: '/locations/kochi/it-twin-towers/hero.webp',
  },
]

export function getCentreBySlug(slug: string): Centre | undefined {
  return CENTRES.find((c) => c.slug === slug)
}

export function getCentreByPath(path: string): Centre | undefined {
  return CENTRES.find((c) => c.path === path)
}
