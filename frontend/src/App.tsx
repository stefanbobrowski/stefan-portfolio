import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume/Resume';
import SkillsPage from './pages/Skills/Skills';
import { About } from './pages/About/About';
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Resume />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
