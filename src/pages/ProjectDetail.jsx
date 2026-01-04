import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import projectsData from '../data/projects.json';

const ProjectDetail = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const projects = projectsData[currentLang] || projectsData.en;
    const project = projects.find(p => p.id === parseInt(id));

    // Fallback to English project for images, link, and technologies
    const enProject = projectsData.en.find(p => p.id === parseInt(id));
    const projectImages = project?.images || enProject?.images || ['/images/project.png'];
    const projectTechnologies = project?.technologies || enProject?.technologies || [];

    // New metadata fields with fallback
    const projectYoutubeLink = project?.youtubeLink || enProject?.youtubeLink || '';
    const projectPurpose = project?.purpose || enProject?.purpose || '';
    const projectDuration = project?.duration || enProject?.duration || '';
    const projectDate = project?.date || enProject?.date || '';
    const projectGithub = project?.github || enProject?.github || '';
    const projectAppLink = project?.appLink || enProject?.appLink || '';

    // Helper to extract YouTube ID
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

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

                    <ImageCarousel
                        images={projectImages}
                        alt={project.title}
                    />

                    <h1 className="section-title">{project.title}</h1>

                    {/* Project Metadata Section */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        {projectPurpose && (
                            <div>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('projects.purpose')}</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{projectPurpose}</p>
                            </div>
                        )}
                        {projectDuration && (
                            <div>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('projects.duration')}</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{projectDuration}</p>
                            </div>
                        )}
                        {projectDate && (
                            <div>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('projects.date')}</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{projectDate}</p>
                            </div>
                        )}
                    </div>

                    <div style={{
                        fontSize: '1.125rem',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem'
                    }}
                        dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
                    />

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                            {t('projects.technologies')}
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {projectTechnologies.map((tech, i) => (
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

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        {projectAppLink && (
                            <a
                                href={projectAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ background: 'var(--accent-secondary)' }}
                            >
                                {t('projects.appLink')}
                            </a>
                        )}

                        {projectGithub && (
                            <a
                                href={projectGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{
                                    border: '1px solid var(--accent-primary)',
                                    color: 'var(--accent-primary)',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {t('projects.github')}
                            </a>
                        )}
                    </div>

                    {/* YouTube Video Embed */}
                    {projectYoutubeLink && getYoutubeId(projectYoutubeLink) && (
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Demo Video</h3>
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeId(projectYoutubeLink)}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%'
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
