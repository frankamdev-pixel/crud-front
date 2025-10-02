import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !body) {
      setError("Tous les champs sont obligatoires !");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/posts", {
        title,
        body,
      });
      navigate("/"); // redirige vers la liste des posts
    } catch (err: any) {
      setError("Erreur lors de la création du post.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-center relative">
        <Link
          to="/"
          className="text-2xl absolute bg-blue-400 px-2 py-1 rounded-lg left-0 top-0 transition duration-300 hover:bg-blue-500 text-white"
        >
          Retour
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Créer un Post
        </h1>
      </div>

      {error && (
        <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Titre</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Body</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Avis
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={avis}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-300"
        >
          {loading ? "Création en cours..." : "Créer le Post"}
        </button>
      </form>
    </div>
  );
}
