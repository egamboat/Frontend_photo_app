// src/app/foto/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';

// Define la interfaz según tu API
interface Foto {
  id: number;
  titulo: string;
  foto_url: string;
  description: string;
  visibilidad: string;
  creacion: string; 
  modificacion: string;
  user: number;
}

interface FotoPageProps {
  params: { id: string };
}

const FotoPage = async ({ params }: FotoPageProps) => {
  const { id } = params;

  try {
    const res = await fetch(`http://127.0.0.1:8000/foto/api/fotos/${id}/`, {
      cache: 'no-store', // Opcional: evita caché para obtener datos actualizados
    });

    if (!res.ok) {
      // Si la respuesta no es exitosa, muestra una página 404
      notFound();
    }

    const foto: Foto = await res.json();

    return (
      <div>
        <h1>{foto.titulo}</h1>
        <img src={foto.foto_url} alt={foto.titulo} />
        <p>{foto.description}</p>
        {/* Agrega más detalles según tu interfaz */}
      </div>
    );
  } catch (error) {
    console.error('Error al obtener la foto:', error);
    notFound();
  }
};

export default FotoPage;
