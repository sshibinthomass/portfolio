import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import HobbyProjects from './pages/HobbyProjects';
import HobbyProjectDetail from './pages/HobbyProjectDetail';
import Achievements from './pages/Achievements';
import AchievementDetail from './pages/AchievementDetail';
import Research from './pages/Research';
import HobbiesMain from './pages/Hobbies/HobbiesMain';
import CoinCollection from './pages/Hobbies/CoinCollection';
import StampCollection from './pages/Hobbies/StampCollection';
import Reading from './pages/Hobbies/Reading';
import Gardening from './pages/Hobbies/Gardening';
import Travel from './pages/Hobbies/Travel';
import './i18n';

const LanguageWrapper = ({ children }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'de')) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return children;
};

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/portfolio">
        <ScrollToTop />
        <Routes>
          {/* Redirect root to /en */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* Home - includes Skills and Resume */}
          <Route path="/:lang" element={
            <LanguageWrapper>
              <Layout>
                <Home />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Projects routes */}
          <Route path="/:lang/projects" element={
            <LanguageWrapper>
              <Layout>
                <Projects />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/projects/:id" element={
            <LanguageWrapper>
              <Layout>
                <ProjectDetail />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Hobby Projects routes */}
          <Route path="/:lang/hobby-projects" element={
            <LanguageWrapper>
              <Layout>
                <HobbyProjects />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobby-projects/:id" element={
            <LanguageWrapper>
              <Layout>
                <HobbyProjectDetail />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Achievements routes */}
          <Route path="/:lang/achievements" element={
            <LanguageWrapper>
              <Layout>
                <Achievements />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/achievements/:id" element={
            <LanguageWrapper>
              <Layout>
                <AchievementDetail />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Research route */}
          <Route path="/:lang/research" element={
            <LanguageWrapper>
              <Layout>
                <Research />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Hobbies routes */}
          <Route path="/:lang/hobbies" element={
            <LanguageWrapper>
              <Layout>
                <HobbiesMain />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobbies/coin-collection" element={
            <LanguageWrapper>
              <Layout>
                <CoinCollection />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobbies/stamp-collection" element={
            <LanguageWrapper>
              <Layout>
                <StampCollection />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobbies/reading" element={
            <LanguageWrapper>
              <Layout>
                <Reading />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobbies/gardening" element={
            <LanguageWrapper>
              <Layout>
                <Gardening />
              </Layout>
            </LanguageWrapper>
          } />

          <Route path="/:lang/hobbies/travel" element={
            <LanguageWrapper>
              <Layout>
                <Travel />
              </Layout>
            </LanguageWrapper>
          } />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
