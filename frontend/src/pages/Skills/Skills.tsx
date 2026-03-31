import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import SkillBoard from '../../components/SkillBoard/SkillBoard';

export default function SkillsPage() {
  usePageMetaTags({
    title: 'Skills - Stefan Bobrowski | React, TypeScript, Node.js',
    description:
      'Technical skills in React, TypeScript, Node.js, Google Cloud Platform, AI/ML integration, and Frontend web development.',
    ogTitle: 'Technical Skills - Stefan Bobrowski',
    ogDescription:
      'Frontend engineer with expertise in modern JavaScript frameworks, cloud infrastructure, and AI systems.',
  });

  return <SkillBoard />;
}
