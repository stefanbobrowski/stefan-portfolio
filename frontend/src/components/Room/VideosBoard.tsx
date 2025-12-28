import { useState, useEffect, useRef, useMemo } from 'react';

export default function VideosBoard({ controls = true }: { controls?: boolean } = {}) {
  const [modalVideo, setModalVideo] = useState<null | {
    url: string;
    title?: string;
    caption?: string;
  }>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videos = useMemo(
    () => [
      { title: 'Drogo Wagging', url: '/videos/video-2.mp4' },
      { title: 'Sylvia Cleaning', url: '/videos/video-3.mp4' },
      { title: 'Billiards Cut', url: '/videos/video-4.mp4' },
      { title: 'Double Kettle Flip (12KG/26.45LBS)', url: '/videos/video-6.mp4' },
    ],
    []
  );

  const pauseOtherVideos = (current?: HTMLVideoElement | null) => {
    const list = document.querySelectorAll<HTMLVideoElement>('video');
    list.forEach(v => {
      if (v !== current) v.pause();
    });
  };

  // Prevent page/body scrolling while modal is open
  const _prevOverflow = useRef<string | null>(null);
  useEffect(() => {
    if (modalVideo) {
      _prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (_prevOverflow.current !== null) {
      document.body.style.overflow = _prevOverflow.current;
      _prevOverflow.current = null;
    }
    return () => {
      if (_prevOverflow.current !== null) {
        document.body.style.overflow = _prevOverflow.current;
        _prevOverflow.current = null;
      }
    };
  }, [modalVideo]);

  // Keyboard navigation for modal when controls are enabled
  useEffect(() => {
    if (!modalVideo || !controls) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
        setCurrentIndex(null);
        return;
      }
      if (e.key === 'ArrowLeft' && currentIndex !== null) {
        const prev = (currentIndex - 1 + videos.length) % videos.length;
        setCurrentIndex(prev);
        setModalVideo(videos[prev]);
      }
      if (e.key === 'ArrowRight' && currentIndex !== null) {
        const next = (currentIndex + 1) % videos.length;
        setCurrentIndex(next);
        setModalVideo(videos[next]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalVideo, controls, currentIndex, videos]);

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Videos</h2>
      <div style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 20,
          }}
        >
          {videos.map((video, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                background: '#0b2740',
                borderRadius: 8,
                border: '1px solid #122233',
                boxShadow: '0 2px 8px #0002',
                maxWidth: 360,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              {video.url && video.url !== '#' ? (
                <video
                  src={video.url}
                  controls
                  onPlay={e => pauseOtherVideos(e.currentTarget)}
                  style={{
                    width: '100%',
                    height: 140,
                    background: '#071427',
                    borderRadius: 6,
                    marginBottom: 8,
                    objectFit: 'cover',
                    boxShadow: '0 1px 6px #0003',
                    cursor: 'pointer',
                    transition: 'transform 0.16s ease',
                  }}
                  onClick={() => {
                    setModalVideo(video);
                    setCurrentIndex(i);
                  }}
                >
                  Sorry, your browser does not support embedded videos.
                </video>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: 140,
                    background: '#071427',
                    borderRadius: 6,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4a6a84',
                    fontSize: 36,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setModalVideo(video);
                    setCurrentIndex(i);
                  }}
                >
                  ▶
                </div>
              )}
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#9db3c8' }}>{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen video */}
      {modalVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10,20,40,0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => {
            setModalVideo(null);
            setCurrentIndex(null);
          }}
        >
          <video
            ref={videoRef}
            src={modalVideo.url}
            controls
            autoPlay
            onPlay={e => pauseOtherVideos(e.currentTarget)}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              borderRadius: 4,
              boxShadow: '0 4px 24px #0008',
              background: '#071427',
            }}
          >
            Sorry, your browser does not support embedded videos.
          </video>

          {controls && currentIndex !== null && (
            <>
              <button
                type="button"
                aria-label="Previous video"
                onClick={e => {
                  e.stopPropagation();
                  const prev = (currentIndex - 1 + videos.length) % videos.length;
                  setCurrentIndex(prev);
                  setModalVideo(videos[prev]);
                }}
                style={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 0.9rem',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 28,
                  lineHeight: 1,
                }}
              >
                {'<'}
              </button>
              <button
                type="button"
                aria-label="Next video"
                onClick={e => {
                  e.stopPropagation();
                  const next = (currentIndex + 1) % videos.length;
                  setCurrentIndex(next);
                  setModalVideo(videos[next]);
                }}
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 0.9rem',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 28,
                  lineHeight: 1,
                }}
              >
                {'>'}
              </button>
            </>
          )}

          {(modalVideo.caption ?? modalVideo.title) && (
            <p
              style={{
                marginTop: 12,
                color: '#ffffff',
                fontSize: '1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '1rem 0.25rem',
                borderRadius: 4,
                width: '100%',
                maxWidth: 600,
                boxSizing: 'border-box',
              }}
            >
              {modalVideo.caption ?? modalVideo.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
