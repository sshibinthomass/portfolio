import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import researchData from '../data/research.json';
import './Research.css';

const Research = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const research = researchData[currentLang] || researchData.en;

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('research.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                        {t('research.description')}
                    </p>

                    <div className="grid grid-3">
                        {research.map((paper, index) => (
                            <motion.div
                                key={paper.id}
                                className="research-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img src={paper.image} alt={paper.title} className="research-image" />
                                <div className="research-content">
                                    <h3 className="research-title">{paper.title}</h3>
                                    <p className="research-authors">{paper.authors}</p>
                                    <p className="research-journal">{paper.journal}, {paper.year}</p>
                                    <p className="research-abstract">
                                        <strong>{t('research.abstract')}:</strong> {paper.abstract}
                                    </p>
                                    {paper.link && (
                                        <a
                                            href={paper.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="research-link"
                                        >
                                            {t('research.readMore')} →
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Research;
