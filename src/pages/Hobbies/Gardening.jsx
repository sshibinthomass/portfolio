import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Gardening = () => {
    const { t } = useTranslation();

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbies.gardening')}</h1>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Gardening provides me with a peaceful escape from the digital world. I cultivate a variety of plants, herbs, and vegetables in my garden, finding joy in nurturing life and connecting with nature. It's a therapeutic hobby that teaches patience and appreciation for natural processes.
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
                                    🌱
                                </div>
                            ))}
                        </div>

                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>What I Grow</h3>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Tomatoes, peppers, and other vegetables</li>
                            <li>Fresh herbs like basil, rosemary, and mint</li>
                            <li>Flowering plants for pollinators</li>
                            <li>Succulents and indoor plants</li>
                            <li>Fruit trees and berry bushes</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Gardening;
