import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

export default function LinksBoard() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    setLoading(false);
    setLinks([
      { name: 'GitHub', url: 'https://github.com/stefanbobrowski', icon: FaGithub },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/stefanbobrowski', icon: FaLinkedin },
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/users/3317728/stefanbob',
        icon: FaStackOverflow,
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/StefanBobrowski/',
        icon: SiLeetcode,
      },
      { name: 'Email', url: 'mailto:stefan@example.com', icon: MdEmail },
    ]);
  }, []);

  if (loading) return <div>Loading links...</div>;

  return (
    <div>
      <h2>Links</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map((link, i) => {
          const IconComponent = link.icon;
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1rem',
                background: '#0b2740',
                borderRadius: 8,
                border: '1px solid #122233',
                color: '#6ee7ff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'background 0.2s',
                maxWidth: '200px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0f3556')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0b2740')}
            >
              <IconComponent size={24} />
              <span>{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
