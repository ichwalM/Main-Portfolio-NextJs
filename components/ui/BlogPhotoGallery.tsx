'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';

interface BlogPhotoGalleryProps {
  photos: string[];
  title: string;
}

export default function BlogPhotoGallery({ photos, title }: BlogPhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="mb-12 -mx-6 md:-mx-12 lg:-mx-24">
        <div className="px-6 md:px-12 lg:px-24">
          <h3 className="text-2xl font-bold mb-6 gradient-text">📸 Photo Documentation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-video overflow-hidden bg-surface/30 group cursor-pointer hover:border-primary/50 transition-all border-r border-b border-white/5"
            >
              <Image
                src={photo}
                alt={`${title} - Photo ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click to enlarge
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={photos}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        altPrefix={title}
      />
    </>
  );
}
