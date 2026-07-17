const isPlainObject = (value) => (
  value !== null
  && typeof value === 'object'
  && !Array.isArray(value)
);

const mergeLocalizedFields = (englishValue, localizedValue) => {
  if (localizedValue === undefined) {
    return englishValue;
  }

  if (Array.isArray(localizedValue)) {
    return localizedValue;
  }

  if (isPlainObject(englishValue) && isPlainObject(localizedValue)) {
    const keys = new Set([
      ...Object.keys(englishValue),
      ...Object.keys(localizedValue),
    ]);

    return Object.fromEntries(
      [...keys].map((key) => [
        key,
        mergeLocalizedFields(englishValue[key], localizedValue[key]),
      ]),
    );
  }

  return localizedValue;
};

export const resolveLocalizedVentures = (data, language) => {
  const englishVentures = Array.isArray(data?.en) ? data.en : [];
  const localizedVentures = Array.isArray(data?.[language])
    ? data[language]
    : [];
  const localizedBySlug = new Map(
    localizedVentures.map((venture) => [venture.slug, venture]),
  );

  return englishVentures.map((englishVenture) => (
    mergeLocalizedFields(
      englishVenture,
      localizedBySlug.get(englishVenture.slug),
    )
  ));
};

export const resolveLocalizedVenture = (data, language, slug) => (
  resolveLocalizedVentures(data, language).find(
    (venture) => venture.slug === slug,
  )
);

export const hasContent = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.some(hasContent);
  }

  if (isPlainObject(value)) {
    return Object.values(value).some(hasContent);
  }

  return value !== undefined && value !== null && value !== false;
};
