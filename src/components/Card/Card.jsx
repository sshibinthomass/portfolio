import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ image, title, description, onClick, tags }) => {
    return (
        <motion.div
            className="card"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />
                <div className="card-overlay">
                    <span className="card-overlay-text">View Details</span>
                </div>
            </div>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {tags && tags.length > 0 && (
                    <div className="card-tags">
                        {tags.map((tag, index) => {
                            const tagName = typeof tag === 'string' ? tag : tag.name;
                            return (
                                <span key={index} className="card-tag">{tagName}</span>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Card;
