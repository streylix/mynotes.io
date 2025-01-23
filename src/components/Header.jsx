import React from 'react';
import { SlidersHorizontal, PanelLeft, ChevronLeft } from 'lucide-react';
import InfoMenu from './InfoMenu';
import StatsMenu from './StatsMenu';

function Header({ onSettingsClick, selectedId, notes, onTogglePin, onDeleteNote, onBack, canGoBack }) {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const topBar = document.querySelector('.top-bar');
    const header = document.querySelector('header');
    console.log("sidebar: ", sidebar)
    console.log("mainContent: ", mainContent)
    console.log("header: ", header)
    console.log("topBar: ", topBar)
    
    if (sidebar && mainContent && header && topBar) {
      sidebar.classList.toggle('hidden');
      mainContent.classList.toggle('full-width');
      topBar.classList.toggle('full-width');
      header.classList.toggle('full-width');
    }
  };

  return (
    <header>
      <div className="top-bar">
        <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <button 
            type="button"
            id="move-menu"
            className="menu-btn"
            onClick={toggleSidebar}
            style={{cursor: 'pointer'}}
            >
            <PanelLeft />
          </button>
          <button
              type="button"
              id="back-btn"
              onClick={onBack}
              disabled={!canGoBack}
              onMouseEnter={e => canGoBack && (e.target.style.opacity = '1')} 
              onMouseLeave={e => canGoBack && (e.target.style.opacity = '0.6')}
              style={{ opacity: canGoBack ? 0.6 : 0.3, cursor: canGoBack ? 'pointer' : 'not-allowed' }}
            >
              <ChevronLeft />
            </button>
          </div>
        <div className="header-buttons">
          <StatsMenu 
            selectedId={selectedId}
            notes={notes}
          />
          <InfoMenu 
            selectedId={selectedId}
            notes={notes}
            onTogglePin={onTogglePin}
            onDeleteNote={onDeleteNote}
          />
          <button 
            type="button" 
            id="settings"
            className="btn btn-settings"
            onClick={onSettingsClick}
          >
            <SlidersHorizontal />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;