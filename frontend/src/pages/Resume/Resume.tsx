import styles from '../../../src/components/ResumeViewer.module.scss';

const ResumeViewer = () => (
  <div className={styles.resumePage}>
    <h2>Resume</h2>
    <div className={styles.resumeContainer}>
      <iframe
        src="/StefanBobrowskiResume.pdf#zoom=page-fit"
        title="Stefan Bobrowski Resume"
        className={styles.iframe}
        loading="lazy"
      />
    </div>
  </div>
);

export default ResumeViewer;
