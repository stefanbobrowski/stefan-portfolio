import { useState, useEffect, useRef, useMemo } from 'react';

export default function PhotosBoard({ controls = true }: { controls?: boolean } = {}) {
  const [modalPhoto, setModalPhoto] = useState<null | {
    title: string;
    url: string;
    caption?: string;
  }>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imgWidth, setImgWidth] = useState<number | null>(null);

  const photos = useMemo(
    () => [
      { title: 'Profile Photo', caption: 'Profile Photo', url: '/photos/photo-1.webp' },
      { title: 'Deviated Septum', caption: 'Deviated Septum', url: '/photos/photo-2.webp' },
      {
        title: 'Mini-Golf Scorekeeper',
        caption: 'Mini-Golf Scorekeeper',
        url: '/photos/photo-3.webp',
      },
      { title: 'Under the Boardwalk', caption: 'Under the Boardwalk', url: '/photos/photo-4.webp' },
      {
        title: '"You Ready?" - The Origin of BallHouse',
        caption: '"You Ready?" - The Origin of BallHouse',
        url: '/photos/photo-5.webp',
      },
      { title: 'Arizona', caption: 'Arizona', url: '/photos/photo-6.webp' },
      {
        title: 'Nerding Out @ The Arcade',
        caption: 'Nerding Out @ The Arcade',
        url: '/photos/photo-7.webp',
      },
      {
        title: 'The Key to Pondering: The Chin',
        caption: 'The Key to Pondering: The Chin',
        url: '/photos/photo-8.webp',
      },
      {
        title: 'Seen in Public (2019)',
        caption: 'Seen in Public (2019)',
        url: '/photos/photo-9.webp',
      },
      { title: 'Gotham City', caption: 'Gotham City', url: '/photos/photo-10.webp' },
      { title: 'Climbed a Tree', caption: 'Climbed a Tree', url: '/photos/photo-11.webp' },
      { title: 'Spain', caption: 'Spain', url: '/photos/photo-12.webp' },
      { title: 'Focused & On Track', caption: 'Focused & On Track', url: '/photos/photo-13.webp' },
      {
        title: 'Only Try to Realize the Truth: There Is No Train',
        caption: 'Only Try to Realize the Truth: There Is No Train',
        url: '/photos/photo-14.webp',
      },
      { title: 'My Souls-like Game', caption: 'My Souls-like Game', url: '/photos/photo-15.webp' },
      {
        title: 'Favorite Food: Spaghetti & Meatballs',
        caption: 'Favorite Food: Spaghetti & Meatballs',
        url: '/photos/photo-16.webp',
      },
      {
        title: 'The Other Side of New York',
        caption: 'The Other Side of New York',
        url: '/photos/photo-17.webp',
      },
      {
        title: 'A Job Well Done',
        caption: 'A Job Well Done',
        url: '/photos/photo-18.webp',
      },
      {
        title: 'Drogo & Sylvia: Family',
        caption: 'Drogo & Sylvia: Family',
        url: '/photos/photo-19.webp',
      },
      { title: 'High-Six', caption: 'High-Six', url: '/photos/photo-20.webp' },
      { title: 'The Golden Throne', caption: 'The Golden Throne', url: '/photos/photo-21.webp' },
      { title: 'Peak Skiing', caption: 'Peak Skiing', url: '/photos/photo-22.webp' },
      {
        title: 'Certified JavaScript Course Completed (2016)',
        caption: 'Certified JavaScript Course Completed (2016)',
        url: '/photos/photo-23.webp',
      },
      {
        title: 'Ideal Working Conditions (2015)',
        caption: 'Ideal Working Conditions (2015)',
        url: '/photos/photo-24.webp',
      },
      {
        title: 'First Cubicle (2015)',
        caption: 'First Cubicle (2015)',
        url: '/photos/photo-25.webp',
      },
      { title: 'First Resume', caption: 'First Resume', url: '/photos/photo-26.webp' },
      {
        title: 'Artosis & Tasteless: The Greatest Casting Duo',
        caption: 'Artosis & Tasteless: The Greatest Casting Duo',
        url: '/photos/photo-27.webp',
      },
      {
        title: 'Childhood Hero: Gordon Freeman',
        caption: 'Childhood Hero: Gordon Freeman',
        url: '/photos/photo-28.webp',
      },
      {
        title: 'Home - Surrounded by Oxygen',
        caption: 'Home - Surrounded by Oxygen',
        url: '/photos/photo-29.webp',
      },
      { title: '', caption: '', url: '/photos/photo-30.webp' },
    ],
    []
  );

  // Prevent page/body scrolling while modal is open
  const _prevOverflow = useRef<string | null>(null);
  useEffect(() => {
    if (modalPhoto) {
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
  }, [modalPhoto]);

  // Keyboard navigation for modal when controls are enabled
  useEffect(() => {
    if (!modalPhoto || !controls) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalPhoto(null);
        setCurrentIndex(null);
        return;
      }
      if (e.key === 'ArrowLeft' && currentIndex !== null) {
        const prev = (currentIndex - 1 + photos.length) % photos.length;
        setCurrentIndex(prev);
        setModalPhoto(photos[prev]);
      }
      if (e.key === 'ArrowRight' && currentIndex !== null) {
        const next = (currentIndex + 1) % photos.length;
        setCurrentIndex(next);
        setModalPhoto(photos[next]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalPhoto, controls, currentIndex, photos]);

  // Keep caption width in sync with displayed image width
  const updateImgWidth = () => {
    if (imageRef.current) setImgWidth(imageRef.current.clientWidth || null);
    else setImgWidth(null);
  };
  useEffect(() => {
    if (!modalPhoto) return;
    // schedule async update to avoid synchronous setState in effect
    const t: number | undefined = window.setTimeout(() => updateImgWidth(), 0);
    const onResize = () => updateImgWidth();
    window.addEventListener('resize', onResize);
    return () => {
      if (t) window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [modalPhoto]);

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Photos</h2>
      <div>
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
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: '0 1px 6px #0003',
                    transition: 'transform 0.2s',
                  }}
                  onClick={() => {
                    setModalPhoto(photo);
                    setCurrentIndex(i);
                  }}
                />
              </div>
              <p style={{ margin: 0, fontSize: '1rem', color: '#9db3c8' }}>
                {photo.caption ?? photo.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen photo */}
      {modalPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            background: 'rgba(10,20,40,0.95)',
            zIndex: 1000,
            display: 'flex',
          }}
          onClick={() => {
            setModalPhoto(null);
            setCurrentIndex(null);
          }}
        >
          <img
            ref={imageRef}
            src={modalPhoto.url}
            alt={modalPhoto.caption ?? modalPhoto.title}
            decoding="async"
            onLoad={() => updateImgWidth()}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              borderRadius: 1,
              boxShadow: '0 4px 24px #0008',
              background: '#071427',
            }}
          />
          {/* Prev / Next controls (only when `controls` prop is true) */}
          {controls && currentIndex !== null && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={e => {
                  e.stopPropagation();
                  const prev = (currentIndex - 1 + photos.length) % photos.length;
                  setCurrentIndex(prev);
                  setModalPhoto(photos[prev]);
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
                aria-label="Next photo"
                onClick={e => {
                  e.stopPropagation();
                  const next = (currentIndex + 1) % photos.length;
                  setCurrentIndex(next);
                  setModalPhoto(photos[next]);
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
          {modalPhoto.caption && (
            <p
              style={{
                marginTop: 0,
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: 'monospace',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '1rem 0.25rem',
                borderRadius: 1,
                width: imgWidth ?? '100%',
                maxWidth: imgWidth ? undefined : 600,
                boxSizing: 'border-box',
              }}
            >
              {modalPhoto.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
