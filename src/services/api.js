// Base URL for API calls
const API_BASE_URL = 'https://crud-app-backend-tau.vercel.app';

// API service object
const api = {
  // Get all notes for a user (also creates user if doesn't exist)
  async getNotes(username) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes?username=${username}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Create a new note
  async createNote(username, noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/create/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create note');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update an existing note
  async updateNote(username, noteId, noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/update/${username}/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update note');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  // Delete a note
  async deleteNote(username, noteId) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/delete/${username}/${noteId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete note');
      }
      
      return data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

export default api;