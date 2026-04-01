// WorkEZ — 301 Redirects for next.config.js
// Covers: old live site URLs + dev site URLs → final SEO-optimized URLs

module.exports = {
  async redirects() {
    return [
      // === OLD LIVE SITE → FINAL SEO URLs ===
      { source: '/workez-annasalai', destination: '/location/managed-office-space-chennai/annasalai-hansa', permanent: true },
      { source: '/workez-annasalai/', destination: '/location/managed-office-space-chennai/annasalai-hansa', permanent: true },
      { source: '/workez-clubhouse-annasalai', destination: '/location/managed-office-space-chennai/annasalai-clubhouse', permanent: true },
      { source: '/workez-clubhouse-annasalai/', destination: '/location/managed-office-space-chennai/annasalai-clubhouse', permanent: true },
      { source: '/workez-guindy', destination: '/location/managed-office-space-chennai/guindy-willow-square', permanent: true },
      { source: '/workez-guindy/', destination: '/location/managed-office-space-chennai/guindy-willow-square', permanent: true },
      { source: '/location-chambers-guindy', destination: '/location/managed-office-space-chennai/guindy-chambers', permanent: true },
      { source: '/location-chambers-guindy/', destination: '/location/managed-office-space-chennai/guindy-chambers', permanent: true },
      { source: '/workez-perungudi', destination: '/location/managed-office-space-chennai/perungudi-sm-towers', permanent: true },
      { source: '/workez-perungudi/', destination: '/location/managed-office-space-chennai/perungudi-sm-towers', permanent: true },
      { source: '/workez-omr', destination: '/location/managed-office-space-chennai/omr-urban-square', permanent: true },
      { source: '/workez-omr/', destination: '/location/managed-office-space-chennai/omr-urban-square', permanent: true },
      { source: '/workez-the-ark-omr', destination: '/location/managed-office-space-chennai/omr-the-ark', permanent: true },
      { source: '/workez-the-ark-omr/', destination: '/location/managed-office-space-chennai/omr-the-ark', permanent: true },
      { source: '/workez-pallavaram', destination: '/location/managed-office-space-chennai/pallavaram-the-address', permanent: true },
      { source: '/workez-pallavaram/', destination: '/location/managed-office-space-chennai/pallavaram-the-address', permanent: true },
      { source: '/helix-velachery', destination: '/location/managed-office-space-chennai/velachery-helix', permanent: true },
      { source: '/helix-velachery/', destination: '/location/managed-office-space-chennai/velachery-helix', permanent: true },
      { source: '/alwarpet', destination: '/location/managed-office-space-chennai/alwarpet-park-centre', permanent: true },
      { source: '/alwarpet/', destination: '/location/managed-office-space-chennai/alwarpet-park-centre', permanent: true },
      { source: '/bangalore', destination: '/location/managed-office-space-bengaluru', permanent: true },
      { source: '/bangalore/', destination: '/location/managed-office-space-bengaluru', permanent: true },
      { source: '/coimbatore', destination: '/location/managed-office-space-coimbatore/saravanampatti', permanent: true },
      { source: '/coimbatore/', destination: '/location/managed-office-space-coimbatore/saravanampatti', permanent: true },

      // === DEV SITE SLUGS → FINAL SEO URLs (in case any got indexed or bookmarked) ===
      { source: '/location/managed-office-space-chennai/workez-anna-salai', destination: '/location/managed-office-space-chennai/annasalai-hansa', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-anna-salai-clubhouse', destination: '/location/managed-office-space-chennai/annasalai-clubhouse', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-guindy', destination: '/location/managed-office-space-chennai/guindy-willow-square', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-guindy-chambers', destination: '/location/managed-office-space-chennai/guindy-chambers', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-perungudi', destination: '/location/managed-office-space-chennai/perungudi-sm-towers', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-omr', destination: '/location/managed-office-space-chennai/omr-urban-square', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-omr-the-ark', destination: '/location/managed-office-space-chennai/omr-the-ark', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-pallavaram', destination: '/location/managed-office-space-chennai/pallavaram-the-address', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-velachery', destination: '/location/managed-office-space-chennai/velachery-helix', permanent: true },
      { source: '/location/managed-office-space-chennai/workez-alwarpet', destination: '/location/managed-office-space-chennai/alwarpet-park-centre', permanent: true },
      { source: '/location/managed-office-space-bengaluru/workez-koramangala', destination: '/location/managed-office-space-bengaluru/bellandur', permanent: true },
      { source: '/location/managed-office-space-coimbatore/workez-rs-puram', destination: '/location/managed-office-space-coimbatore/saravanampatti', permanent: true },

      // === HUB & MISC PAGES ===
      { source: '/coworking-space-locations', destination: '/location', permanent: true },
      { source: '/coworking-space-locations/', destination: '/location', permanent: true },
      { source: '/coworking-office-space-solutions', destination: '/managed-office-space', permanent: true },
      { source: '/coworking-office-space-solutions/', destination: '/managed-office-space', permanent: true },
      { source: '/locations-omr-landing-page', destination: '/location/managed-office-space-chennai', permanent: true },
      { source: '/locations-omr-landing-page/', destination: '/location/managed-office-space-chennai', permanent: true },
      { source: '/amenities', destination: '/managed-office-space', permanent: true },
      { source: '/amenities/', destination: '/managed-office-space', permanent: true },
      { source: '/csr', destination: '/about-us', permanent: true },
      { source: '/csr/', destination: '/about-us', permanent: true },
      { source: '/why-workez', destination: '/about-us', permanent: true },
      { source: '/why-workez/', destination: '/about-us', permanent: true },
      { source: '/shared-workspace-gallery', destination: '/gallery', permanent: true },
      { source: '/shared-workspace-gallery/', destination: '/gallery', permanent: true },
      { source: '/enquiry', destination: '/book-a-tour', permanent: true },
      { source: '/enquiry/', destination: '/book-a-tour', permanent: true },
    ]
  },
}
