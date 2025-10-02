import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "./types/Post";

export default function ViewPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (!post) return <p className="text-center text-red-500">Post introuvable</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <Link
        to="/"
        className="inline-block mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
      >
        ← Retour
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{post.body}</p>
      {post.avis && (
        <p className="italic text-gray-500 border-t pt-4">Avis : {post.avis}</p>
      )}
    </div>
  );
}
