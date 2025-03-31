import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const notes = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return Response.json(notes);
}

export async function POST(request: Request) {
  const { title, content, color, category } = await request.json();
  const docRef = await addDoc(collection(db, "notes"), {
    title,
    content,
    color,
    category,
  });
  return Response.json(
    { id: docRef.id, title, content, color, category },
    { status: 201 },
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return new Response("ID inválido", { status: 400 });

  await deleteDoc(doc(db, "notes", id));
  return new Response(null, { status: 204 });
}

export async function PUT(request: Request) {
  const { id, key, value } = await request.json();

  if (!id || !key || value === undefined)
    return new Response("Parámetros incompletos", { status: 400 });

  await updateDoc(doc(db, "notes", id), { [key]: value });
  return Response.json({ id, key, value });
}
