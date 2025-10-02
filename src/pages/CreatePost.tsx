import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [avis, setAvis] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/posts", { title, avis, body });
      setMessage({ text: "✅ Post créé avec succès !", type: "success" });
      setTimeout(() => navigate("/"), 2000); // redirection après 2s
    } catch (error) {
      console.error(error);
      setMessage({ text: "❌ Erreur lors de la création du post", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg relative">
      {/* Message animé */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`mb-4 p-3 rounded-md text-center font-semibold ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

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

      <form onSubmit={submit} className="space-y-4">
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
          <label className="block text-gray-700 font-medium mb-1">Avis</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={avis}
            onChange={(e) => setAvis(e.target.value)}
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
