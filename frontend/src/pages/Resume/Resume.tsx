import { FiDownload } from 'react-icons/fi';
import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import styles from '../../../src/components/ResumeViewer.module.scss';

const ResumeViewer = () => {
  usePageMetaTags({
    title: 'Resume - Stefan Bobrowski | Frontend Engineer',
    description:
      "Download Stefan Bobrowski's resume. 10+ years of Frontend engineering experience with expertise in React, TypeScript, Node.js, and Google Cloud Platform.",
    ogTitle: 'Resume - Stefan Bobrowski',
    ogDescription: 'Professional resume of Stefan Bobrowski, Frontend Engineer.',
  });

  return (
    <div className={styles.resumePage}>
      <h2>Resume</h2>
      <div className={styles.resumeContainer}>
        <div className={styles.iframeWrapper}>
          <iframe
            src="/StefanBobrowskiResume.pdf#view=FitH&zoom=page-fit"
            title="Stefan Bobrowski Resume"
            className={styles.iframe}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.mobileNotice}>
        <p>📱 For best results on mobile, download and view the PDF</p>
      </div>
      <div className={styles.resumeLink}>
        <a href="/StefanBobrowskiResume.pdf" target="_blank" rel="noopener noreferrer" download>
          <FiDownload className={styles.resumeIcon} />
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default ResumeViewer;
