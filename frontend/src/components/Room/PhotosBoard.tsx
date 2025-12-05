import { useState, useEffect } from 'react';

export default function PhotosBoard() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    // TODO: fetch photo gallery
    setLoading(false);
    setPhotos([
      { title: 'Photo 1', url: '/placeholder.jpg' },
      { title: 'Photo 2', url: '/placeholder.jpg' },
      { title: 'Photo 3', url: '/placeholder.jpg' },
    ]);
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading photos...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Photos</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            style={{
              padding: 12,
              background: '#0b2740',
              borderRadius: 8,
              border: '1px solid #122233',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 150,
                background: '#071427',
                borderRadius: 6,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4a6a84',
              }}
            >
              📷
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#9db3c8' }}>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
