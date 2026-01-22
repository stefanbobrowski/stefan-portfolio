import { FiDownload } from 'react-icons/fi';
import styles from '../../../src/components/ResumeViewer.module.scss';

const ResumeViewer = () => (
  <div className={styles.resumePage}>
    <h2>Resume</h2>
    <div className={styles.resumeContainer}>
      <iframe
        src="/StefanBobrowskiResume.pdf#view=FitH"
        title="Stefan Bobrowski Resume"
        className={styles.iframe}
        loading="lazy"
      />
    </div>
    <div className={styles.resumeLink}>
      <a href="/StefanBobrowskiResume.pdf" target="_blank" rel="noopener noreferrer" download>
        <FiDownload className={styles.resumeIcon} />
        Download Resume
      </a>
    </div>
  </div>
);

export default ResumeViewer;
