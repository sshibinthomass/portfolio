import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card/Card';
import achievementsData from '../data/achievements.json';

const Achievements = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = i18n.language;
    const achievements = achievementsData[currentLang] || achievementsData.en;

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('achievements.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                        {t('achievements.description')}
                    </p>

                    <div className="grid grid-3">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/${lang}/achievements/${achievement.id}`} style={{ textDecoration: 'none' }}>
                                    <Card
                                        image={achievement.image}
                                        title={achievement.title}
                                        description={achievement.description}
                                        onClick={() => { }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Achievements;
