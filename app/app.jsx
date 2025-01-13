import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import NoteEditor from './components/note_editor/noteeditor';
import SettingsModal from './components/settings/settingsmodal';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';

function App() {
  const {
    notes,
    selectedNoteIndex,
    addNote,
    deleteNote,
    updateNote,
    selectNote,
    searchNotes,
    pinNote,
    lockNote
  } = useNotes();

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      
      <div className="main-container">
        <Sidebar
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
          onAddNote={addNote}
          onSelectNote={selectNote}
          onSearch={searchNotes}
        />
        
        <NoteEditor
          note={notes[selectedNoteIndex]}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onPin={pinNote}
          onLock={lockNote}
        />
      </div>

      <SettingsModal
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

export default App;