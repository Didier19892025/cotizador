import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";



export const metadata: Metadata = {
  title: "Cotizador Nec",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=" min-h-screen bg-gradient-to-br from-indigo/30 to-purple text-gray"
      >

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
