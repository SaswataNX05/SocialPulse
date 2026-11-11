import React, { useState } from 'react';
import API from '../services/api';
import { Send, Image as ImageIcon } from 'lucide-react';

export default function PostForm() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      await API.post('/posts', { content, imageUrl });
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      {error && <div className="text-red-600 text-xs mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full resize-none border-none focus:ring-0 p-1 text-slate-800 placeholder-slate-400 text-sm md:text-base outline-none"
        />

        {showImageInput && (
          <div className="mt-2 mb-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste public image URL (e.g. Unsplash)..."
              className="w-full text-xs p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="flex items-center space-x-1 text-slate-500 hover:text-indigo-600 text-xs font-medium"
          >
            <ImageIcon className="w-4 h-4" />
            <span>{showImageInput ? 'Remove image field' : 'Add image URL'}</span>
          </button>

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Posting...' : 'Post'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}