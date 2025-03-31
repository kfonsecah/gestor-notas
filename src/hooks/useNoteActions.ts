"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/context/NotesContext";

type EditData = {
  id: string;
  key: "title" | "content" | "category" | "color";
  value: string;
};

export const useNoteActions = () => {
  const { dispatch } = useNotes();
  const [debouncedChanges, setDebouncedChanges] = useState<EditData | null>(
    null,
  );

  useEffect(() => {
    if (debouncedChanges) {
      const timeout = setTimeout(async () => {
        const { id, key, value } = debouncedChanges;
        await fetch("/api/notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, key, value }),
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [debouncedChanges]);

  const addNote = async (category: string) => {
    const newNote = {
      title: "Nueva Nota",
      content: "Haz doble clic para editar...",
      category,
      color: ["bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-pink-300"][
        Math.floor(Math.random() * 4)
      ],
    };

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    const note = await res.json();
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  const editNote = (id: string, key: EditData["key"], value: string) => {
    dispatch({ type: "EDIT_NOTE", payload: { id, key, value } });
    setDebouncedChanges({ id, key, value });
  };

  return { addNote, deleteNote, editNote };
};
