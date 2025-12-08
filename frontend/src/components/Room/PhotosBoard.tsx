import { useState, useEffect } from 'react';

export default function PhotosBoard() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<any[]>([]);
  const [modalPhoto, setModalPhoto] = useState<null | { title: string; url: string }>(null);

  useEffect(() => {
    // TODO: fetch photo gallery
    setLoading(false);
    setPhotos([
      { title: 'Photo 1', url: '/photos/photo-1.JPG' },
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
          gap: 20,
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
              boxShadow: '0 2px 8px #0002',
            }}
          >
            <div style={{ marginBottom: 8 }}>
              <img
                src={photo.url}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 6,
                  cursor: 'pointer',
                  boxShadow: '0 1px 6px #0003',
                  transition: 'transform 0.2s',
                }}
                onClick={() => setModalPhoto(photo)}
              />
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#9db3c8' }}>{photo.title}</p>
          </div>
        ))}
      </div>

      {/* Modal for fullscreen photo */}
      {modalPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10,20,40,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setModalPhoto(null)}
        >
          <img
            src={modalPhoto.url}
            alt={modalPhoto.title}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 12,
              boxShadow: '0 4px 24px #0008',
              background: '#071427',
            }}
          />
        </div>
      )}
    </div>
  );
}
