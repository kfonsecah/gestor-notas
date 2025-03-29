import "./globals.css";
import { NotesProvider } from "@/context/NotesContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestor de Notas",
  description: "App de notas estilo post-it con Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  );
}
