import { Suspense, lazy } from 'react';
import { RootLayout } from './layouts/RootLayout';
import { NotFound } from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';

// Code-split routes for better performance
const Home = lazy(() => import('./pages/Home/Home').then(m => ({ default: m.Home })));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const Resume = lazy(() => import('./pages/Resume/Resume'));
const SkillsPage = lazy(() => import('./pages/Skills/Skills'));
const About = lazy(() => import('./pages/About/About').then(m => ({ default: m.About })));

const LoadingFallback = () => <div style={{ minHeight: '100vh' }} />;

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="skills"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SkillsPage />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="resume"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Resume />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
