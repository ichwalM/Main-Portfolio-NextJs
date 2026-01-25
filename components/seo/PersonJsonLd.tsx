export default function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ichwal',
    jobTitle: 'Full Stack Developer',
    url: 'https://walldev.my.id',
    sameAs: [
      'https://github.com/ichwal',
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
