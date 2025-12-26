import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const StampCollection = () => {
    const { t } = useTranslation();

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbies.stampCollection')}</h1>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Philately has been my passion since childhood. I collect stamps from different eras and regions, with a special focus on commemorative and thematic collections. My collection showcases beautiful artwork and historical moments frozen in time.
                        </p>

                        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} style={{
                                    aspectRatio: '1',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem'
                                }}>
                                    📮
                                </div>
                            ))}
                        </div>

                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Collection Highlights</h3>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Vintage stamps from the 19th century</li>
                            <li>Space exploration themed stamps</li>
                            <li>Wildlife and nature collections</li>
                            <li>First day covers from major events</li>
                            <li>Stamps from over 100 countries</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default StampCollection;
