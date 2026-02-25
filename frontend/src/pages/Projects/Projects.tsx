import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import Projects from '../../components/Projects/Projects';

export default function ProjectsPage() {
  usePageMetaTags({
    title: 'Projects - Stefan Bobrowski | Full-Stack Development',
    description:
      "Explore Stefan Bobrowski's full-stack projects featuring AI integration, React applications, 3D visualizations, and scalable backend systems.",
    ogTitle: 'Projects - Stefan Bobrowski',
    ogDescription:
      'A portfolio of innovative full-stack projects showcasing modern web technologies and AI integration.',
  });

  return <Projects variant="page" />;
}
