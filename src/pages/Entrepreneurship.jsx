import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import VentureCard from '../components/VentureCard/VentureCard';
import venturesData from '../data/ventures.json';
import './Entrepreneurship.css';

const Entrepreneurship = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = i18n.language;
  const ventures = venturesData[currentLang] || venturesData.en;

  return (
    <div className="entrepreneurship section">
      <div className="container">
        <Motion.header
          className="entrepreneurship__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="entrepreneurship__kicker">Founder portfolio</p>
          <h1 className="section-title">{t('entrepreneurship.title')}</h1>
          <p className="entrepreneurship__intro">
            {t('entrepreneurship.description')}
          </p>
        </Motion.header>

        <div className="entrepreneurship__grid">
          {ventures.map((venture, index) => (
            <VentureCard
              key={venture.slug}
              venture={venture}
              lang={lang}
              exploreLabel={t('entrepreneurship.exploreVenture')}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entrepreneurship;
