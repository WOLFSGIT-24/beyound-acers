import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";
const STATIC_MEDIA_URL = "https://static.wixstatic.com/media/";

type WixImageDataProps = {
  fittingType?: 'fit' | 'fill';
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & WixImageDataProps;

const resolveImageUrl = (url?: string): string => {
  if (!url) return FALLBACK_IMAGE_URL;
  if (url.startsWith('wix:image://v1/')) {
    const parts = url.replace('wix:image://v1/', '').split('#')[0].split('/');
    const uri = parts[0];
    return `${STATIC_MEDIA_URL}${uri}`;
  }
  return url;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType = 'fill', originWidth, originHeight, focalPointX, focalPointY, className, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string>(resolveImageUrl(src));

    useEffect(() => {
      setImgSrc(resolveImageUrl(src));
    }, [src]);

    if (!src) {
      return <div data-empty-image ref={ref} className={className} {...props} />;
    }

    return (
      <img
        ref={ref}
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMAGE_URL)}
        className={cn(
          fittingType === 'fit' ? 'object-contain' : 'object-cover',
          className
        )}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';
