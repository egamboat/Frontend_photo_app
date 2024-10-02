// src/app/foto/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Foto } from '@/interface/default';
// @ts-ignore
import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';


interface FotoPageProps {
  params: { id: string };
}

const FotoPage = async ({ params }: FotoPageProps) => {
  const { id } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos/${id}/`, {
      cache: 'no-store', // Opcional: evita caché para obtener datos actualizados
    });

    if (!res.ok) {
      // Si la respuesta no es exitosa, muestra una página 404
      notFound();
    }

    const foto: Foto = await res.json();

    return (
      <>
        <Navbar></Navbar>
        <div className='mx-6 mt-4 p-2'>
          <div className="flex flex-row items-center">
            <div className="w-1/2 m-6 max-w-full sm:max-w-[348px] md:max-w-[464px] lg:max-w-[596px]">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={foto.foto_url}
                  alt={foto.titulo}
                />
              </div>
            </div>
            <div className='w-1/2 m-4 p-4'>
              <div className='flex inline font-bold text-2xl mt-6'>
                <h1>{foto.titulo}</h1>
                <p className='ml-4'>
                  {foto.visibilidad === 'public' ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <LockClosedIcon className="h-5 w-5" />
                  )}
                </p>
              </div>
              <div className='mt-6 text-lg'>
                <p>{foto.description}</p>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error al obtener la foto:', error);
    notFound();
  }
};

export default FotoPage;
