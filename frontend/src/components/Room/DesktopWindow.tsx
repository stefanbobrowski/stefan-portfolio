import { useState } from 'react';
import SkillBoard from '../SkillBoard/SkillBoard';
import ProjectsBoard from './ProjectsBoard';
import AboutBoard from './AboutBoard';
import LinksBoard from './LinksBoard';
import PhotosBoard from './PhotosBoard';
import VideosBoard from './VideosBoard';
import GamesBoard from './GamesBoard';
import MusicBoard from './MusicBoard';
import styles from './DesktopWindow.module.scss';

import {
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
} from 'react-icons/ai';
import { FaGamepad, FaMusic } from 'react-icons/fa';
import { AiOutlineFolder } from 'react-icons/ai';

type TabType =
  | 'home'
  | 'skills'
  | 'projects'
  | 'about'
  | 'resume'
  | 'links'
  | 'photos'
  | 'videos'
  | 'games'
  | 'music';

export default function DesktopWindow() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [hoverTab, setHoverTab] = useState<TabType | null>(null);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: AiOutlineHome },
    { id: 'skills', label: 'Skills', icon: AiOutlineTool },
    { id: 'projects', label: 'Projects', icon: AiOutlineFolder },
    { id: 'resume', label: 'Resume', icon: AiOutlineFileText },
    { id: 'photos', label: 'Photos', icon: AiOutlinePicture },
    { id: 'videos', label: 'Videos', icon: AiOutlineFileText },
    { id: 'games', label: 'Games', icon: FaGamepad },
    { id: 'music', label: 'Music', icon: FaMusic },
    { id: 'about', label: 'About', icon: AiOutlineUser },
    { id: 'links', label: 'Links', icon: AiOutlineLink },
  ];

  return (
    <div className={styles.desktopWindowRoot}>
      <div className={styles.desktopWindowHeader}>
        <div className={styles.desktopWindowHeaderLeft}>
          <div className={styles.desktopWindowHeaderDotRed} />
          <div className={styles.desktopWindowHeaderDotYellow} />
          <div className={styles.desktopWindowHeaderDotGreen} />
          <div className={styles.desktopWindowHeaderTitle}>StefanOS - Desktop</div>
        </div>
      </div>

      <div className={styles.desktopWindowBody}>
        <aside className={styles.desktopWindowSidebar}>
          <div className={styles.desktopWindowSidebarTitle}>Shortcuts</div>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const isHover = hoverTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab(null)}
                className={[
                  styles.desktopWindowSidebarButton,
                  isActive ? styles.desktopWindowSidebarButtonActive : '',
                  !isActive && isHover ? styles.desktopWindowSidebarButtonHover : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <main className={styles.desktopWindowMain}>
          {activeTab === 'home' && (
            <div>
              <h2>Welcome to StefanOS</h2>
              <p>Click the tabs on the left to explore content.</p>
            </div>
          )}

          {activeTab === 'skills' && <SkillBoard />}
          {activeTab === 'projects' && <ProjectsBoard />}
          {activeTab === 'about' && <AboutBoard />}
          {activeTab === 'resume' && (
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                margin: 0,
              }}
            >
              <h2>Resume</h2>
              <iframe
                src="/StefanBobrowskiResume.pdf"
                style={{
                  height: '100%',
                  width: '100%',
                  flex: 1,
                  minHeight: 0,
                  border: 'none',
                }}
                title="Stefan Bobrowski Resume"
              />
            </div>
          )}
          {activeTab === 'links' && <LinksBoard />}
          {activeTab === 'photos' && <PhotosBoard />}
          {activeTab === 'videos' && <VideosBoard />}
          {activeTab === 'games' && <GamesBoard />}
          {activeTab === 'music' && <MusicBoard />}
        </main>
      </div>
    </div>
  );
}
