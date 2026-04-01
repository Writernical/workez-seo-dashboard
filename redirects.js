// WorkEZ — 301 Redirects (Old Site → New Site with ACTUAL dev URLs)
// Add to next.config.js → redirects()

module.exports = {
  async redirects() {
    return [
      // === OLD SITE LOCATION PAGES → NEW DEV URLS ===
      { source: '/workez-annasalai', destination: '/location/managed-office-space-chennai/workez-anna-salai', permanent: true },
      { source: '/workez-annasalai/', destination: '/location/managed-office-space-chennai/workez-anna-salai', permanent: true },
      { source: '/workez-clubhouse-annasalai', destination: '/location/managed-office-space-chennai/workez-anna-salai-clubhouse', permanent: true },
      { source: '/workez-clubhouse-annasalai/', destination: '/location/managed-office-space-chennai/workez-anna-salai-clubhouse', permanent: true },
      { source: '/workez-guindy', destination: '/location/managed-office-space-chennai/workez-guindy', permanent: true },
      { source: '/workez-guindy/', destination: '/location/managed-office-space-chennai/workez-guindy', permanent: true },
      { source: '/location-chambers-guindy', destination: '/location/managed-office-space-chennai/workez-guindy-chambers', permanent: true },
      { source: '/location-chambers-guindy/', destination: '/location/managed-office-space-chennai/workez-guindy-chambers', permanent: true },
      { source: '/workez-perungudi', destination: '/location/managed-office-space-chennai/workez-perungudi', permanent: true },
      { source: '/workez-perungudi/', destination: '/location/managed-office-space-chennai/workez-perungudi', permanent: true },
      { source: '/workez-omr', destination: '/location/managed-office-space-chennai/workez-omr', permanent: true },
      { source: '/workez-omr/', destination: '/location/managed-office-space-chennai/workez-omr', permanent: true },
      { source: '/workez-the-ark-omr', destination: '/location/managed-office-space-chennai/workez-omr-the-ark', permanent: true },
      { source: '/workez-the-ark-omr/', destination: '/location/managed-office-space-chennai/workez-omr-the-ark', permanent: true },
      { source: '/workez-pallavaram', destination: '/location/managed-office-space-chennai/workez-pallavaram', permanent: true },
      { source: '/workez-pallavaram/', destination: '/location/managed-office-space-chennai/workez-pallavaram', permanent: true },
      { source: '/helix-velachery', destination: '/location/managed-office-space-chennai/workez-velachery', permanent: true },
      { source: '/helix-velachery/', destination: '/location/managed-office-space-chennai/workez-velachery', permanent: true },
      { source: '/alwarpet', destination: '/location/managed-office-space-chennai/workez-alwarpet', permanent: true },
      { source: '/alwarpet/', destination: '/location/managed-office-space-chennai/workez-alwarpet', permanent: true },
      { source: '/bangalore', destination: '/location/managed-office-space-bengaluru', permanent: true },
      { source: '/bangalore/', destination: '/location/managed-office-space-bengaluru', permanent: true },
      { source: '/coimbatore', destination: '/location/managed-office-space-coimbatore/workez-rs-puram', permanent: true },
      { source: '/coimbatore/', destination: '/location/managed-office-space-coimbatore/workez-rs-puram', permanent: true },

      // === HUB PAGES ===
      { source: '/coworking-space-locations', destination: '/location', permanent: true },
      { source: '/coworking-space-locations/', destination: '/location', permanent: true },
      { source: '/coworking-office-space-solutions', destination: '/managed-office-space', permanent: true },
      { source: '/coworking-office-space-solutions/', destination: '/managed-office-space', permanent: true },
      { source: '/locations-omr-landing-page', destination: '/location/managed-office-space-chennai', permanent: true },
      { source: '/locations-omr-landing-page/', destination: '/location/managed-office-space-chennai', permanent: true },

      // === MISC ===
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
