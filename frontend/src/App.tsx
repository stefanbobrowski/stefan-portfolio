import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home/Home';
import { Projects } from './pages/Projects/Projects';
import { About } from './pages/About/About';
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
