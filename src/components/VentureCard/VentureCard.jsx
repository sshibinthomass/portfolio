import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './VentureCard.css';

const VentureCard = ({ venture, lang, exploreLabel, index }) => (
  <motion.article
    className={`venture-card venture-card--${venture.accent}`}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="venture-card__media">
      <img src={venture.heroImage} alt={venture.heroAlt} />
      <span className="venture-card__status">{venture.status}</span>
    </div>
    <div className="venture-card__body">
      <div className="venture-card__eyebrow">
        <span>{venture.role}</span>
        <span aria-hidden="true">•</span>
        <span>{venture.founded}</span>
      </div>
      <h2>{venture.name}</h2>
      <p className="venture-card__category">{venture.category}</p>
      <p>{venture.description}</p>
      <Link
        className="venture-card__link"
        to={`/${lang}/entrepreneurship/${venture.slug}`}
      >
        {exploreLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  </motion.article>
);

export default VentureCard;
