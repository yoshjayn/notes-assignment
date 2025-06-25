import React from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-item">
      <div className="note-content">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-text">{note.content}</p>
        <div className="note-meta">
          <span className="note-date">
            {note.updatedAt ? `Updated: ${formatDate(note.updatedAt)}` : `Created: ${formatDate(note.createdAt)}`}
          </span>
        </div>
      </div>
      <div className="note-actions">
        <button 
          onClick={() => onEdit(note)} 
          className="edit-button"
          title="Edit note"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(note._id)} 
          className="delete-button"
          title="Delete note"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;