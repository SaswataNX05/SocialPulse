import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { SocketContext } from '../context/SocketContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { Loader2 } from 'lucide-react';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const socket = useContext(SocketContext);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await API.get(`/posts?page=${pageNum}&limit=10`);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // WebSocket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('post:created', (newPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    socket.on('post:updated', (updatedPost) => {
      setPosts((prev) =>
        prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    socket.on('post:deleted', (deletedId) => {
      setPosts((prev) => prev.filter((post) => post._id !== deletedId));
    });

    socket.on('post:liked', ({ postId, likes }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes } : post
        )
      );
    });

    socket.on('post:commented', ({ postId, comments }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, comments } : post
        )
      );
    });

    return () => {
      socket.off('post:created');
      socket.off('post:updated');
      socket.off('post:deleted');
      socket.off('post:liked');
      socket.off('post:commented');
    };
  }, [socket]);

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <PostForm />

      {loading && posts.length === 0 ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center py-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
              >
                Previous
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}