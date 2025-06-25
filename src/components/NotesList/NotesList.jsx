import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import NoteItem from '../NoteItem/NoteItem';
import NoteForm from '../NoteForm/NoteForm';
import './NotesList.css';

const NotesList = () => {
  const { username } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [username]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getNotes(username);
      setNotes(response.data || []);
    } catch (err) {
      setError('Failed to load notes. Please try again.');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      setError('');
      const response = await api.createNote(username, noteData);
      setNotes([response.data, ...notes]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create note. Please try again.');
      console.error('Error creating note:', err);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      setError('');
      const response = await api.updateNote(username, editingNote._id, noteData);
      setNotes(notes.map(note => 
        note._id === editingNote._id ? response.data : note
      ));
      setEditingNote(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update note. Please try again.');
      console.error('Error updating note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setError('');
      await api.deleteNote(username, noteId);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleAddNewNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="notes-container">
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      {!showForm && (
        <div className="notes-header">
          <button onClick={handleAddNewNote} className="add-note-button">
            + Add New Note
          </button>
        </div>
      )}

      {showForm && (
        <NoteForm
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onCancel={handleCancelForm}
          initialNote={editingNote}
        />
      )}

      <div className="notes-list">
        {notes.length === 0 && !showForm ? (
          <div className="empty-state">
            <p>You don't have any notes yet.</p>
            <button onClick={handleAddNewNote} className="add-note-button">
              Create Your First Note
            </button>
          </div>
        ) : (
          notes.map(note => (
            <NoteItem
              key={note._id}
              note={note}
              onEdit={handleEditClick}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;