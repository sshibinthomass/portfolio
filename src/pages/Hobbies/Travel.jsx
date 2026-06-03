import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import Modal from '../../components/Modal/Modal';
import './HobbiesMain.css';

const Travel = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [selectedPreset, setSelectedPreset] = useState(null);

    // Sample travel photos (placeholder / dummy data)
    const [carouselImages, setCarouselImages] = useState([
        '/images/travel/tokyo.png',
        '/images/travel/rome.png',
        '/images/travel/iceland.png',
        '/images/travel/paris.png',
    ]);

    // Dummy destination data – will be replaced with real travel logs
    const destinations = [
        { country: 'Japan', city: 'Tokyo', year: 2023, highlight: 'Cherry blossoms and tech culture' },
        { country: 'Italy', city: 'Rome', year: 2022, highlight: 'Ancient history and amazing food' },
        { country: 'Iceland', city: 'Reykjavik', year: 2022, highlight: 'Northern lights and geysers' },
        { country: 'Thailand', city: 'Bangkok', year: 2021, highlight: 'Temples and street food' },
        { country: 'France', city: 'Paris', year: 2020, highlight: 'Art, architecture, and culture' },
        { country: 'Spain', city: 'Barcelona', year: 2019, highlight: 'Gaudí architecture and beaches' },
    ];

    // Presets for the user to quickly add some stunning travel photos
    const photoPresets = [
        { name: 'Kyoto, Japan', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200' },
        { name: 'Venice, Italy', url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200' },
        { name: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200' },
        { name: 'Bangkok, Thailand', url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200' },
        { name: 'Barcelona, Spain', url: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=1200' },
        { name: 'Paris, France', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200' },
    ];

    const handleAddPhotoSubmit = (e) => {
        e.preventDefault();
        const urlToAdd = selectedPreset ? selectedPreset.url : newImageUrl.trim();
        if (urlToAdd) {
            setCarouselImages((prev) => [...prev, urlToAdd]);
            setNewImageUrl('');
            setSelectedPreset(null);
            setIsModalOpen(false);
        }
    };

    const handlePresetSelect = (preset) => {
        setSelectedPreset(preset);
        setNewImageUrl('');
    };

    const handleCustomUrlChange = (e) => {
        setNewImageUrl(e.target.value);
        setSelectedPreset(null);
    };

    return (
        <div className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="travel-header">
                        <h1 className="section-title" style={{ margin: 0 }}>{t('hobbies.travel')}</h1>
                        <button className="travel-add-btn" onClick={() => setIsModalOpen(true)}>
                            <span>📸</span> {t('common.addPhoto', 'Add Photo')}
                        </button>
                    </div>

                    {/* Dummy data notice */}
                    <motion.div
                        className="hobbies-in-progress-banner"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="banner-icon">🚧</div>
                        <div className="banner-content">
                            <span className="banner-title">{t('hobbies.dummyDataTitle', 'Dummy Data')}</span>
                            <span className="banner-text">{t('hobbies.dummyDataText', 'The destinations, photos, and details shown below are placeholder/sample data. Real travel logs and personal photographs will be added soon.')}</span>
                        </div>
                    </motion.div>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Traveling allows me to experience different cultures, meet interesting people, and gain new perspectives. I love exploring both bustling cities and serene natural landscapes, always eager to discover something new and expand my horizons.
                        </p>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <ImageCarousel images={carouselImages} alt="Travel Memories" />
                        </div>

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

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setNewImageUrl('');
                    setSelectedPreset(null);
                }}
                title={t('common.addPhotoTitle', 'Add Travel Photo to Carousel')}
            >
                <form onSubmit={handleAddPhotoSubmit}>
                    <div className="travel-presets-label">Choose from a Travel Preset:</div>
                    <div className="travel-presets-grid">
                        {photoPresets.map((preset, index) => (
                            <div
                                key={index}
                                className={`travel-preset-card ${selectedPreset?.name === preset.name ? 'active' : ''}`}
                                onClick={() => handlePresetSelect(preset)}
                            >
                                <img src={preset.url} alt={preset.name} />
                                <div className="preset-name">{preset.name}</div>
                            </div>
                        ))}
                    </div>

                    <div className="travel-form-group">
                        <label htmlFor="custom-url">Or Paste a Custom Image URL:</label>
                        <input
                            id="custom-url"
                            type="url"
                            className="travel-form-input"
                            placeholder="https://example.com/your-photo.jpg"
                            value={newImageUrl}
                            onChange={handleCustomUrlChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="travel-form-submit-btn"
                        disabled={!newImageUrl.trim() && !selectedPreset}
                        style={{
                            opacity: (!newImageUrl.trim() && !selectedPreset) ? 0.5 : 1,
                            cursor: (!newImageUrl.trim() && !selectedPreset) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Add Photo
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Travel;
