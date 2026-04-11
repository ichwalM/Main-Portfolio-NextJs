export default function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ichwal',
    alternateName: ['IchwalM', 'Ichwal Developer', 'Ichwal Full Stack'],
    description: 'Ichwal adalah Full Stack Developer dan Network Administrator dari Makassar, Indonesia. Spesialis Laravel, React, Next.js, dan infrastruktur jaringan.',
    jobTitle: 'Full Stack Developer & Network Administrator',
    url: 'https://walldev.my.id',
    image: 'https://walldev.my.id/og-image.jpg',
    email: 'contact@walldev.my.id',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Makassar',
      addressRegion: 'Sulawesi Selatan',
      addressCountry: 'ID',
    },
    sameAs: [
      'https://walldev.my.id',
      'https://github.com/IchwalM',
      'https://linkedin.com/in/ichwal',
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Laravel',
      'PHP',
      'MySQL',
      'PostgreSQL',
      'Network Administration',
      'Server Administration',
      'Linux',
      'REST API',
      'Docker',
      'Tailwind CSS',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Indonesia',
      },
      skills: 'Laravel, React, Next.js, TypeScript, Network Administration',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Walldev',
      url: 'https://walldev.my.id',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
