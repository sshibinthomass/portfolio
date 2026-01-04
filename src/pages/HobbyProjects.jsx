import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card/Card';
import hobbyProjectsData from '../data/hobbyProjects.json';
import './HobbyProjects.css';

const CATEGORIES = ['all', 'agentic-llm', 'robotics-iot', 'web-app'];

const HobbyProjects = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = i18n.language;
    const allProjects = hobbyProjectsData[currentLang] || hobbyProjectsData.en;

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? allProjects
        : allProjects.filter(project => project.category === activeCategory);

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbyProjects.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        {t('hobbyProjects.description')}
                    </p>

                    {/* Category Filter Tabs */}
                    <div className="filter-tabs">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {t(`hobbyProjects.categories.${category}`)}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-3">
                        {filteredProjects.map((project, index) => (
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
