export default function AboutBoard() {
  const about = {
    name: 'Stefan Bobrowski',
    title: 'Full-Stack AI Engineer',
    bio: 'Full-Stack AI Engineer with over 10 years of experience building intelligent, scalable web applications that integrate cutting-edge AI capabilities. Expert in React, TypeScript, and modern JavaScript development, with hands-on experience implementing AI-powered features using Claude, Gemini, and Vertex AI. Skilled in architecting secure, cloud-native solutions on Google Cloud Platform, developing both elegant user interfaces with Three.js/WebGL and robust backend APIs with Node.js/Express. Passionate about leveraging AI to solve real-world problems, writing clean and maintainable code, and delivering innovative solutions that provide measurable business value.',
  };

  return (
    <div>
      <h2>About</h2>
      <div
        style={{
          padding: 16,
          background: '#0b2740',
          borderRadius: 8,
          border: '1px solid #122233',
        }}
      >
        <div>
          <img
            src="/photos/photo-1.webp"
            alt="Stefan Bobrowski"
            style={{ width: 150, marginBottom: '1rem', borderRadius: '50%' }}
          />
          <h3 style={{ marginBottom: '0.8rem' }}>{about.name}</h3>
          <p style={{ marginBottom: '0.8rem', color: '#6ee7ff' }}>{about.title}</p>
        </div>
        <p className="paragraph">{about.bio}</p>
        <p className="paragraph" style={{ color: '#6ee7ff' }}>
          This is the portfolio website of Stefan Bobrowski, Full-Stack AI Engineer.
        </p>
        <p className="paragraph">
          Built with a modern 2025 full-stack toolset: Vite + React + TypeScript on the frontend,
          Node + Express on the backend, and Google Cloud Platform for hosting and AI services.
        </p>
      </div>
    </div>
  );
}
