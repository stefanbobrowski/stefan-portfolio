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
      id: 'toe-jam-and-earl',
      name: 'ToeJam & Earl',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/ToeJam_%26_Earl.png/250px-ToeJam_%26_Earl.png',
      releaseYear: 1991,
      platform: 'Sega Genesis',
    },
    {
      id: 'sonic-the-hedgehog-2',
      name: 'Sonic the Hedgehog 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Sonic_2_US_Cover.jpg/250px-Sonic_2_US_Cover.jpg',
      releaseYear: 1992,
      platform: 'Sega Genesis',
    },
    {
      id: 'streets-of-rage-2',
      name: 'Streets of Rage 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Streets_of_Rage_2.jpg/250px-Streets_of_Rage_2.jpg',
      releaseYear: 1992,
      platform: 'Sega Genesis',
    },
    {
      id: 'wolfenstein-3d',
      name: 'Wolfenstein 3D',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Wolfenstein-3d.jpg/250px-Wolfenstein-3d.jpg',
      releaseYear: 1992,
      platform: 'PC',
    },
    {
      id: 'mortal-kombat-ii',
      name: 'Mortal Kombat II',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Mortal_Kombat_II_boxart.png/250px-Mortal_Kombat_II_boxart.png',
      releaseYear: 1993,
      platform: 'Sega Genesis',
    },

    {
      id: 'doom',
      name: 'Doom',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg',
      releaseYear: 1993,
      platform: 'PC',
    },
    {
      id: 'doom-ii',
      name: 'Doom II: Hell on Earth',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Doom_II_-_Hell_on_Earth_Coverart.png/250px-Doom_II_-_Hell_on_Earth_Coverart.png',
      releaseYear: 1994,
      platform: 'PC',
    },
    {
      id: 'hexen',
      name: 'Hexen',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Hexenbox.jpg',
      releaseYear: 1995,
      platform: 'PC',
    },
    {
      id: 'duke-nukem',
      name: 'Duke Nukem 3D',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Duke_Nukem_3D_Coverart.png/250px-Duke_Nukem_3D_Coverart.png',
      releaseYear: 1996,
      platform: 'PC',
    },
    {
      id: 'pokemon-blue',
      name: 'Pokémon Blue',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Pok%C3%A9mon_Red_and_Blue_cover_art.webp/250px-Pok%C3%A9mon_Red_and_Blue_cover_art.webp.png',
      releaseYear: 1996,
      platform: 'Game Boy',
    },
    {
      id: 'super-mario-64',
      name: 'Super Mario 64',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Super_Mario_64.png/250px-Super_Mario_64.png',
      releaseYear: 1996,
      platform: 'Nintendo 64',
    },
    {
      id: 'wayne-gretzky-hockey',
      name: "Wayne Gretzky's 3D Hockey",
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Wayne_Gretzky%27s_3D_Hockey_for_N64%2C_Front_Cover.jpg/250px-Wayne_Gretzky%27s_3D_Hockey_for_N64%2C_Front_Cover.jpg',
      releaseYear: 1996,
      platform: 'Nintendo 64',
    },
    {
      id: 'quake',
      name: 'Quake',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Quake1cover.jpg/250px-Quake1cover.jpg',
      releaseYear: 1996,
      platform: 'PC',
    },
    {
      id: 'quake-ii',
      name: 'Quake II',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Quake2box.jpg/250px-Quake2box.jpg',
      releaseYear: 1997,
      platform: 'PC',
    },
    {
      id: 'goldeneye-007',
      name: 'GoldenEye 007',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/GoldenEye_007_N64_cover.jpg/250px-GoldenEye_007_N64_cover.jpg',
      releaseYear: 1997,
      platform: 'Nintendo 64',
    },
    {
      id: 'nfl-blitz',
      name: 'NFL Blitz',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/NFL_Blitz_cover.jpg/250px-NFL_Blitz_cover.jpg',
      releaseYear: 1997,
      platform: 'N64',
    },
    {
      id: 'final-fantasy-tactics',
      name: 'Final Fantasy Tactics',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Fftbox.jpg/250px-Fftbox.jpg',
      releaseYear: 1997,
      platform: 'PS1',
    },
    {
      id: 'banjo-kazooie',
      name: 'Banjo-Kazooie',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Banjo_Kazooie_Cover.png/250px-Banjo_Kazooie_Cover.png',
      releaseYear: 1998,
      platform: 'Nintendo 64',
    },
    {
      id: 'legend-of-zelda-ocarina-of-time',
      name: 'The Legend of Zelda: Ocarina of Time',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/The_Legend_of_Zelda_Ocarina_of_Time.jpg/250px-The_Legend_of_Zelda_Ocarina_of_Time.jpg',
      releaseYear: 1998,
      platform: 'Nintendo 64',
    },
    {
      id: 'unreal',
      name: 'Unreal',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Unreal_Coverart.png/250px-Unreal_Coverart.png',
      releaseYear: 1998,
      platform: 'PC',
    },
    {
      id: 'half-life',
      name: 'Half-Life',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Half-Life_Cover_Art.jpg/250px-Half-Life_Cover_Art.jpg',
      releaseYear: 1998,
      platform: 'PC',
    },

    {
      id: 'team-fortress-classic',
      name: 'Team Fortress Classic',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Team_Fortress_Classic_box.jpg/250px-Team_Fortress_Classic_box.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'quake-3',
      name: 'Quake III: Arena',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Quake3Title.jpg/250px-Quake3Title.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'unreal-tournament',
      name: 'Unreal Tournament',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Unrealtournament.jpg/250px-Unrealtournament.jpg',
      releaseYear: 1999,
      platform: 'PC',
    },
    {
      id: 'super-smash-bros',
      name: 'Super Smash Bros.',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Supersmashbox.jpg/250px-Supersmashbox.jpg',
      releaseYear: 1999,
      platform: 'Nintendo 64',
    },
    {
      id: 'final-fantasy-9',
      name: 'Final Fantasy IX',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Ffixbox.jpg/250px-Ffixbox.jpg',
      releaseYear: 2000,
      platform: 'PS1',
    },
    {
      id: 'the-sims',
      name: 'The Sims',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The_Sims_Coverart.png/250px-The_Sims_Coverart.png',
      releaseYear: 2000,
      platform: 'PC',
    },
    {
      id: 'paper-mario',
      name: 'Paper Mario',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Papermario.jpg/250px-Papermario.jpg',
      releaseYear: 2000,
      platform: 'Nintendo 64',
    },
    {
      id: 'counter-strike',
      name: 'Counter-Strike',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Counter-Strike_Box.jpg/250px-Counter-Strike_Box.jpg',
      releaseYear: 2000,
      platform: 'PC',
    },
    {
      id: 'diablo-ii',
      name: 'Diablo II: Lord of Destruction',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Diablo_II_-_Lord_of_Destruction_Coverart.png/250px-Diablo_II_-_Lord_of_Destruction_Coverart.png',
      releaseYear: 2001,
      platform: 'PC',
    },
    {
      id: 'halo',
      name: 'Halo: Combat Evolved',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/250px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg',
      releaseYear: 2001,
      platform: 'Xbox',
    },

    {
      id: 'metal-gear-solid-2',
      name: 'Metal Gear Solid 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Metalgear2boxart.jpg/250px-Metalgear2boxart.jpg',
      releaseYear: 2002,
      platform: 'Xbox',
    },
    {
      id: 'morrowind',
      name: 'The Elder Scrolls III: Morrowind',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/MorrowindCOVER.jpg/250px-MorrowindCOVER.jpg',
      releaseYear: 2002,
      platform: 'Xbox',
    },
    {
      id: 'counter-strike-cz',
      name: 'Counter-Strike: Condition Zero',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/CZbox.jpg/250px-CZbox.jpg',
      releaseYear: 2002,
      platform: 'PC',
    },
    {
      id: 'warcraft-3',
      name: 'Warcraft 3: The Frozen Throne',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Warcraftiii-frozen-throne-boxcover.jpg/250px-Warcraftiii-frozen-throne-boxcover.jpg',
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
      id: 'halo-2',
      name: 'Halo 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Halo2-cover.png/250px-Halo2-cover.png',
      releaseYear: 2004,
      platform: 'Xbox',
    },
    {
      id: 'ninja-gaiden-black',
      name: 'Ninja Gaiden Black',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Ninja_Gaiden_%282004_video_game%29.png/250px-Ninja_Gaiden_%282004_video_game%29.png',
      releaseYear: 2005,
      platform: 'Xbox',
    },
    {
      id: 'call-of-duty-2',
      name: 'Call of Duty 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Call_of_Duty_2_Box.jpg/250px-Call_of_Duty_2_Box.jpg',
      releaseYear: 2005,
      platform: 'Xbox 360',
    },
    {
      id: 'oblivion',
      name: 'The Elder Scrolls IV: Oblivion',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/The_Elder_Scrolls_IV_Oblivion_cover.png/250px-The_Elder_Scrolls_IV_Oblivion_cover.png',
      releaseYear: 2006,
      platform: 'Xbox 360',
    },
    {
      id: 'gears-of-war',
      name: 'Gears of War',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/82/Gears_of_war_cover_art.jpg',
      releaseYear: 2006,
      platform: 'Xbox 360',
    },
    {
      id: 'team-fortress-2',
      name: 'Team Fortress 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Tf2_standalonebox.jpg/250px-Tf2_standalonebox.jpg',
      releaseYear: 2007,
      platform: 'PC',
    },
    {
      id: 'guitar-hero-iii',
      name: 'Guitar Hero III: Legends of Rock',
      image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Guitar-hero-iii-cover-image.jpg',
      releaseYear: 2007,
      platform: 'Xbox 360',
    },
    {
      id: 'call-of-duty-4',
      name: 'Call of Duty 4: Modern Warfare',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/250px-Call_of_Duty_4_Modern_Warfare.jpg',
      releaseYear: 2007,
      platform: 'PC, Xbox 360',
    },
    {
      id: 'gears-of-war-2',
      name: 'Gears of War 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Gears_of_War_2_Game_Cover.jpg/250px-Gears_of_War_2_Game_Cover.jpg',
      releaseYear: 2008,
      platform: 'Xbox 360',
    },
    {
      id: 'grand-theft-auto-iv',
      name: 'Grand Theft Auto IV',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Grand_Theft_Auto_IV_cover.jpg/250px-Grand_Theft_Auto_IV_cover.jpg',
      releaseYear: 2008,
      platform: 'Xbox 360',
    },
    {
      id: 'call-of-duty-mw2',
      name: 'Call of Duty: Modern Warfare 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/250px-Call_of_Duty_4_Modern_Warfare.jpg',
      releaseYear: 2009,
      platform: 'PC, Xbox 360',
    },
    {
      id: 'resident-evil-5',
      name: 'Resident Evil 5',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Resident_Evil_5_Box_Artwork.jpg/250px-Resident_Evil_5_Box_Artwork.jpg',
      releaseYear: 2009,
      platform: 'Xbox 360',
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
      name: 'Counter-Strike: Global Offensive',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/CSGOcoverMarch2020.jpg/250px-CSGOcoverMarch2020.jpg',
      releaseYear: 2012,
      platform: 'PC',
    },
    {
      id: 'dota-2',
      name: 'Dota 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Dota_2_Steam_artwork.jpg/250px-Dota_2_Steam_artwork.jpg',
      releaseYear: 2013,
      platform: 'PC',
    },
    {
      id: 'hearthstone',
      name: 'Hearthstone',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Hearthstone_2016_logo.png/250px-Hearthstone_2016_logo.png',
      releaseYear: 2014,
      platform: 'PC, Mobile',
    },
    {
      id: 'witcher-3',
      name: 'The Witcher 3: The Wild Hunt',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
      releaseYear: 2015,
      platform: 'PC, Xbox',
    },
    {
      id: 'overwatch',
      name: 'Overwatch',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
      releaseYear: 2016,
      platform: 'PC',
    },
    {
      id: 'dark-souls-3',
      name: 'Dark Souls III',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Dark_souls_3_cover_art.jpg/250px-Dark_souls_3_cover_art.jpg',
      releaseYear: 2016,
      platform: 'PC, Xbox',
    },
    {
      id: 'pubg',
      name: "PlayerUnknown's Battlegrounds",
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Pubgbattlegrounds.png/250px-Pubgbattlegrounds.png',
      releaseYear: 2017,
      platform: 'PC',
    },
    {
      id: 'dragon-ball-fighterz',
      name: 'Dragon Ball FighterZ',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/DBFZ_cover_art.jpg/250px-DBFZ_cover_art.jpg',
      releaseYear: 2018,
      platform: 'Xbox',
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
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/World_of_Warcraft_Classic_logo.png/250px-World_of_Warcraft_Classic_logo.png',
      releaseYear: 2019,
      platform: 'PC',
    },

    {
      id: 'half-life-alyx',
      name: 'Half-Life: Alyx',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Half-Life_Alyx_Cover_Art.jpg/250px-Half-Life_Alyx_Cover_Art.jpg',
      releaseYear: 2020,
      platform: 'PC (VR)',
    },
    {
      id: 'hades',
      name: 'Hades',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Hades_cover_art.jpg/250px-Hades_cover_art.jpg',
      releaseYear: 2020,
      platform: 'PC',
    },
    {
      id: 'valheim',
      name: 'Valheim',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Valheim_2021_logo.jpg/250px-Valheim_2021_logo.jpg',
      releaseYear: 2021,
      platform: 'PC',
    },
    {
      id: 'eldenring',
      name: 'Elden Ring',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
      releaseYear: 2022,
      platform: 'PC, PS5',
    },
    {
      id: 'satisfactory',
      name: 'Satisfactory',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Satifactory_video_game_cover_art.jpg/250px-Satifactory_video_game_cover_art.jpg',
      releaseYear: 2022,
      platform: 'PC',
    },
    {
      id: 'counter-strike-2',
      name: 'Counter-Strike 2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/CS2_Cover_Art.jpg/250px-CS2_Cover_Art.jpg',
      releaseYear: 2023,
      platform: 'PC',
    },
    {
      id: 'battlefield-6',
      name: 'Battlefield 6',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Battlefield_6_cover_art.jpg/250px-Battlefield_6_cover_art.jpg',
      releaseYear: 2025,
      platform: 'PC',
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
    </div>
  );
}
