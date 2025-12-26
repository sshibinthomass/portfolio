import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CoinCollection = () => {
    const { t } = useTranslation();

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbies.coinCollection')}</h1>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            I have been collecting coins from around the world for over 10 years. My collection includes rare coins from various historical periods and different countries. Each coin tells a unique story about the culture and history of its origin.
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
                                    🪙
                                </div>
                            ))}
                        </div>

                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Highlights of My Collection</h3>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Ancient Roman coins dating back to 100 AD</li>
                            <li>Commemorative coins from the Olympics</li>
                            <li>Rare coins from 50+ different countries</li>
                            <li>Limited edition collector sets</li>
                            <li>Historical currency from various empires</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CoinCollection;
