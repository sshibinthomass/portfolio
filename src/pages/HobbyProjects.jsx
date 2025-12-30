import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card/Card';
import hobbyProjectsData from '../data/hobbyProjects.json';

const HobbyProjects = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = i18n.language;
    const projects = hobbyProjectsData[currentLang] || hobbyProjectsData.en;

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbyProjects.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                        {t('hobbyProjects.description')}
                    </p>

                    <div className="grid grid-3">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/${lang}/hobby-projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                    <Card
                                        image={(project.images && project.images.length > 0) ? project.images[0] : (hobbyProjectsData.en.find(p => p.id === project.id)?.images?.[0] || '')}
                                        title={project.title}
                                        description={project.description}
                                        tags={project.technologies}
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

export default HobbyProjects;
