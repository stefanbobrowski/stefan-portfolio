import { useState, useEffect } from 'react';
import NineSquare from './games/NineSquare/NineSquare';
import MineralMiner from './games/MineralMiner/MineralMiner';

type GameType = 'ninesquare' | 'mineralminer' | null;

export default function GamesBoard() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<any[]>([]);
  const [activeGame, setActiveGame] = useState<GameType>(null);

  useEffect(() => {
    // TODO: fetch games or interactive demos
    setLoading(false);
    setGames([
      { id: 'ninesquare', name: 'NineSquare', status: 'Play Now', icon: '🎯' },
      { id: 'mineralminer', name: 'Mineral Miner', status: 'Play Now', icon: '⛏️' },
      { id: null, name: 'Mini Game 2', status: 'Coming soon', icon: '🎮' },
      { id: null, name: 'Interactive Demo', status: 'In development', icon: '🕹️' },
    ]);
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading games...</div>;

  // If a game is selected, show it
  if (activeGame !== null) {
    return (
      <div style={{ padding: 20 }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            marginBottom: 16,
            padding: '8px 16px',
            background: '#0b2740',
            color: '#6ee7ff',
            border: '1px solid #6ee7ff',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ← Back to Games
        </button>

        {activeGame === 'ninesquare' && <NineSquare />}
        {activeGame === 'mineralminer' && <MineralMiner />}
      </div>
    );
  }

  // Show game list
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Games</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 12,
        }}
      >
        {games.map((game, i) => (
          <div
            key={i}
            onClick={() => game.id && setActiveGame(game.id as GameType)}
            style={{
              padding: 16,
              background: '#0b2740',
              borderRadius: 8,
              border: '1px solid #122233',
              textAlign: 'center',
              cursor: game.id ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (game.id) {
                e.currentTarget.style.border = '1px solid #6ee7ff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid #122233';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '100%',
                height: 150,
                background: '#071427',
                borderRadius: 6,
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4a6a84',
                fontSize: 48,
              }}
            >
              {game.icon}
            </div>
            <h3 style={{ margin: 0, marginBottom: 6, fontSize: 16 }}>{game.name}</h3>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: game.id ? '#6ee7ff' : '#6a8a9a',
              }}
            >
              {game.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
