import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import TechTag from '../components/TechTag/TechTag';
import projectsData from '../data/projects.json';
import { getYoutubeId } from '../utils/media';
import './ProjectDetail.css';

const copy = {
    en: {
        home: 'Home',
        pipeline: 'Camera to WebXR',
        pipelineIntro: 'Six recoverable artifact boundaries connect one photograph to a browser-placed 3D object.',
        evidence: 'Verified component evidence',
        before: 'Base',
        after: 'Adapted',
        links: 'Explore the work',
        demo: 'Demo Video'
    },
    de: {
        home: 'Startseite',
        pipeline: 'Von der Kamera zu WebXR',
        pipelineIntro: 'Sechs wiederaufnehmbare Artefaktgrenzen verbinden ein Foto mit einem im Browser platzierten 3D-Objekt.',
        evidence: 'Verifizierte Komponentenevidenz',
        before: 'Basis',
        after: 'Adaptiert',
        links: 'Projekt ansehen',
        demo: 'Demo-Video'
    }
};

const ProjectDetail = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const languageCopy = copy[currentLang?.startsWith('de') ? 'de' : 'en'];

    const projects = projectsData[currentLang] || projectsData.en;
    const projectId = Number.parseInt(id, 10);
    const project = projects.find((item) => item.id === projectId);
    const enProject = projectsData.en.find((item) => item.id === projectId);

    const projectImages = project?.images || enProject?.images || ['/images/project.png'];
    const projectTechnologies = project?.technologies || enProject?.technologies || [];
    const projectYoutubeLink = project?.youtubeLink || enProject?.youtubeLink || '';
    const projectPurpose = project?.purpose || enProject?.purpose || '';
    const projectDuration = project?.duration || enProject?.duration || '';
    const projectDate = project?.date || enProject?.date || '';
    const projectSubtitle = project?.subtitle || enProject?.subtitle || '';
    const projectPipeline = project?.pipeline?.length ? project.pipeline : enProject?.pipeline || [];
    const projectMetrics = project?.metrics?.length ? project.metrics : enProject?.metrics || [];
    const projectHighlights = project?.highlights?.length ? project.highlights : enProject?.highlights || [];
    const legacyGithub = project?.github || enProject?.github || '';
    const legacyAppLink = project?.appLink || enProject?.appLink || '';
    const configuredLinks = project?.externalLinks?.length ? project.externalLinks : enProject?.externalLinks || [];
    const projectExternalLinks = configuredLinks.length
        ? configuredLinks
        : [
            legacyAppLink && { label: t('projects.appLink'), url: legacyAppLink, kind: 'primary' },
            legacyGithub && { label: t('projects.github'), url: legacyGithub, kind: 'secondary' }
        ].filter(Boolean);

    if (!project) {
        return (
            <div className="section">
                <div className="container">
                    <h1>Project not found</h1>
                    <Link to={`/${lang}/projects`} className="btn btn-primary">
                        {t('nav.projects')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section project-detail-page">
            <div className="container">
                <Motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="project-detail"
                >
                    <nav className="project-breadcrumb" aria-label="Breadcrumb">
                        <Link to={`/${lang}`}>{languageCopy.home}</Link>
                        <span aria-hidden="true">→</span>
                        <Link to={`/${lang}/projects`}>{t('nav.projects')}</Link>
                        <span aria-hidden="true">→</span>
                        <span>{project.title}</span>
                    </nav>

                    <ImageCarousel images={projectImages} alt={project.title} />

                    <header className="project-heading">
                        <p className="project-heading-kicker">{projectPurpose}</p>
                        <h1 className="section-title">{project.title}</h1>
                        {projectSubtitle && <p className="project-subtitle">{projectSubtitle}</p>}
                    </header>

                    {projectPipeline.length > 0 && (
                        <section className="project-pipeline" aria-labelledby="project-pipeline-title">
                            <div className="project-section-heading">
                                <p className="project-section-kicker">Artifact journey</p>
                                <h2 id="project-pipeline-title">{languageCopy.pipeline}</h2>
                                <p>{languageCopy.pipelineIntro}</p>
                            </div>
                            <ol className="project-pipeline-list">
                                {projectPipeline.map((step) => (
                                    <li key={step.stage}>
                                        <span className="project-pipeline-stage">{step.stage}</span>
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    )}

                    <dl className="project-meta">
                        {projectPurpose && (
                            <div>
                                <dt>{t('projects.purpose')}</dt>
                                <dd>{projectPurpose}</dd>
                            </div>
                        )}
                        {projectDuration && (
                            <div>
                                <dt>{t('projects.duration')}</dt>
                                <dd>{projectDuration}</dd>
                            </div>
                        )}
                        {projectDate && (
                            <div>
                                <dt>{t('projects.date')}</dt>
                                <dd>{projectDate}</dd>
                            </div>
                        )}
                    </dl>

                    <div
                        className="project-narrative"
                        dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
                    />

                    {projectMetrics.length > 0 && (
                        <section className="project-evidence" aria-labelledby="project-evidence-title">
                            <div className="project-section-heading">
                                <p className="project-section-kicker">Measured, not inferred</p>
                                <h2 id="project-evidence-title">{languageCopy.evidence}</h2>
                            </div>
                            <div className="project-metrics">
                                {projectMetrics.map((metric) => (
                                    <article key={metric.label} className="project-metric">
                                        <p className="project-metric-label">{metric.label}</p>
                                        <div className="project-metric-values">
                                            <span>
                                                <small>{languageCopy.before}</small>
                                                {metric.before}
                                            </span>
                                            <i aria-hidden="true">→</i>
                                            <span>
                                                <small>{languageCopy.after}</small>
                                                {metric.after}
                                            </span>
                                        </div>
                                        <p className="project-metric-note">{metric.note}</p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {projectHighlights.length > 0 && (
                        <aside className="project-highlights" aria-label="Research notes">
                            {projectHighlights.map((highlight) => (
                                <div
                                    key={highlight.title}
                                    className={`project-highlight project-highlight--${highlight.tone || 'evidence'}`}
                                >
                                    <h3>{highlight.title}</h3>
                                    <p>{highlight.text}</p>
                                </div>
                            ))}
                        </aside>
                    )}

                    <section className="project-technologies">
                        <h2>{t('projects.technologies')}</h2>
                        <div className="project-technology-list">
                            {projectTechnologies.map((tech, index) => {
                                const name = typeof tech === 'string' ? tech : tech.name;
                                const description = typeof tech === 'object' ? (tech.description || tech.version || '') : '';
                                return <TechTag key={`${name}-${index}`} name={name} description={description} />;
                            })}
                        </div>
                    </section>

                    {projectExternalLinks.length > 0 && (
                        <section className="project-link-section">
                            <h2>{languageCopy.links}</h2>
                            <div className="project-external-links">
                                {projectExternalLinks.map((link) => (
                                    <a
                                        key={`${link.label}-${link.url}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`project-external-link project-external-link--${link.kind || 'secondary'}`}
                                    >
                                        <span>{link.label}</span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {projectYoutubeLink && getYoutubeId(projectYoutubeLink) && (
                        <section className="project-video">
                            <h2>{languageCopy.demo}</h2>
                            <div className="project-video-frame">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeId(projectYoutubeLink)}`}
                                    title={languageCopy.demo}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </section>
                    )}
                </Motion.article>
            </div>
        </div>
    );
};

export default ProjectDetail;
