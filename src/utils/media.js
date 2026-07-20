export const FALLBACK_IMAGE = '/images/project.png';

export const resolveImageSource = (source) => (
  typeof source === 'string' && source.trim().length > 0
    ? source
    : FALLBACK_IMAGE
);

export const getYoutubeId = (url) => {
  if (!url) return null;

  const match = String(url).match(
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/,
  );

  return match?.[1]?.length === 11 ? match[1] : null;
};
