import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import Projects from '../../components/Projects/Projects';

export default function ProjectsPage() {
  usePageMetaTags({
    title: 'Projects - Stefan Bobrowski | Frontend Development',
    description:
      "Explore Stefan Bobrowski's Frontend projects featuring AI integration, React applications, 3D visualizations, and scalable backend systems.",
    ogTitle: 'Projects - Stefan Bobrowski',
    ogDescription:
      'A portfolio of innovative web applications showcasing modern web technologies and AI integration.',
  });

  return <Projects variant="page" />;
}
