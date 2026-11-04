import type { Profile } from '@/types/profile';
import type { About } from '@/types/about';

interface PersonJsonLdProps {
  profile: Profile | null;
  about: About | null;
}

export default function PersonJsonLd({ profile, about }: PersonJsonLdProps) {
  const name = profile?.name || 'Ichwal';
  const description = about?.about_deskripsi || 'Full Stack Developer & DevOps Engineer dari Makassar, Indonesia.';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    alternateName: ['IchwalM', 'Ichwal Developer', 'Ichwal Full Stack'],
    description: description.slice(0, 160),
    jobTitle: 'Full Stack Developer & DevOps Engineer',
    url: 'https://walldev.my.id',
    image: profile?.hero_image || 'https://walldev.my.id/og-image.jpg',
    email: profile?.email || 'contact@walldev.my.id',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Makassar',
      addressRegion: 'Sulawesi Selatan',
      addressCountry: 'ID',
    },
    ...(about?.about_univ && {
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: about.about_univ,
      }
    }),
    sameAs: [
      'https://walldev.my.id',
      profile?.social_links?.github || 'https://github.com/IchwalM',
      profile?.social_links?.linkedin || 'https://linkedin.com/in/ichwal',
      profile?.social_links?.instagram || '',
    ].filter(Boolean),
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Laravel',
      'PHP',
      'DevOps & Cloud Infrastructure',
      'Docker & Containerization',
      'CI/CD Pipelines',
      'Server Administration',
      'Linux',
      'Cyber Security',
    ],
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
