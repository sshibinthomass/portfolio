import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Reading = () => {
    const { t } = useTranslation();

    const favoriteBooks = [
        { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming' },
        { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Software Engineering' },
        { title: 'Design Patterns', author: 'Gang of Four', genre: 'Software Architecture' },
        { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Improvement' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History' },
        { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology' },
    ];

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">{t('hobbies.reading')}</h1>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Reading is my gateway to continuous learning and personal growth. I enjoy technical books that enhance my professional skills, as well as fiction and non-fiction that broaden my perspectives and understanding of the world.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Favorite Books</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {favoriteBooks.map((book, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        padding: '1.5rem',
                                        backgroundColor: 'var(--card-bg)',
                                        borderRadius: '12px',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--border-color)'
                                    }}
                                    whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                                >
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📚 {book.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                                        By {book.author}
                                    </p>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: 'var(--accent-gradient)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem'
                                    }}>
                                        {book.genre}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Reading;
