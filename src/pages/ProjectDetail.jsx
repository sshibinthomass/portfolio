import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

const ProjectDetail = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const projects = projectsData[currentLang] || projectsData.en;
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="section">
                <div className="container">
                    <h1>Project not found</h1>
                    <Link to={`/${lang}/projects`} className="btn btn-primary">
                        {t('nav.projects')}
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
                        <Link to={`/${lang}/projects`} style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none'
                        }}>
                            {t('nav.projects')}
                        </Link>
                        <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{project.title}</span>
                    </div>

                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            marginBottom: '2rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    />

                    <h1 className="section-title">{project.title}</h1>

                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem'
                    }}>
                        {project.detailedDescription}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                            {t('projects.technologies')}
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--accent-gradient)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        fontSize: '0.95rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            {t('projects.liveDemo')}
                        </a>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
