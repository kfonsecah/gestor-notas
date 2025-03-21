import { NextApiRequest, NextApiResponse } from "next";

// Simulación de base de datos en memoria
let notes = [
  {
    id: "1",
    title: "Ejemplo",
    content: "Esta es una nota de prueba",
    color: "bg-yellow-300",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(notes);
  } else if (req.method === "POST") {
    const newNote = req.body;
    notes.push(newNote);
    res.status(201).json(newNote);
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID de nota requerido" });
    }

    notes = notes.filter((note) => note.id !== id);
    res.status(200).json({ message: "Nota eliminada correctamente" });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
