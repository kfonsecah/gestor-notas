"use client";

import { useNotes } from "@/context/NotesContext";
import { useNoteActions } from "@/hooks/useNoteActions";
import { useState } from "react";


export default function Home() {
  const { state } = useNotes();
  const { addNote, deleteNote, editNote } = useNoteActions();

  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredNotes =
    selectedCategory === "Todas"
      ? state.notes
      : state.notes.filter((note) => note.category === selectedCategory);

  const handleAddNote = () => {
    const category = prompt("¿Categoría de la nota? (Ej: Trabajo, Personal, Estudio)");
    if (category) addNote(category);
  };

  const uniqueCategories = ["Todas", ...new Set(state.notes.map((note) => note.category))];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">📝 Pizarra de Notas </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddNote}
          className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition"
        >
          ➕ Nueva Nota
        </button>

        <select
          className="p-2 rounded-md border bg-gray-200 text-gray-800"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {uniqueCategories.map((cat, index) => (
            <option key={`${cat}-${index}`} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`relative p-4 w-48 h-52 ${note.color} text-gray-800 font-semibold rounded-md shadow-lg transform rotate-1 hover:rotate-0 transition-all`}
          >
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => deleteNote(note.id)}
            >
              ✖
            </button>

            <p className="text-xs italic text-gray-700">{note.category}</p>

            <input
              className="bg-transparent text-lg font-bold w-full outline-none"
              value={note.title}
              onChange={(e) => editNote(note.id, "title", e.target.value)}
            />

            <textarea
              className="bg-transparent text-sm w-full h-28 outline-none resize-none"
              value={note.content}
              onChange={(e) => editNote(note.id, "content", e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}