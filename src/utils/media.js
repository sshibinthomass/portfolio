export const FALLBACK_IMAGE = '/images/project.png';

export const resolveImageSource = (source) => (
  typeof source === 'string' && source.trim().length > 0
    ? source
    : FALLBACK_IMAGE
);
