import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSubmit, onCancel, initialNote = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required');
      return;
    }
    
    setError('');
    onSubmit({
      title: title.trim(),
      content: content.trim()
    });
    
    if (!initialNote) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <h2>{initialNote ? 'Edit Note' : 'Add New Note'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            rows="6"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {initialNote ? 'Update Note' : 'Add Note'}
          </button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;