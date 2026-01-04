import React, { useState } from 'react';
import './TechTag.css';

const TechTag = ({ name, description }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (e) => {
        if (description) {
            e.preventDefault();
            setShowTooltip(!showTooltip);
        }
    };

    const handleMouseEnter = () => {
        if (description) setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <span
            className="tech-tag"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: description ? 'pointer' : 'default' }}
        >
            {name}
            {description && <span className="tech-tag-icon">ⓘ</span>}
            {showTooltip && description && (
                <span className="tech-tag-tooltip">{description}</span>
            )}
        </span>
    );
};

export default TechTag;
