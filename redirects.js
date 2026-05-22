// WorkEZ — 301 Redirects for next.config.js (old workez.in URLs -> new architecture)
// Compare pages removed: OMR landing now points to the OMR Urban Square centre.
module.exports = {
  async redirects() {
    return [
      { source: '/amenities/', destination: '/managed-office-space', permanent: true },
      { source: '/csr/', destination: '/about-us/', permanent: true },
      { source: '/coworking-office-space-solutions/', destination: '/managed-office-space', permanent: true },
      { source: '/shared-workspace-gallery/', destination: '/gallery', permanent: true },
      { source: '/workez-annasalai/', destination: '/location/managed-office-space-chennai/annasalai-hansa', permanent: true },
      { source: '/workez-clubhouse-annasalai/', destination: '/location/managed-office-space-chennai/annasalai-clubhouse', permanent: true },
      { source: '/helix-velachery/', destination: '/location/managed-office-space-chennai/velachery-helix', permanent: true },
      { source: '/omr-urban-square/', destination: '/location/managed-office-space-chennai/omr-urban-square', permanent: true },
      { source: '/pallavaram-the-address/', destination: '/location/managed-office-space-chennai/pallavaram-the-address', permanent: true },
      { source: '/perungudi-sm-towers/', destination: '/location/managed-office-space-chennai/perungudi-sm-towers', permanent: true },
      { source: '/workez-the-ark-omr/', destination: '/location/managed-office-space-chennai/omr-the-ark', permanent: true },
      { source: '/guindy-willow-square/', destination: '/location/managed-office-space-chennai/guindy-willow-square', permanent: true },
      { source: '/why-workez/', destination: '/about-us/', permanent: true },
      { source: '/locations-omr-landing-page/', destination: '/location/managed-office-space-chennai/omr-urban-square', permanent: true },
      { source: '/coworking-space-locations/', destination: '/location/', permanent: true },
      { source: '/enquiry/', destination: '/book-a-tour/', permanent: true },
      { source: '/alwarpet/', destination: '/location/managed-office-space-chennai/alwarpet-park-centre', permanent: true },
      { source: '/bangalore/', destination: '/location/managed-office-space-bengaluru', permanent: true },
      { source: '/coimbatore/', destination: '/location/managed-office-space-coimbatore/saravanampatti', permanent: true },
      { source: '/location-chambers-guindy/', destination: '/location/managed-office-space-chennai/guindy-chambers', permanent: true },
    ];
  },
};
