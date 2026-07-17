import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import venturesData from '../data/ventures.json';
import './VentureDetail.css';

const VentureDetail = () => {
  const { t, i18n } = useTranslation();
  const { lang, slug } = useParams();
  const currentLang = i18n.language;
  const localizedVenture = venturesData[currentLang]?.find(
    (venture) => venture.slug === slug,
  );
  const englishVenture = venturesData.en.find(
    (venture) => venture.slug === slug,
  );
  const venture = localizedVenture || englishVenture;

  if (!venture) {
    return (
      <main className="venture-not-found section">
        <div className="container">
          <h1>{t('entrepreneurship.notFoundTitle')}</h1>
          <p>{t('entrepreneurship.notFoundDescription')}</p>
          <Link to={`/${lang}/entrepreneurship`}>
            ← {t('entrepreneurship.backToEntrepreneurship')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`venture-detail venture-detail--${venture.accent}`}>
      <section className="venture-hero section">
        <div className="container venture-hero__grid">
          <motion.div
            className="venture-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link className="venture-back-link" to={`/${lang}/entrepreneurship`}>
              ← {t('entrepreneurship.backToEntrepreneurship')}
            </Link>
            <p className="venture-hero__category">{venture.category}</p>
            <h1>{venture.name}</h1>
            <p className="venture-hero__tagline">{venture.tagline}</p>
            <div className="venture-hero__meta">
              <span>{venture.role}</span>
              <span>{t('entrepreneurship.founded')} {venture.founded}</span>
              <span>{venture.status}</span>
            </div>
            <p className="venture-hero__mission">{venture.mission}</p>
            <a
              className="venture-cta"
              href={venture.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('entrepreneurship.visitWebsite')} ↗
            </a>
          </motion.div>
          <motion.div
            className="venture-hero__media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <img src={venture.heroImage} alt={venture.heroAlt} />
          </motion.div>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container venture-narrative-grid">
          {[venture.opportunity, venture.solution].map((section) => (
            <article className="venture-panel" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="venture-section venture-section--tinted section">
        <div className="container venture-founder-grid">
          <div>
            <p className="venture-section__label">{venture.role}</p>
            <h2>{venture.founderRole.title}</h2>
            <p>{venture.founderRole.body}</p>
          </div>
          <ul className="venture-responsibilities">
            {venture.founderRole.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container">
          <h2 className="venture-section__title">{t('entrepreneurship.products')}</h2>
          <div className="venture-product-grid">
            {venture.products.map((product) => (
              <article className="venture-product" key={product.name}>
                <span className="venture-product__availability">
                  {product.availability}
                </span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="venture-section venture-section--tinted section">
        <div className="container venture-evidence-grid">
          <div>
            <h2>{t('entrepreneurship.milestones')}</h2>
            <ol className="venture-timeline">
              {venture.milestones.map((milestone) => (
                <li key={`${milestone.year}-${milestone.title}`}>
                  <span>{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>{t('entrepreneurship.highlights')}</h2>
            <ul className="venture-highlights">
              {venture.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container venture-direction">
          <h2>{venture.currentDirection.title}</h2>
          <p>{venture.currentDirection.body}</p>
        </div>
      </section>

      {venture.gallery?.length > 0 && (
        <section className="venture-section section">
          <div className="container venture-gallery">
            {venture.gallery.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
        </section>
      )}

      <section className="venture-closing section">
        <div className="container">
          <h2>{venture.name}</h2>
          <p>{venture.tagline}</p>
          <a
            className="venture-cta"
            href={venture.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('entrepreneurship.visitWebsite')} ↗
          </a>
        </div>
      </section>
    </main>
  );
};

export default VentureDetail;
