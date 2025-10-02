import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "./types/Post";
import { motion, AnimatePresence } from "framer-motion";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/posts")
      .then((res) => setPosts(res.data.post || res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
      >
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex justify-end space-x-2 mt-4">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    ));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Liste des Posts</h1>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          + Créer un post
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? renderSkeleton()
          : (
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.body}</p>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/view/${post.id}`}
                        className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-[3px] text-sm transition duration-300"
                      >
                        Voir
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/edit/${post.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-[3px] text-sm transition duration-300"
                      >
                        Modifier
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button
                        disabled={deletingId === post.id}
                        onClick={() => handleDelete(post.id)}
                        className={`${
                          deletingId === post.id
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white px-3 py-1 rounded-[3px] text-sm transition duration-300`}
                      >
                        {deletingId === post.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
      </div>

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Aucun post trouvé.</p>
      )}
    </div>
  );
}
