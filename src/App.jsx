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
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          {/* Redirect root to /en */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* Short URL redirects - English */}
          <Route path="/bmwhack" element={<Navigate to="/en/achievements/8" replace />} />
          <Route path="/bkwhack" element={<Navigate to="/en/achievements/7" replace />} />
          <Route path="/aechack" element={<Navigate to="/en/achievements/9" replace />} />
          <Route path="/tnscst" element={<Navigate to="/en/achievements/6" replace />} />
          <Route path="/sihhack" element={<Navigate to="/en/achievements/5" replace />} />
          <Route path="/saehack" element={<Navigate to="/en/achievements/2" replace />} />
          <Route path="/skcetexpo" element={<Navigate to="/en/achievements/1" replace />} />
          <Route path="/tcsxrhack" element={<Navigate to="/en/achievements/4" replace />} />
          <Route path="/ifahack" element={<Navigate to="/en/achievements/3" replace />} />
          <Route path="/gendesign" element={<Navigate to="/en/hobby-projects/12" replace />} />
          <Route path="/askleo" element={<Navigate to="/en/hobby-projects/11" replace />} />
          <Route path="/hybridrag" element={<Navigate to="/en/achievements/9" replace />} />
          <Route path="/ecadstar" element={<Navigate to="/en/projects/1" replace />} />
          <Route path="/medimind" element={<Navigate to="/en/hobby-projects/13" replace />} />

          {/* Short URL redirects - German */}
          <Route path="/de/bmwhack" element={<Navigate to="/de/achievements/8" replace />} />
          <Route path="/de/bkwhack" element={<Navigate to="/de/achievements/7" replace />} />
          <Route path="/de/aechack" element={<Navigate to="/de/achievements/9" replace />} />
          <Route path="/de/tnscst" element={<Navigate to="/de/achievements/6" replace />} />
          <Route path="/de/sihhack" element={<Navigate to="/de/achievements/5" replace />} />
          <Route path="/de/saehack" element={<Navigate to="/de/achievements/2" replace />} />
          <Route path="/de/skcetexpo" element={<Navigate to="/de/achievements/1" replace />} />
          <Route path="/de/tcsxrhack" element={<Navigate to="/de/achievements/4" replace />} />
          <Route path="/de/ifahack" element={<Navigate to="/de/achievements/3" replace />} />
          <Route path="/de/gendesign" element={<Navigate to="/de/hobby-projects/12" replace />} />
          <Route path="/de/askleo" element={<Navigate to="/de/hobby-projects/11" replace />} />
          <Route path="/de/hybridrag" element={<Navigate to="/de/achievements/9" replace />} />
          <Route path="/de/ecadstar" element={<Navigate to="/de/projects/1" replace />} />
          <Route path="/de/medimind" element={<Navigate to="/de/hobby-projects/13" replace />} />

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
