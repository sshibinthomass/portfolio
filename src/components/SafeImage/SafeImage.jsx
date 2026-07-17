import React from 'react';
import { FALLBACK_IMAGE, resolveImageSource } from '../../utils/media';

const handleImageError = ({ currentTarget }) => {
  currentTarget.onerror = null;
  currentTarget.src = FALLBACK_IMAGE;
};

const SafeImage = ({ src, alt = '', ...props }) => (
  <img
    {...props}
    src={resolveImageSource(src)}
    alt={alt}
    onError={handleImageError}
  />
);

export default SafeImage;
