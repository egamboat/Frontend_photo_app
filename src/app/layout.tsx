import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Blog",
  description: "Un momento en el tiempo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <title>{String(metadata.title || "")}</title>
        <meta name="description" content={String(metadata.description || "")} />
      </Head>
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
