import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { lang } = useParams();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const firstMenuLinkRef = useRef(null);

    const currentLang = lang === 'de' ? 'de' : 'en';

    useEffect(() => {
        if (isMenuOpen) {
            firstMenuLinkRef.current?.focus();
        }
    }, [isMenuOpen]);

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'de' : 'en';
        i18n.changeLanguage(newLang);
        // Get current path relative to the language, considering the base path
        const fullPath = window.location.pathname;
        const basePath = '/';
        // Remove base path and language prefix
        const pathWithoutBase = fullPath.replace(basePath, '/');
        const currentPath = pathWithoutBase.replace(`/${currentLang}`, '').replace(/^\//, '');
        navigate(`/${newLang}/${currentPath}`);
    };

    const navItems = [
        { key: 'home', path: '' },
        { key: 'projects', path: '/projects' },
        { key: 'entrepreneurship', path: '/entrepreneurship' },
        { key: 'hobbyProjects', path: '/hobby-projects' },
        { key: 'achievements', path: '/achievements' },
        { key: 'research', path: '/research' },
        { key: 'hobbies', path: '/hobbies' },
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to={`/${currentLang}`} className="logo">
                        <span className="logo-text">Portfolio</span>
                        <div className="status-beacon" title="Agent Status: Active">
                            <span className="beacon-ping"></span>
                            <span className="beacon-dot"></span>
                        </div>
                    </Link>

                    <nav
                        id="primary-navigation"
                        className={`nav ${isMenuOpen ? 'nav-open' : ''}`}
                    >
                        {navItems.map((item, index) => (
                            <Link
                                key={item.key}
                                ref={index === 0 ? firstMenuLinkRef : undefined}
                                to={`/${currentLang}${item.path}`}
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t(`nav.${item.key}`)}
                            </Link>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <button
                            className="icon-button"
                            onClick={toggleLanguage}
                            aria-label={t('header.switchLanguage')}
                            title={currentLang === 'en'
                                ? t('header.switchToGerman')
                                : t('header.switchToEnglish')}
                        >
                            <span className="language-label">{currentLang.toUpperCase()}</span>
                        </button>

                        <button
                            className="icon-button"
                            onClick={toggleTheme}
                            aria-label={t('header.switchTheme')}
                            title={theme === 'light'
                                ? t('header.switchToDark')
                                : t('header.switchToLight')}
                        >
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>

                        <button
                            className="hamburger"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={t(isMenuOpen ? 'header.closeMenu' : 'header.openMenu')}
                            aria-expanded={isMenuOpen}
                            aria-controls="primary-navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
