import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SkillBar.css';

const SkillBar = ({ name, percentage, delay = 0 }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setAnimatedPercentage(percentage);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, percentage, delay]);

    return (
        <div className="skill-bar" ref={ref}>
            <div className="skill-bar-header">
                <span className="skill-name">{name}</span>
                <span className="skill-percentage">{animatedPercentage}%</span>
            </div>
            <div className="skill-bar-track">
                <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? `${animatedPercentage}%` : 0 }}
                    transition={{ duration: 1, delay: delay / 1000, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default SkillBar;
