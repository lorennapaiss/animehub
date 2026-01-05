import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AnimeHub",
  description: "Catálogo de animes com busca e favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#F7F3EE] text-zinc-900">
        {children}
      </body>
    </html>
  );
}
