import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';

export default function BookShelf() {
  const { showTooltip, hideTooltip, openModal } = useUIStore();
  const [shelfHover, setShelfHover] = useState(false);

  // Synthesized book thud sound using Web Audio API
  function playBookThud() {
    const ctx = new window.AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(90, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.09);
    g.gain.setValueAtTime(0.22, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12); // smooth fade avoids crackle
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.12); // stop just before gain hits zero
    o.onended = () => ctx.close();
  }

  const favoriteBooks = [
    {
      title: 'Christian Standard Bible',
      author: 'Holman Bible Publishers',
      genre: 'Religion',
    },
    {
      title: 'The Horus Heresy Series',
      author: 'Black Library',
      genre: 'Science Fiction',
    },
    {
      title: 'A Song of Ice and Fire Series',
      author: 'George R.R. Martin',
      genre: 'Fantasy',
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt, David Thomas',
      genre: 'Programming',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      genre: 'Programming',
    },
    {
      title: "Don't Make Me Think",
      author: 'Steve Krug',
      genre: 'UX/UI Design',
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      genre: 'Software Architecture',
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Improvement',
    },
  ];

  // Classic bookshelf: vertical sides, top/bottom, 3 shelves, books in rows
  return (
    <group position={[9.5, 0, -2.5]} rotation={[0, Math.PI / 2, 0]}>
      {/* Sides */}
      <mesh position={[-1.35, 1.5, 0]}>
        <boxGeometry args={[0.14, 3, 0.6]} />
        <meshStandardMaterial color="#6b4f2a" roughness={0.7} />
      </mesh>
      <mesh position={[1.35, 1.5, 0]}>
        <boxGeometry args={[0.14, 3, 0.6]} />
        <meshStandardMaterial color="#6b4f2a" roughness={0.7} />
      </mesh>
      {/* Top and bottom */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[2.7, 0.14, 0.6]} />
        <meshStandardMaterial color="#8b6f3a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.7, 0.14, 0.6]} />
        <meshStandardMaterial color="#8b6f3a" roughness={0.6} />
      </mesh>
      {/* Shelves */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[2.5, 0.11, 0.58]} />
        <meshStandardMaterial color="#a67c52" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.5, 0.11, 0.58]} />
        <meshStandardMaterial color="#a67c52" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[2.5, 0.11, 0.58]} />
        <meshStandardMaterial color="#a67c52" roughness={0.5} />
      </mesh>
      {/* Books on shelves - tall, slim, long rectangles flush to back */}
      {/* Top shelf */}
      {/* <mesh position={[-1.1, 2.65, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh> */}
      <mesh position={[-0.86, 2.65, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#2e5c8a" />
      </mesh>
      <mesh position={[-0.62, 2.65, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#6b8e23" />
      </mesh>
      <mesh position={[-0.38, 2.65, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#4a235a" />
      </mesh>
      <mesh position={[-0.14, 2.65, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#1e4d2b" />
      </mesh>

      {/* Middle shelf */}
      <mesh position={[-1.1, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#8b4789" />
      </mesh>
      <mesh position={[-0.86, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#9db3c8" />
      </mesh>
      <mesh position={[-0.62, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#6ee7ff" />
      </mesh>
      <mesh position={[-0.38, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#0b2740" />
      </mesh>
      <mesh position={[-0.14, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[0.1, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#b8860b" />
      </mesh>
      <mesh position={[0.34, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
      <mesh position={[0.58, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      <mesh position={[0.82, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>
      <mesh position={[1.06, 1.75, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#556b2f" />
      </mesh>
      {/* Bottom shelf */}
      <mesh position={[-1.1, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[-0.86, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#2e5c8a" />
      </mesh>
      <mesh position={[-0.62, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#6b8e23" />
      </mesh>
      <mesh position={[-0.38, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#4a235a" />
      </mesh>
      <mesh position={[-0.14, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#1e4d2b" />
      </mesh>
      <mesh position={[0.1, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#b8860b" />
      </mesh>
      <mesh position={[0.34, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
      <mesh position={[0.58, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      <mesh position={[0.82, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>
      <mesh position={[1.06, 0.85, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.38]} />
        <meshStandardMaterial color="#556b2f" />
      </mesh>
      {/* Interactivity: click shelf to show modal */}
      <mesh
        position={[0, 1.5, 0.3]}
        visible={false}
        onPointerOver={(e: React.PointerEvent<HTMLElement>) => {
          document.body.style.cursor = 'pointer';
          setShelfHover(true);
          showTooltip(`My Favorite Books`, e.clientX, e.clientY);
        }}
        onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
          showTooltip(`My Favorite Books`, e.clientX, e.clientY);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          setShelfHover(false);
          hideTooltip();
        }}
        onClick={() => {
          hideTooltip();
          playBookThud();
          openModal(
            <div>
              <h2>My Favorite Books</h2>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}
              >
                {favoriteBooks.map((book, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: '#0b2740',
                      borderRadius: '8px',
                      border: '1px solid #122233',
                    }}
                  >
                    <h3 style={{ margin: '0 0 8px 0', color: '#6ee7ff' }}>{book.title}</h3>
                    <p style={{ margin: '0 0 4px 0', color: '#9db3c8', fontSize: '0.9rem' }}>
                      by {book.author}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        background: '#0f3556',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: '#6ee7ff',
                      }}
                    >
                      {book.genre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      >
        <boxGeometry args={[2.5, 3, 0.6]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
