import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import SafeImage from '../components/SafeImage/SafeImage';
import venturesData from '../data/ventures.json';
import {
  hasContent,
  resolveLocalizedVenture,
} from '../utils/ventureData';
import './VentureDetail.css';

const VentureDetail = () => {
  const { t } = useTranslation();
  const { lang, slug } = useParams();
  const currentLang = lang === 'de' ? 'de' : 'en';
  const venture = resolveLocalizedVenture(venturesData, currentLang, slug);

  if (!venture) {
    return (
      <div className="venture-not-found section">
        <div className="container">
          <h1>{t('entrepreneurship.notFoundTitle')}</h1>
          <p>{t('entrepreneurship.notFoundDescription')}</p>
          <Link to={`/${currentLang}/entrepreneurship`}>
            ← {t('entrepreneurship.backToEntrepreneurship')}
          </Link>
        </div>
      </div>
    );
  }

  const narrativeSections = [venture.opportunity, venture.solution]
    .filter(hasContent);
  const founderRole = venture.founderRole || {};
  const responsibilities = Array.isArray(founderRole.responsibilities)
    ? founderRole.responsibilities.filter(hasContent)
    : [];
  const products = Array.isArray(venture.products)
    ? venture.products.filter(hasContent)
    : [];
  const milestones = Array.isArray(venture.milestones)
    ? venture.milestones.filter(hasContent)
    : [];
  const highlights = Array.isArray(venture.highlights)
    ? venture.highlights.filter(hasContent)
    : [];
  const gallery = Array.isArray(venture.gallery)
    ? venture.gallery.filter(hasContent)
    : [];

  return (
    <div className={`venture-detail venture-detail--${venture.accent}`}>
      <section className="venture-hero section">
        <div className="container venture-hero__grid">
          <Motion.div
            className="venture-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              className="venture-back-link"
              to={`/${currentLang}/entrepreneurship`}
            >
              ← {t('entrepreneurship.backToEntrepreneurship')}
            </Link>
            {venture.category && (
              <p className="venture-hero__category">{venture.category}</p>
            )}
            <h1>{venture.name}</h1>
            {venture.tagline && (
              <p className="venture-hero__tagline">{venture.tagline}</p>
            )}
            <div className="venture-hero__meta">
              {venture.role && <span>{venture.role}</span>}
              {venture.founded && (
                <span>
                  {t('entrepreneurship.founded')} {venture.founded}
                </span>
              )}
              {venture.status && <span>{venture.status}</span>}
            </div>
            {venture.mission && (
              <p className="venture-hero__mission">{venture.mission}</p>
            )}
            {venture.website && (
              <a
                className="venture-cta"
                href={venture.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('entrepreneurship.visitWebsite')} ↗
              </a>
            )}
          </Motion.div>
          <Motion.div
            className="venture-hero__media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <SafeImage src={venture.heroImage} alt={venture.heroAlt} />
          </Motion.div>
        </div>
      </section>

      {narrativeSections.length > 0 && (
        <section className="venture-section section">
          <div className="container venture-narrative-grid">
            {narrativeSections.map((section, index) => (
              <article
                className="venture-panel"
                key={section.title || section.body || index}
              >
                {section.title && <h2>{section.title}</h2>}
                {section.body && <p>{section.body}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {hasContent(venture.founderRole) && (
        <section className="venture-section venture-section--tinted section">
          <div className="container venture-founder-grid">
            <div>
              {venture.role && (
                <p className="venture-section__label">{venture.role}</p>
              )}
              {founderRole.title && <h2>{founderRole.title}</h2>}
              {founderRole.body && <p>{founderRole.body}</p>}
            </div>
            {responsibilities.length > 0 && (
              <ul className="venture-responsibilities">
                {responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="venture-section section">
          <div className="container">
            <h2 className="venture-section__title">
              {t('entrepreneurship.products')}
            </h2>
            <div className="venture-product-grid">
              {products.map((product, index) => (
                <article
                  className="venture-product"
                  key={product.name || product.description || index}
                >
                  {product.availability && (
                    <span className="venture-product__availability">
                      {product.availability}
                    </span>
                  )}
                  {product.name && <h3>{product.name}</h3>}
                  {product.description && <p>{product.description}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(milestones.length > 0 || highlights.length > 0) && (
        <section className="venture-section venture-section--tinted section">
          <div className="container venture-evidence-grid">
            {milestones.length > 0 && (
              <div>
                <h2>{t('entrepreneurship.milestones')}</h2>
                <ol className="venture-timeline">
                  {milestones.map((milestone, index) => (
                    <li
                      key={`${milestone.year || ''}-${milestone.title || index}`}
                    >
                      {milestone.year && <span>{milestone.year}</span>}
                      {milestone.title && <h3>{milestone.title}</h3>}
                      {milestone.description && <p>{milestone.description}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {highlights.length > 0 && (
              <div>
                <h2>{t('entrepreneurship.highlights')}</h2>
                <ul className="venture-highlights">
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {hasContent(venture.currentDirection) && (
        <section className="venture-section section">
          <div className="container venture-direction">
            {venture.currentDirection.title && (
              <h2>{venture.currentDirection.title}</h2>
            )}
            {venture.currentDirection.body && (
              <p>{venture.currentDirection.body}</p>
            )}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="venture-section section">
          <div className="container venture-gallery">
            {gallery.map((image, index) => (
              <SafeImage
                key={image.src || image.alt || index}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </section>
      )}

      <section className="venture-closing section">
        <div className="container">
          <h2>{venture.name}</h2>
          {venture.tagline && <p>{venture.tagline}</p>}
          {venture.website && (
            <a
              className="venture-cta"
              href={venture.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('entrepreneurship.visitWebsite')} ↗
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default VentureDetail;
