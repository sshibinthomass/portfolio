import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import './Resume.css';

const Resume = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const resume = resumeData[currentLang] || resumeData.en;

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('resume.title')}</h1>

                    <div className="resume-section">
                        <h2 className="resume-section-title">{t('resume.experience')}</h2>
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
                                        <h3>{job.title}</h3>
                                        <h4>{job.company} • {job.location}</h4>
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
                        <h2 className="resume-section-title">{t('resume.education')}</h2>
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
                                        <h3>{edu.degree}</h3>
                                        <h4>{edu.school} • {edu.location}</h4>
                                        <p className="timeline-period">{edu.period}</p>
                                        <p className="timeline-description">{edu.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Resume;
