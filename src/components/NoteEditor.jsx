import React, { useRef, useEffect } from 'react';

function NoteEditor({ note, onUpdateNote }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && note) {
      contentRef.current.innerHTML = note.content || '';
      contentRef.current.focus();

      if (note.caretPosition) {
        try {
          const nodeIterator = document.createNodeIterator(contentRef.current, NodeFilter.SHOW_TEXT);
          let currentNode;
          let charCount = 0;
          const range = document.createRange();
          const selection = window.getSelection();

          while ((currentNode = nodeIterator.nextNode())) {
            if (charCount + currentNode.length >= note.caretPosition) {
              range.setStart(currentNode, note.caretPosition - charCount);
              selection.removeAllRanges();
              selection.addRange(range);
              break;
            }
            charCount += currentNode.length;
          }
        } catch (e) {
          const range = document.createRange();
          range.selectNodeContents(contentRef.current);
          range.collapse(false);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        const range = document.createRange();
        range.selectNodeContents(contentRef.current);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [note?.id]);

  const handleSelect = () => {
    if (!contentRef.current) return;
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      let charCount = 0;
      const treeWalker = document.createTreeWalker(contentRef.current, NodeFilter.SHOW_TEXT);
      let node;

      while ((node = treeWalker.nextNode()) && node !== range.startContainer) {
        charCount += node.length;
      }
      charCount += range.startOffset;
      onUpdateNote({ caretPosition: charCount }, false);
    }
  };

  const handleContentInput = () => {
    if (note && contentRef.current) {
      onUpdateNote({ content: contentRef.current.innerHTML }, true);
    }
  };

  if (!note) {
    return (
      <div className="editable" placeholder="Select a note to start editing..." />
    );
  }

  return (
    <div className="editable">
      <div
        ref={contentRef}
        id="inner-note"
        contentEditable
        onInput={handleContentInput}
        onSelect={handleSelect}
        suppressContentEditableWarning
      />
    </div>
  );
}

export default NoteEditor;