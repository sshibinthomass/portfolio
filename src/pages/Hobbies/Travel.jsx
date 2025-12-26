import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Travel = () => {
    const { t } = useTranslation();

    const destinations = [
        { country: 'Japan', city: 'Tokyo', year: 2023, highlight: 'Cherry blossoms and tech culture' },
        { country: 'Italy', city: 'Rome', year: 2022, highlight: 'Ancient history and amazing food' },
        { country: 'Iceland', city: 'Reykjavik', year: 2022, highlight: 'Northern lights and geysers' },
        { country: 'Thailand', city: 'Bangkok', year: 2021, highlight: 'Temples and street food' },
        { country: 'France', city: 'Paris', year: 2020, highlight: 'Art, architecture, and culture' },
        { country: 'Spain', city: 'Barcelona', year: 2019, highlight: 'Gaudí architecture and beaches' },
    ];

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbies.travel')}</h1>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Traveling allows me to experience different cultures, meet interesting people, and gain new perspectives. I love exploring both bustling cities and serene natural landscapes, always eager to discover something new and expand my horizons.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Places I've Visited</h3>
                        <div className="grid grid-3">
                            {destinations.map((dest, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        padding: '1.5rem',
                                        backgroundColor: 'var(--card-bg)',
                                        borderRadius: '12px',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--border-color)'
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✈️</div>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{dest.city}</h4>
                                    <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                                        {dest.country} ({dest.year})
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {dest.highlight}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Travel;
