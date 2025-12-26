import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import achievementsData from '../data/achievements.json';

const AchievementDetail = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const achievements = achievementsData[currentLang] || achievementsData.en;
    const achievement = achievements.find(a => a.id === parseInt(id));

    if (!achievement) {
        return (
            <div className="section">
                <div className="container">
                    <h1>Achievement not found</h1>
                    <Link to={`/${lang}/achievements`} className="btn btn-primary">
                        {t('nav.achievements')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    {/* Breadcrumb Navigation */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        fontSize: '0.95rem',
                        flexWrap: 'wrap'
                    }}>
                        <Link to={`/${lang}`} style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none'
                        }}>
                            Home
                        </Link>
                        <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                        <Link to={`/${lang}/achievements`} style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none'
                        }}>
                            {t('nav.achievements')}
                        </Link>
                        <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{achievement.title}</span>
                    </div>

                    <img
                        src={achievement.image}
                        alt={achievement.title}
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            marginBottom: '2rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    />

                    <h1 className="section-title">{achievement.title}</h1>

                    <p style={{
                        marginBottom: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--accent-primary)',
                        fontSize: '1.1rem'
                    }}>
                        {t('achievements.date')}: {new Date(achievement.date).toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US')}
                    </p>

                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)'
                    }}>
                        {achievement.detailedDescription}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AchievementDetail;
