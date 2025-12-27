const ResumeViewer = () => (
  <div>
    <h2>Resume</h2>
    <div
      style={{
        width: '100%',
        maxWidth: 1000,
        margin: '0 auto',
        height: '79vh',
        minHeight: '400px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        background: '#181829',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <embed
        src="/StefanBobrowskiResume.pdf"
        type="application/pdf"
        style={{
          display: 'block',
          border: 0,
          width: '100%',
          height: '100%',
          flex: 1,
        }}
      />
    </div>
  </div>
);

export default ResumeViewer;
