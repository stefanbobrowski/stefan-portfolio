import { useState, useEffect } from 'react';
import styles from './GamesBoard.module.scss';
import NineSquare from './games/NineSquare/NineSquare';
import MineralMiner from './games/MineralMiner/MineralMiner';

type GameType = 'ninesquare' | 'mineralminer' | null;

export default function GamesBoard() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<any[]>([]);
  const [activeGame, setActiveGame] = useState<GameType>(null);

  const favoriteGames = [
    {
      id: 'super-mario-3',
      name: 'Super Mario Bros. 3',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Super_Mario_Bros._3_coverart.png',
      releaseYear: 1990,
      platform: 'NES',
    },
    {
      id: 'wolfenstein-3d',
      name: 'Wolfenstein 3D',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Wolfenstein_3D_cover_art.jpg',
      releaseYear: 1992,
      platform: 'PC',
    },
    {
      id: 'doom',
      name: 'Doom',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg',
      releaseYear: 1993,
      platform: 'PC',
    },
    {
      id: 'final-fantasy-vi',
      name: 'Final Fantasy VI',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Final_Fantasy_VI.jpg',
      releaseYear: 1994,
      platform: 'SNES',
    },
    {
      id: 'hexen',
      name: 'Hexen',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Hexen_box.jpg',
      releaseYear: 1995,
      platform: 'PC',
    },
    {
      id: 'command-and-conquer',
      name: 'Command & Conquer',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/23/Command_%26_Conquer_-_DOS_-_Cover.jpg',
      releaseYear: 1995,
      platform: 'PC',
    },
    {
      id: 'duke-nukem',
      name: 'Duke Nukem 3D',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/23/Duke_Nukem_3D_Coverart.png',
      releaseYear: 1996,
      platform: 'PC',
    },
    {
      id: 'quake',
      name: 'Quake',
      image: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Quake_cover.png',
      releaseYear: 1996,
      platform: 'PC',
    },
    {
      id: 'quake-ii',
      name: 'Quake II',
      image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Quake_2_cover.jpg',
      releaseYear: 1997,
      platform: 'PC',
    },
    {
      id: 'unreal',
      name: 'Unreal',
      image: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Unreal_Coverart.png',
      releaseYear: 1998,
      platform: 'PC',
    },
    {
      id: 'half-life',
      name: 'Half-Life',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/fa/Half-Life_Cover_Art.jpg',
      releaseYear: 1998,
      platform: 'PC',
    },
    {
      id: 'team-fortress-classic',
      name: 'Team Fortress Classic',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Team_Fortress_Classic_box_art.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'counter-strike',
      name: 'Counter-Strike',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/ff/Counter-Strike_Box.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'unreal-tournament',
      name: 'Unreal Tournament',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Unreal_Tournament_-_Box_Front.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'quake-3',
      name: 'Quake III: Arena',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/52/Quake_3_Arena.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'diablo-ii',
      name: 'Diablo II',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png',
      releaseYear: 2000,
      platform: 'PC',
    },
    {
      id: 'max-payne',
      name: 'Max Payne',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/8c/MaxPayneCoverArt.jpg',
      releaseYear: 2001,
      platform: 'PC',
    },
    {
      id: 'warcraft-3',
      name: 'Warcraft 3',
      image:
        'https://upload.wikimedia.org/wikipedia/en/4/4b/Warcraft_III-The_Frozen_Throne_Box_Art.jpg',
      releaseYear: 2002,
      platform: 'PC',
    },
    {
      id: 'max-payne-2',
      name: 'Max Payne 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c9/Max_Payne_2_Cover_Art.jpg',
      releaseYear: 2003,
      platform: 'PC',
    },
    {
      id: 'world-of-warcraft',
      name: 'World of Warcraft',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/65/World_of_Warcraft.png',
      releaseYear: 2004,
      platform: 'PC',
    },
    {
      id: 'halflife2',
      name: 'Half-Life 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/25/Half-Life_2_cover.jpg',
      releaseYear: 2004,
      platform: 'PC',
    },
    {
      id: 'guild-wars',
      name: 'Guild Wars',
      image: 'https://upload.wikimedia.org/wikipedia/en/7/77/Guild_Wars_cover.png',
      releaseYear: 2005,
      platform: 'PC',
    },
    {
      id: 'call-of-duty-2',
      name: 'Call of Duty 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/39/Call_of_Duty_2_cover.png',
      releaseYear: 2005,
      platform: 'PC, Xbox 360',
    },
    {
      id: 'oblivion',
      name: 'The Elder Scrolls IV: Oblivion',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/b8/Oblivion_cover.png',
      releaseYear: 2006,
      platform: 'PC, Xbox 360',
    },
    {
      id: 'team-fortress-2',
      name: 'Team Fortress 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Team_Fortress_2_cover_art.jpg',
      releaseYear: 2007,
      platform: 'PC',
    },
    {
      id: 'call-of-duty-4',
      name: 'Call of Duty 4: Modern Warfare',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Call_of_Duty_4_Modern_Warfare.jpg',
      releaseYear: 2007,
      platform: 'PC, Xbox 360, PS3',
    },
    {
      id: 'fallout3',
      name: 'Fallout 3',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Fallout_3_cover_art.PNG',
      releaseYear: 2008,
      platform: 'PC, PS3, Xbox 360',
    },
    {
      id: 'call-of-duty-mw2',
      name: 'Call of Duty: Modern Warfare 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/d/d5/Call_of_Duty_Modern_Warfare_2_cover.png',
      releaseYear: 2009,
      platform: 'PC, Xbox 360, PS3',
    },
    {
      id: 'starcraft-ii',
      name: 'StarCraft II',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg',
      releaseYear: 2010,
      platform: 'PC',
    },
    {
      id: 'dark-souls',
      name: 'Dark Souls',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg',
      releaseYear: 2011,
      platform: 'PC, PS3, Xbox 360',
    },
    {
      id: 'counter-strike-go',
      name: 'Counter-Strike: GO',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0e/CSGOcoverMarch2020.jpg',
      releaseYear: 2012,
      platform: 'PC',
    },
    {
      id: 'dota-2',
      name: 'Dota 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Dota_2_Steam_artwork.jpg',
      releaseYear: 2013,
      platform: 'PC',
    },
    {
      id: 'hearthstone',
      name: 'Hearthstone',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Hearthstone_box_art.jpg',
      releaseYear: 2014,
      platform: 'PC, Mobile',
    },
    {
      id: 'witcher-3',
      name: 'The Witcher 3: The Wild Hunt',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
      releaseYear: 2015,
      platform: 'PC, PS4, Xbox',
    },
    {
      id: 'overwatch',
      name: 'Overwatch',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
      releaseYear: 2016,
      platform: 'PC, PS4, Xbox',
    },
    {
      id: 'doom-2016',
      name: 'Doom',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/50/Doom_2016_cover.png',
      releaseYear: 2016,
      platform: 'PC, PS4, Xbox',
    },
    {
      id: 'dark-souls-3',
      name: 'Dark Souls III',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg',
      releaseYear: 2016,
      platform: 'PC, PS4, Xbox',
    },
    {
      id: 'pubg',
      name: "PlayerUnknown's Battlegrounds",
      image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/PUBG_Steam_Store_logo.jpg',
      releaseYear: 2017,
      platform: 'PC, Xbox, PS4',
    },
    {
      id: 'dragon-ball-fighterz',
      name: 'Dragon Ball FighterZ',
      image: 'https://upload.wikimedia.org/wikipedia/en/4/43/DBFZ_Final_Box_Art.png',
      releaseYear: 2018,
      platform: 'PC, PS4, Xbox, Switch',
    },
    {
      id: 'sekiro',
      name: 'Sekiro: Shadows Die Twice',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg',
      releaseYear: 2019,
      platform: 'PC, PS4, Xbox',
    },
    {
      id: 'wow-classic',
      name: 'World of Warcraft: Classic',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/ce/World_of_Warcraft_Classic_cover.jpg',
      releaseYear: 2019,
      platform: 'PC',
    },
    {
      id: 'warcraft-3-reforged',
      name: 'Warcraft 3: Reforged',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Warcraft_III-_Reforged.png',
      releaseYear: 2020,
      platform: 'PC',
    },
    {
      id: 'diablo-4',
      name: 'Diablo 4',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/37/Diablo_4_cover_art.png',
      releaseYear: 2020,
      platform: 'PC, PS4/5, Xbox',
    },
    {
      id: 'overwatch-2',
      name: 'Overwatch 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Overwatch_2_cover_art.png',
      releaseYear: 2020,
      platform: 'PC, PS4/5, Xbox, Switch',
    },
    {
      id: 'valheim',
      name: 'Valheim',
      image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Valheim_cover.jpg',
      releaseYear: 2021,
      platform: 'PC',
    },
    {
      id: 'eldenring',
      name: 'Elden Ring',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
      releaseYear: 2022,
      platform: 'PC, PS4/5, Xbox',
    },
  ];

  const myGames = [
    {
      id: 'ninesquare',
      name: 'NineSquare',
      status: 'Play Now',
      icon: '9',
      skills: ['React', 'TypeScript', 'CSS'],
    },
    {
      id: 'mineralminer',
      name: 'Mineral Miner',
      status: 'Play Now',
      icon: '⛏️',
      skills: ['React', 'TypeScript', 'CSS'],
    },
    {
      id: 'derision',
      name: 'Derision',
      status: 'Steam Link',
      icon: '🏜️',
      url: 'https://store.steampowered.com/app/2218950/Derision/',
      skills: ['Unreal Engine 5', 'Steam SDK'],
    },
  ];

  // If a game is selected, show it
  if (activeGame !== null) {
    return (
      <div style={{ padding: '1rem' }}>
        <button
          type="button"
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
    <div className={styles.gamesBoard}>
      <h2>Favorite Games</h2>
      <div className={styles.favoriteGamesList}>
        {favoriteGames.map((game, i) => (
          <div key={i} className={styles.favoriteGameCard}>
            <img
              src={game.image}
              alt={game.name + ' cover'}
              className={styles.favoriteGameImage}
              loading="lazy"
            />
            <div className={styles.favoriteGameInfo}>
              <div className={styles.favoriteGameTitle}>{game.name}</div>
              <div className={styles.favoriteGameMeta}>
                {game.releaseYear} - {game.platform}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2>My Games</h2>
      <div className={styles.myGamesGrid}>
        {myGames.map((game, i) => {
          const isExternal = !!game.url;
          return isExternal ? (
            <a
              key={i}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.myGameCard}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.myGameIcon}>{game.icon}</div>
              <h3 className={styles.myGameTitle}>{game.name}</h3>
              <p className={styles.myGameStatus}>{game.status}</p>
              {game.skills && <p className={styles.myGameSkills}>{game.skills.join(', ')}</p>}
            </a>
          ) : (
            <div
              key={i}
              onClick={() => game.id && setActiveGame(game.id as GameType)}
              className={styles.myGameCard}
              style={{ cursor: game.id ? 'pointer' : 'default' }}
            >
              <div className={styles.myGameIcon}>{game.icon}</div>
              <h3 className={styles.myGameTitle}>{game.name}</h3>
              <p className={styles.myGameStatus} style={{ color: game.id ? '#6ee7ff' : '#6a8a9a' }}>
                {game.status}
              </p>
              {game.skills && <p className={styles.myGameSkills}>{game.skills.join(', ')}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
