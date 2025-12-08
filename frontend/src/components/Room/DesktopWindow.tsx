import { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineProject,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
  AiOutlinePlayCircle,
  AiOutlineThunderbolt,
} from 'react-icons/ai';
import SkillBoard from '../SkillBoard/SkillBoard';
import ProjectsBoard from './ProjectsBoard';
import AboutBoard from './AboutBoard';
import LinksBoard from './LinksBoard';
import PhotosBoard from './PhotosBoard';
import VideosBoard from './VideosBoard';
import GamesBoard from './GamesBoard';

type TabType =
  | 'home'
  | 'skills'
  | 'projects'
  | 'about'
  | 'resume'
  | 'links'
  | 'photos'
  | 'videos'
  | 'games';

export default function DesktopWindow() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [hoverTab, setHoverTab] = useState<TabType | null>(null);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: AiOutlineHome },
    { id: 'skills', label: 'Skills', icon: AiOutlineTool },
    { id: 'projects', label: 'Projects', icon: AiOutlineProject },
    { id: 'resume', label: 'Resume', icon: AiOutlineFileText },
    { id: 'photos', label: 'Photos', icon: AiOutlinePicture },
    { id: 'videos', label: 'Videos', icon: AiOutlinePlayCircle },
    { id: 'games', label: 'Games', icon: AiOutlineThunderbolt },
    { id: 'about', label: 'About', icon: AiOutlineUser },
    { id: 'links', label: 'Links', icon: AiOutlineLink },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0f1724',
        color: '#e6eef6',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: '#071027',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 12, height: 12, background: '#ff5f56', borderRadius: 12 }} />
          <div style={{ width: 12, height: 12, background: '#ffbd2e', borderRadius: 12 }} />
          <div style={{ width: 12, height: 12, background: '#27c93f', borderRadius: 12 }} />
          <div style={{ marginLeft: 12, fontWeight: 600 }}>StefanOS - Desktop</div>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 44px)' }}>
        <aside style={{ width: 220, marginTop: 20, padding: 12, borderRight: '1px solid #122233' }}>
          <div style={{ marginBottom: 12, fontWeight: 700 }}>Shortcuts</div>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab(null)}
                style={{
                  width: '100%',
                  marginBottom: 6,
                  padding: 8,
                  background:
                    activeTab === tab.id ? '#0f3556' : hoverTab === tab.id ? '#0d2d47' : '#0b2740',
                  color: activeTab === tab.id ? '#6ee7ff' : '#e6eef6',
                  border: `1px solid ${activeTab === tab.id ? '#6ee7ff' : '#122233'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <main style={{ flex: 1, padding: 18, overflow: 'auto' }}>
          {activeTab === 'home' && (
            <div>
              <h2>Welcome to StefanOS</h2>
              <p>Click the tabs on the left to explore content.</p>
            </div>
          )}

          {activeTab === 'skills' && (
            <div style={{ background: '#071427', padding: 12, borderRadius: 6 }}>
              <SkillBoard />
            </div>
          )}

          {activeTab === 'projects' && <ProjectsBoard />}
          {activeTab === 'about' && <AboutBoard />}
          {activeTab === 'resume' && (
            <div style={{ width: '100%', height: '100%' }}>
              <iframe
                src="/StefanBobrowskiResume.pdf"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 6,
                }}
                title="Stefan Bobrowski Resume"
              />
            </div>
          )}
          {activeTab === 'links' && <LinksBoard />}
          {activeTab === 'photos' && <PhotosBoard />}
          {activeTab === 'videos' && <VideosBoard />}
          {activeTab === 'games' && <GamesBoard />}
        </main>
      </div>
    </div>
  );
}
