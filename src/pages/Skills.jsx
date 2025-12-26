import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SkillBar from '../components/SkillBar/SkillBar';
import skillsData from '../data/skills.json';

const Skills = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const skills = skillsData[currentLang] || skillsData.en;

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('skills.title')}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                        {t('skills.description')}
                    </p>

                    {skills.categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} style={{ marginBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                {category.name}
                            </h3>
                            {category.skills.map((skill, skillIndex) => (
                                <SkillBar
                                    key={skillIndex}
                                    name={skill.name}
                                    percentage={skill.percentage}
                                    delay={skillIndex * 100}
                                />
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
