import { useNotes } from "@/context/NotesContext";

export default function Home() {
  const { state, dispatch } = useNotes();

  const addNote = async () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Nueva Nota",
      content: "Haz doble clic para editar...",
      color: ["bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-pink-300"][
        Math.floor(Math.random() * 4)
      ],
    };

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "secreto" },
      body: JSON.stringify(newNote),
    });

    if (res.ok) {
      dispatch({ type: "ADD_NOTE", payload: newNote });
    }
  };

  const deleteNote = async (id: string) => {
    console.log("Intentando borrar la nota con ID:", id);

    const res = await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: "secreto" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    console.log("Respuesta del servidor:", data);

    if (res.ok) {
      dispatch({ type: "DELETE_NOTE", payload: id });
    } else {
      console.error("Error al eliminar nota:", data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-700 mb-6">
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
              onChange={(e) =>
                dispatch({
                  type: "EDIT_NOTE",
                  payload: { id: note.id, key: "title", value: e.target.value },
                })
              }
            />
            <textarea
              className="bg-transparent text-sm w-full h-28 outline-none resize-none"
              value={note.content}
              onChange={(e) =>
                dispatch({
                  type: "EDIT_NOTE",
                  payload: {
                    id: note.id,
                    key: "content",
                    value: e.target.value,
                  },
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
