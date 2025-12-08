import { useState, useEffect } from 'react';

export default function VideosBoard() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    // TODO: fetch video content
    setLoading(false);
    setVideos([
      { title: 'Drogo coding', url: '/videos/video-1.MOV' },
      { title: 'Tutorial 2', url: '#' },
    ]);
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading videos...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Videos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {videos.map((video, i) => (
          <div
            key={i}
            style={{
              padding: 16,
              background: '#0b2740',
              borderRadius: 8,
              border: '1px solid #122233',
              boxShadow: '0 2px 8px #0002',
              maxWidth: 480,
            }}
          >
            {video.url && video.url !== '#' ? (
              <video
                src={video.url}
                controls
                style={{
                  width: '100%',
                  height: 240,
                  background: '#071427',
                  borderRadius: 6,
                  marginBottom: 8,
                  objectFit: 'cover',
                  boxShadow: '0 1px 6px #0003',
                }}
              >
                Sorry, your browser does not support embedded videos.
              </video>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 240,
                  background: '#071427',
                  borderRadius: 6,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a6a84',
                  fontSize: 48,
                }}
              >
                ▶️
              </div>
            )}
            <h3 style={{ margin: 0, color: '#6ee7ff' }}>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
