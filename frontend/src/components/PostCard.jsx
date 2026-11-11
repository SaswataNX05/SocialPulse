import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { Heart, MessageCircle, Trash2, Edit2, Check, X } from 'lucide-react';

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);

  const isAuthor = user && user._id === post.user;
  const isAdmin = user && user.role === 'admin';
  const canModify = isAuthor || isAdmin;

  const isLiked = user && post.likes && post.likes.includes(user._id);

  const handleLike = async () => {
    try {
      await API.put(`/posts/${post._id}/like`);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${post._id}`);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    setLoadingAction(true);
    try {
      await API.put(`/posts/${post._id}`, { content: editContent });
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await API.post(`/posts/${post._id}/comment`, { text: commentText });
      setCommentText('');
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-4 transition hover:shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-slate-800">{post.authorName}</h4>
          <span className="text-xs text-slate-400">
            {new Date(post.createdAt).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>

        {canModify && (
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-indigo-600 transition"
                  title="Edit post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-slate-400 hover:text-red-600 transition"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loadingAction}
                  className="text-green-600 hover:text-green-700 transition"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(post.content);
                  }}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          rows={3}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-3"
        />
      ) : (
        <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line mb-3">
          {post.content}
        </p>
      )}

      {post.imageUrl && (
        <div className="rounded-lg overflow-hidden mb-3 border border-slate-100 max-h-96">
          <img
            src={post.imageUrl}
            alt="User uploaded visual"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-6 border-t border-slate-100 pt-3 text-slate-500 text-xs md:text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1.5 transition ${
            isLiked ? 'text-red-500 font-semibold' : 'hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes ? post.likes.length : 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1.5 hover:text-indigo-600 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments ? post.comments.length : 0} Comments</span>
        </button>
      </div>

      {/* Real-time Comments Thread */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a constructive reply..."
              className="flex-grow text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg transition"
            >
              Reply
            </button>
          </form>

          <div className="space-y-2">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((c) => (
                <div key={c._id || Math.random()} className="bg-slate-50 p-2.5 rounded-lg text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-800">{c.username}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(c.createdAt || Date.now()).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-slate-600">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}