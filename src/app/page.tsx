"use client";

import { useNotes } from "@/context/NotesContext";
import { useNoteActions } from "@/hooks/useNoteActions";

export default function Home() {
  const { state } = useNotes();
  const { addNote, deleteNote, editNote } = useNoteActions();

  return (
    <div
      className="min-h-screen bg-gray-200 flex flex-col items-center p-8"
      style={{ backgroundColor: "#F010101", backgroundSize: "cover" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-[#000000]">
        📝 Pizarra de Notas
      </h1>

      <button
        onClick={addNote}
        className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-green-600 transition"
      >
        ➕ Agregar Nota
      </button>

      <div className="mt-8 flex flex-wrap justify-center gap-6 w-full">
        {state.notes.map((note) => (
          <div
            key={note.id}
            className={`relative p-4 w-48 h-48 ${note.color} text-gray-800 font-semibold rounded-md shadow-lg transform rotate-2 hover:rotate-0 transition-all`}
          >
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => deleteNote(note.id)}
            >
              ✖
            </button>

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
