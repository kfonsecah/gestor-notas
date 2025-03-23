import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

interface Note {
  id?: string;
  title: string;
  content: string;
  color: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(notes);
  }

  if (req.method === "POST") {
    const { title, content, color } = req.body as Note;
    const docRef = await addDoc(collection(db, "notes"), { title, content, color });
    return res.status(201).json({ id: docRef.id, title, content, color });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id !== "string") return res.status(400).json({ error: "Invalid ID" });

    await deleteDoc(doc(db, "notes", id));
    return res.status(204).end();
  }

  if (req.method === "PUT") {
    const { id, key, value } = req.body;
    if (!id || !key || value === undefined)
      return res.status(400).json({ error: "Missing parameters" });

    await updateDoc(doc(db, "notes", id), { [key]: value });
    return res.status(200).json({ id, key, value });
  }

  return res.status(405).json({ error: "Method not allowed" });
}