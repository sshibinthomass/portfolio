import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillBar from '../components/SkillBar/SkillBar';
import skillsData from '../data/skills.json';
import resumeData from '../data/resume.json';
import projectsData from '../data/projects.json';
import hobbyProjectsData from '../data/hobbyProjects.json';
import achievementsData from '../data/achievements.json';
import researchData from '../data/research.json';
import './Home.css';

const Home = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = i18n.language;

    const skills = skillsData[currentLang] || skillsData.en;
    const resume = resumeData[currentLang] || resumeData.en;
    const projects = projectsData[currentLang] || projectsData.en;
    const hobbyProjects = hobbyProjectsData[currentLang] || hobbyProjectsData.en;
    const achievements = achievementsData[currentLang] || achievementsData.en;
    const research = researchData[currentLang] || researchData.en;

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
            if (enProject?.images) return enProject.images[0];
            if (enProject?.image) return enProject.image;
        }
        return '/portfolio/images/project.png'; // Default fallback
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero">
                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="hero-title">
                                {t('home.title')} <span className="gradient-text">Shibin Thomas</span>
                            </h1>
                            <p className="hero-subtitle">{t('home.subtitle')}</p>
                            <div className="hero-buttons">
                                <a href="#projects" className="btn btn-primary">
                                    {t('nav.projects')}
                                </a>
                                <a href="#resume" className="btn btn-secondary">
                                    {t('home.viewResume')}
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src="/portfolio/images/profile.jpg" alt="Profile" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className="about section" id="about">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">{t('home.about')}</h2>
                        <p className="about-description">{t('home.description')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section" id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">{t('skills.title')}</h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                            {t('skills.description')}
                        </p>

                        <div className="skills-grid">
                            {skills.skills.map((skill, skillIndex) => (
                                <SkillBar
                                    key={skillIndex}
                                    name={skill.name}
                                    percentage={skill.percentage}
                                    delay={skillIndex * 100}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Resume Section */}
            <section className="section" id="resume">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">{t('resume.title')}</h2>

                        <div className="resume-section">
                            <h3 className="resume-section-title">{t('resume.experience')}</h3>
                            <div className="timeline">
                                {resume.experience.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        className="timeline-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="timeline-marker"></div>
                                        <div className="timeline-content">
                                            <h4>{job.title}</h4>
                                            <h5>{job.company} • {job.location}</h5>
                                            <p className="timeline-period">{job.period}</p>
                                            <p className="timeline-description">{job.description}</p>
                                            <ul className="timeline-achievements">
                                                {job.achievements.map((achievement, i) => (
                                                    <li key={i}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="resume-section">
                            <h3 className="resume-section-title">{t('resume.education')}</h3>
                            <div className="timeline">
                                {resume.education.map((edu, index) => (
                                    <motion.div
                                        key={edu.id}
                                        className="timeline-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="timeline-marker"></div>
                                        <div className="timeline-content">
                                            <h4>{edu.degree}</h4>
                                            <h5>{edu.school} • {edu.location}</h5>
                                            <p className="timeline-period">{edu.period}</p>
                                            <p className="timeline-description">{edu.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Links Section */}
            <section className="section content-links" id="projects" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="section-title">{t('nav.projects')}</h2>
                    <div className="link-grid">
                        {projects.map((project) => (
                            <Link key={project.id} to={`/${lang}/projects/${project.id}`} className="link-card">
                                <img src={getProjectImage(project)} alt={project.title} className="link-card-image" />
                                <h4 className="link-card-title">{project.title}</h4>
                                <p className="link-card-desc">{project.description}</p>
                            </Link>
                        ))}
                    </div>
                    <Link to={`/${lang}/projects`} className="view-all-link">{t('common.learnMore')} →</Link>
                </div>
            </section>

            <section className="section content-links" id="hobby-projects">
                <div className="container">
                    <h2 className="section-title">{t('nav.hobbyProjects')}</h2>
                    <div className="link-grid">
                        {hobbyProjects.slice(0, 6).map((project) => (
                            <Link key={project.id} to={`/${lang}/hobby-projects/${project.id}`} className="link-card">
                                <img
                                    src={(project.images && project.images.length > 0) ? project.images[0] : (hobbyProjectsData.en.find(p => p.id === project.id)?.images?.[0] || '')}
                                    alt={project.title}
                                    className="link-card-image"
                                />
                                <h4 className="link-card-title">{project.title}</h4>
                                <p className="link-card-desc">{project.description}</p>
                            </Link>
                        ))}
                    </div>
                    <Link to={`/${lang}/hobby-projects`} className="view-all-link">{t('common.learnMore')} →</Link>
                </div>
            </section>

            <section className="section content-links" id="achievements" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="section-title">{t('nav.achievements')}</h2>
                    <div className="link-grid">
                        {achievements.slice(0, 6).map((achievement) => (
                            <Link key={achievement.id} to={`/${lang}/achievements/${achievement.id}`} className="link-card">
                                <img
                                    src={(achievement.images && achievement.images.length > 0) ? achievement.images[0] : (achievementsData.en.find(a => a.id === achievement.id)?.images?.[0] || '')}
                                    alt={achievement.title}
                                    className="link-card-image"
                                />
                                <h4 className="link-card-title">{achievement.title}</h4>
                                <p className="link-card-desc">{achievement.description}</p>
                            </Link>
                        ))}
                    </div>
                    <Link to={`/${lang}/achievements`} className="view-all-link">{t('common.learnMore')} →</Link>
                </div>
            </section>

            <section className="section content-links" id="research">
                <div className="container">
                    <h2 className="section-title">{t('nav.research')}</h2>
                    <div className="link-grid">
                        {research.map((paper) => (
                            <a key={paper.id} href={paper.link} target="_blank" rel="noopener noreferrer" className="link-card">
                                <img src={paper.image} alt={paper.title} className="link-card-image" />
                                <h4 className="link-card-title">{paper.title}</h4>
                                <p className="link-card-desc">{paper.authors} ({paper.year})</p>
                            </a>
                        ))}
                    </div>
                    <Link to={`/${lang}/research`} className="view-all-link">{t('common.learnMore')} →</Link>
                </div>
            </section>

            <section className="section content-links" id="hobbies" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="section-title">{t('nav.hobbies')}</h2>
                    <div className="hobbies-preview-grid">
                        <Link to={`/${lang}/hobbies/coin-collection`} className="hobby-preview-card">
                            <div className="hobby-icon">🪙</div>
                            <h4>{t('hobbies.coinCollection')}</h4>
                        </Link>
                        <Link to={`/${lang}/hobbies/stamp-collection`} className="hobby-preview-card">
                            <div className="hobby-icon">📮</div>
                            <h4>{t('hobbies.stampCollection')}</h4>
                        </Link>
                        <Link to={`/${lang}/hobbies/reading`} className="hobby-preview-card">
                            <div className="hobby-icon">📚</div>
                            <h4>{t('hobbies.reading')}</h4>
                        </Link>
                        <Link to={`/${lang}/hobbies/gardening`} className="hobby-preview-card">
                            <div className="hobby-icon">🌱</div>
                            <h4>{t('hobbies.gardening')}</h4>
                        </Link>
                        <Link to={`/${lang}/hobbies/travel`} className="hobby-preview-card">
                            <div className="hobby-icon">✈️</div>
                            <h4>{t('hobbies.travel')}</h4>
                        </Link>
                    </div>
                    <Link to={`/${lang}/hobbies`} className="view-all-link">{t('common.learnMore')} →</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
