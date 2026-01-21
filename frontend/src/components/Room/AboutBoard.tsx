export default function AboutBoard() {
  const about = {
    name: 'Stefan Bobrowski',
    title: 'Full-Stack Engineer',
    bio: 'Full-Stack Engineer with over 10 years of experience building intelligent, scalable web applications. Recently specialized in integrating cutting-edge AI capabilities in production systems using Claude, Gemini, and Vertex AI. Expert in React, TypeScript, and modern JavaScript development, with hands-on experience implementing Cloud Architecture and AI-powered features. Skilled in architecting secure, cloud-native solutions on Google Cloud Platform, developing both elegant user interfaces and robust backend APIs with Node.js/Express. Passionate about solving real-world problems, writing clean and maintainable code, and delivering innovative solutions that provide measurable business value.',
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
      </div>
    </div>
  );
}
