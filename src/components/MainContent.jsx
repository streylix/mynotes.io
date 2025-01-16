import React, { useRef, useEffect } from 'react';

function MainContent({ note, onUpdateNote }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = note?.content || '';
    }
  }, [note?.id]);

  const handleContentInput = () => {
    if (note && contentRef.current) {
      onUpdateNote({
        content: contentRef.current.innerHTML
      });
    }
  };

  if (!note) {
    return (
      <div className="main-content" style={{ visibility: 'hidden' }}>
        <div className="editable" placeholder="Select a note to start editing..." />
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="editable" style={{ height: '100%' }}>
        <div
          ref={contentRef}
          id="inner-note"
          contentEditable
          onInput={handleContentInput}
          suppressContentEditableWarning
          style={{ height: '100%', overflow: 'auto' }}
        />
      </div>
    </div>
  );
}

export default MainContent;