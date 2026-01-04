import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card/Card';
import projectsData from '../data/projects.json';

const Projects = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = i18n.language;
    const projects = projectsData[currentLang] || projectsData.en;

    // Helper function to get project image with English fallback
    const getProjectImage = (project) => {
        if (project.images && project.images.length > 0) {
            return project.images[0];
        }
        if (project.image) {
            return project.image;
        }
        // Fallback to English project
        if (currentLang !== 'en') {
            const enProject = projectsData.en.find(p => p.id === project.id);
            if (enProject?.images && enProject.images.length > 0) return enProject.images[0];
            if (enProject?.image) return enProject.image;
        }
        return '/images/project.png'; // Default fallback
    };

    // Helper function to get project technologies with English fallback
    const getProjectTechnologies = (project) => {
        if (project.technologies && project.technologies.length > 0) {
            return project.technologies;
        }
        // Fallback to English project
        if (currentLang !== 'en') {
            const enProject = projectsData.en.find(p => p.id === project.id);
            if (enProject?.technologies) return enProject.technologies;
        }
        return [];
    };

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('projects.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                        {t('projects.description')}
                    </p>

                    <div className="grid grid-3">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/${lang}/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                                    <Card
                                        image={getProjectImage(project)}
                                        title={project.title}
                                        description={project.description}
                                        tags={getProjectTechnologies(project)}
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

export default Projects;
