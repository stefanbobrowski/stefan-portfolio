import { useState, useEffect } from 'react';

export default function AboutBoard() {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    setLoading(false);
    setAbout({
      name: 'Stefan Bobrowski',
      title: 'Full-Stack AI Engineer',
      bio: 'Passionate about building intelligent systems and beautiful experiences.',
    });
  }, []);

  if (loading) return <div style={{ padding: '1rem' }}>Loading...</div>;

  return (
    <div>
      <h2>About Me</h2>
      <div
        style={{ padding: 16, background: '#0b2740', borderRadius: 8, border: '1px solid #122233' }}
      >
        <h3 style={{ margin: 0, marginBottom: 8 }}>{about.name}</h3>
        <p style={{ margin: 0, marginBottom: 8, color: '#6ee7ff' }}>{about.title}</p>
        <p style={{ margin: 0, color: '#9db3c8' }}>{about.bio}</p>
      </div>
    </div>
  );
}
