import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import achievementsData from '../data/achievements.json';

const AchievementDetail = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const achievements = achievementsData[currentLang] || achievementsData.en;
    const achievement = achievements.find(a => a.id === parseInt(id));

    // Fallback to English achievement
    const enAchievement = achievementsData.en.find(a => a.id === parseInt(id));
    const achievementImages = achievement?.images || enAchievement?.images || ['/portfolio/images/achievement.png'];

    // New metadata fields with fallback
    const achievementYoutubeLink = achievement?.youtubeLink || enAchievement?.youtubeLink || '';
    const achievementPurpose = achievement?.purpose || enAchievement?.purpose || '';
    const achievementDuration = achievement?.duration || enAchievement?.duration || '';
    const achievementGithub = achievement?.github || enAchievement?.github || '';
    const achievementAppLink = achievement?.appLink || enAchievement?.appLink || '';
    const achievementRenderApp = achievement?.renderApp || enAchievement?.renderApp || false;
    const achievementLinkedinPost = achievement?.linkedinPost || enAchievement?.linkedinPost || '';
    const achievementReferences = achievement?.references || enAchievement?.references || [];
    const achievementTeamMembers = achievement?.teamMembers || enAchievement?.teamMembers || [];

    // Date handling (format if valid date string)
    const rawDate = achievement?.date || enAchievement?.date;
    const achievementDate = rawDate ? new Date(rawDate).toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US') : '';


    // Helper to extract YouTube ID
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (!achievement) {
        return (
            <div className="section">
                <div className="container">
                    <h1>Achievement not found</h1>
                    <Link to={`/${lang}/achievements`} className="btn btn-primary">
                        {t('nav.achievements')}
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
                        <Link to={`/${lang}/achievements`} style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none'
                        }}>
                            {t('nav.achievements')}
                        </Link>
                        <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{achievement.title}</span>
                    </div>

                    <ImageCarousel
                        images={achievementImages}
                        alt={achievement.title}
                    />

                    <h1 className="section-title">{achievement.title}</h1>

                    {/* Metadata Section */}
                    {(achievementPurpose || achievementDuration || achievementDate) && (
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
                            {achievementPurpose && (
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('projects.purpose')}</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{achievementPurpose}</p>
                                </div>
                            )}
                            {achievementDuration && (
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('projects.duration')}</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{achievementDuration}</p>
                                </div>
                            )}
                            {achievementDate && (
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('achievements.date')}</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{achievementDate}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: achievement.detailedDescription }}
                    />

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        {achievementAppLink && (
                            <a
                                href={achievementAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ background: 'var(--accent-secondary)' }}
                            >
                                {t('projects.appLink')}
                            </a>
                        )}

                        {achievementGithub && (
                            <a
                                href={achievementGithub}
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

                        {achievementLinkedinPost && (
                            <a
                                href={achievementLinkedinPost}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{
                                    border: '1px solid #0077b5',
                                    color: '#0077b5',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span>{t('achievements.linkedinPost')}</span>
                            </a>
                        )}
                    </div>

                    {/* Team Members Section */}
                    {achievementTeamMembers && achievementTeamMembers.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>{t('achievements.team')}</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {achievementTeamMembers.map((member, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{member.name}</h4>
                                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{member.qualification}</p>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0a66c2', textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: '500' }}>Email</a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* References Section */}
                    {achievementReferences && achievementReferences.length > 0 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>{t('achievements.references')}</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {achievementReferences.map((member, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{member.name}</h4>
                                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{member.qualification}</p>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0a66c2', textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: '500' }}>Email</a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* App Link Embed */}
                    {achievementRenderApp && achievementAppLink && (
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>{t('achievements.livePreview')}</h3>
                            <div style={{
                                position: 'relative',
                                height: '600px',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                background: '#fff'
                            }}>
                                <iframe
                                    src={achievementAppLink}
                                    title="App Preview"
                                    frameBorder="0"
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

                    {/* YouTube Video Embed */}
                    {achievementYoutubeLink && getYoutubeId(achievementYoutubeLink) && (
                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>{t('achievements.demoVideo')}</h3>
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%',
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeId(achievementYoutubeLink)}`}
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

export default AchievementDetail;
