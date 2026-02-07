'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fallback?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  priority?: boolean;
  imageTimeout?: number; // milliseconds
}

/**
 * Componente wrapper de Next.js Image que maneja:
 * - Timeouts en imágenes remotas (Google, etc)
 * - Fallback a imagen por defecto
 * - Loading state visual
 * - Error handling mejorado
 * 
 * By default:
 * - Google user photos: 5000ms timeout
 * - Fallback: /profile.svg
 */
export default function OptimizedImage({
  src,
  alt,
  fallback = '/profile.svg',
  fill = false,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  imageTimeout = 5000,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Timeout para URLs remotas de Google (problematic)
  useEffect(() => {
    if (!src || !src.includes('lh3.googleusercontent.com')) {
      return;
    }

    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn(`⏱️ Image timeout for: ${src}`);
        setImageSrc(fallback);
        setHasError(true);
        setIsLoading(false);
      }
    }, imageTimeout);

    return () => clearTimeout(timer);
  }, [src, isLoading, fallback, imageTimeout]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.warn(`⚠️ Image load error, using fallback for: ${imageSrc}`);
    setImageSrc(fallback);
    setHasError(true);
    setIsLoading(false);
  };

  const containerClass = fill
    ? 'relative w-full h-full'
    : '';

  return (
    <div className={`${containerClass} ${isLoading && !hasError ? 'animate-pulse bg-accent/10' : ''}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className || ''} ${fill ? 'absolute inset-0' : ''}`}
        style={
          !fill && objectFit
          ? { objectFit: objectFit  }
            : fill ? { objectFit: objectFit  } : undefined
        }
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        priority={priority}
        quality={75}
        sizes={fill ? '(max-width: 768px) 100vw, 50vw' : undefined}
      />
    </div>
  );
}
