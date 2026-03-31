import profilePic from '../../assets/StefanBobrowskiAvatar.jpeg';
export default function AboutBoard() {
  const about = {
    name: 'Stefan Bobrowski',
    title: 'Frontend Engineer',
    bio: 'Frontend Engineer with 11+ years of professional experience building fast, polished web applications that drive measurable business growth across e-commerce, media platforms, and enterprise products. My core stack is JavaScript, React, TypeScript, Vite, SCSS, and API development with Node.js and Express. Throughout my career I’ve had a solid eye for UI/UX, performance, and accessibility. Currently expanding into cloud architecture on Google Cloud Platform and pursuing Associate Cloud Engineer certification.',
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
            src={profilePic}
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
