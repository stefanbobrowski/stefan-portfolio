const topArtists = [
  {
    name: 'Deftones',
    url: 'https://open.spotify.com/artist/6Ghvu1VvMGScGpOUJBAHNH?si=mHlEwIxJT6mgySV0kOhWDg',
    image: 'https://i.scdn.co/image/ab67616100005174e3ac5eb948e78d9285d1dbdb',
  },
  {
    name: 'The Contortionist',
    url: 'https://open.spotify.com/artist/7nCgNmfYJcsVy3vOOzExYS?si=KroNtQB_QDq01r7TGoHV6A',
    image: 'https://i.scdn.co/image/ab67616100005174472e002e5e613a22a83c7f8f',
  },
  {
    name: 'Meshuggah',
    url: 'https://open.spotify.com/artist/3ggwAqZD3lyT2sbovlmfQY?si=AK_doOegRi6GSdEgIO9Alw',
    image: 'https://i.scdn.co/image/ab676161000051742198c33d521ca13e0204b789',
  },
  {
    name: 'A Perfect Circle',
    url: 'https://open.spotify.com/artist/4DFhHyjvGYa9wxdHUjtDkc?si=ZNcDWG_TRBu40YOlVfmdng',
    image: 'https://i.scdn.co/image/ab676161000051745011bfcb59463d911b3e6be1',
  },
  {
    name: 'Earthside',
    url: 'https://open.spotify.com/artist/6mRDRKsNautYuxybddnvgg?si=CypYRmO5SJWrDTqY5Lovew',
    image: 'https://i.scdn.co/image/ab67616100005174353861d27e731fe4dee62360',
  },
  {
    name: 'No_4mat',
    url: 'https://open.spotify.com/artist/0KWgRtUbQXSiICkWp7g213',
    image: 'https://i.scdn.co/image/ab67616100005174aba24749d966df751cf799d6',
  },
  {
    name: 'Being',
    url: 'https://open.spotify.com/artist/6PNuJeReUyNXsByvQygqRm',
    image: 'https://i.scdn.co/image/ab67616d00001e02e699a6fbdbcea37b67cf2c45',
  },
  {
    name: 'Fallujah',
    url: 'https://open.spotify.com/artist/3C5R32AIZlLfMa3uxLEYrU',
    image: 'https://i.scdn.co/image/ab6761610000517405165dd0efe57a6641b3c9d0',
  },
  {
    name: 'Devin Townsend',
    url: 'https://open.spotify.com/artist/6uejjWIOshliv2Ho0OJAQN',
    image: 'https://i.scdn.co/image/ab676161000051746b5a162e53e69b33603b5921',
  },
  {
    name: 'Opeth',
    url: 'https://open.spotify.com/artist/0ybFZ2Ab08V8hueghSXm6E?si=6L2gNEA8R7efsASoGJG_ig',
    image: 'https://i.scdn.co/image/ab6761610000517445e1bb6e5285297f9e55e550',
  },
  {
    name: 'Fat Jon',
    url: 'https://open.spotify.com/artist/5Fmr3KeGe2IAVFmMxUq1sD',
    image: 'https://i.scdn.co/image/ab67616100005174c06a11845750950d9b4c0e30',
  },
  {
    name: 'Steely Dan',
    url: '  https://open.spotify.com/artist/6P7H3ai06vU1sGvdpBwDmE?si=vGtOvuQjS4iIAupFz3JySA',
    image: 'https://i.scdn.co/image/c930cc3599a165211fa20c3ec0d70d1a3cbe4778',
  },
  {
    name: 'Sade',
    url: 'https://open.spotify.com/artist/47zz7sob9NUcODy0BTDvKx?si=9n6gL3NkRemoT9ChB117ZQ',
    image: 'https://i.scdn.co/image/ab6761610000517492883b0e094a36d2f43ad284',
  },

  // Add more artists as desired
];

import styles from './MusicBoard.module.scss';

export default function MusicBoard() {
  return (
    <div className={styles.musicBoard}>
      <h2 className={styles.heading}>Favorite Artists</h2>
      <div className={styles.artistGrid}>
        {topArtists.map(artist => (
          <a
            key={artist.name}
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.artistCard}
          >
            {artist.image ? (
              <img src={artist.image} alt={artist.name} className={styles.artistImage} />
            ) : (
              <span className={styles.musicNote} aria-label="music" role="img">
                🎵
              </span>
            )}
            <span className={styles.artistName}>{artist.name}</span>
            <span className={styles.listenLabel}>Listen on Spotify</span>
          </a>
        ))}
      </div>
    </div>
  );
}
