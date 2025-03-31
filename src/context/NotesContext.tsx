"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  category: string;
}

type NotesState = {
  notes: Note[];
};

type Action =
  | { type: "SET_NOTES"; payload: Note[] }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string }
  | {
      type: "EDIT_NOTE";
      payload: { id: string; key: keyof Note; value: string };
    };

const notesReducer = (state: NotesState, action: Action): NotesState => {
  switch (action.type) {
    case "SET_NOTES":
      return { notes: action.payload };
    case "ADD_NOTE":
      return { notes: [...state.notes, action.payload] };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "EDIT_NOTE":
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, [action.payload.key]: action.payload.value }
            : note,
        ),
      };
    default:
      return state;
  }
};

const NotesContext = createContext<
  { state: NotesState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const notes = await res.json();
      dispatch({ type: "SET_NOTES", payload: notes });
    };

    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
};
