import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import SkillBoard from '../SkillBoard/SkillBoard';
import ProjectsBoard from './ProjectsBoard';
import AboutBoard from './AboutBoard';
import LinksBoard from './LinksBoard';
import PhotosBoard from './PhotosBoard';
import VideosBoard from './VideosBoard';
import GamesBoard from './GamesBoard';
import MusicBoard from './MusicBoard';
import styles from './DesktopWindow.module.scss';
import resumeStyles from '../ResumeViewer.module.scss';

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

  const tabs: { id: TabType; label: string; icon: IconType }[] = [
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
            <div
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="glow1" cx="20%25" cy="30%25"><stop offset="0%25" stop-color="%236b5fff" stop-opacity="0.8"/><stop offset="50%25" stop-color="%233d2a7f" stop-opacity="0.4"/><stop offset="100%25" stop-color="%230a0a1a" stop-opacity="0"/></radialGradient><radialGradient id="glow2" cx="75%25" cy="60%25"><stop offset="0%25" stop-color="%234d7fff" stop-opacity="0.6"/><stop offset="60%25" stop-color="%232a4a7f" stop-opacity="0.3"/><stop offset="100%25" stop-color="%230a0a1a" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="600" fill="%230a0a1a"/><circle cx="150" cy="200" r="280" fill="url(%23glow1)"/><circle cx="950" cy="350" r="320" fill="url(%23glow2)"/></svg>')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className={styles.homeImage}
            >
              <h2 style={{ textTransform: 'none' }}>Welcome to StefanOS</h2>
              <p>Click the tabs on the left to explore content.</p>
            </div>
          )}

          {activeTab === 'skills' && <SkillBoard />}
          {activeTab === 'projects' && <ProjectsBoard />}
          {activeTab === 'about' && <AboutBoard />}
          {activeTab === 'resume' && (
            <div className={resumeStyles.resumeContainer}>
              <div className={resumeStyles.iframeWrapper}>
                <iframe
                  src="/StefanBobrowskiResume.pdf"
                  title="Stefan Bobrowski Resume"
                  className={resumeStyles.iframe}
                  loading="lazy"
                />
              </div>
              <div className={resumeStyles.resumeLink}>
                <a
                  href="/StefanBobrowskiResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <FiDownload className={resumeStyles.resumeIcon} />
                  Download Resume
                </a>
              </div>
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
