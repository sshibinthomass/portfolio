import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import HobbyIcon from '../../components/HobbyIcon/HobbyIcon';
import './HobbiesMain.css';

const HobbiesMain = () => {
    const { t } = useTranslation();
    const { lang } = useParams();

    const hobbies = [
        { key: 'coinCollection', path: 'coin-collection', icon: 'coin' },
        { key: 'stampCollection', path: 'stamp-collection', icon: 'stamp' },
        { key: 'reading', path: 'reading', icon: 'reading' },
        { key: 'gardening', path: 'gardening', icon: 'gardening' },
        { key: 'travel', path: 'travel', icon: 'travel' },
    ];

    return (
        <div className="section">
            <div className="container">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('nav.hobbies')}</h1>

                    <Motion.div
                        className="hobbies-in-progress-banner"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="banner-icon">🚧</div>
                        <div className="banner-content">
                            <span className="banner-title">{t('hobbies.inProgressTitle')}</span>
                            <span className="banner-text">{t('hobbies.inProgressText')}</span>
                        </div>
                    </Motion.div>

                    <div className="hobbies-grid">
                        {hobbies.map((hobby, index) => (
                            <Motion.div
                                key={hobby.key}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link to={`/${lang}/hobbies/${hobby.path}`} className="hobby-card">
                                    <div className="hobby-icon"><HobbyIcon type={hobby.icon} /></div>
                                    <h3 className="hobby-title">{t(`hobbies.${hobby.key}`)}</h3>
                                </Link>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>
            </div>
        </div>
    );
};

export default HobbiesMain;
