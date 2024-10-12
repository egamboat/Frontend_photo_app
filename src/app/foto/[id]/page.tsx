"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Foto } from '@/interface/default';
import Head from 'next/head';
import Cargando from '@/components/loading';
import funcionesFoto from './useFoto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @ts-ignore
import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';


interface FotoPageProps {
  params: { id: string };
}
const { comentar } = funcionesFoto();

const FotoPage = ({ params }: FotoPageProps) => {
  const { id } = params;
  const [foto, setFoto] = useState<Foto | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comentario, setComentario] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);

    const fetchFoto = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos/${id}/`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          notFound();
        }

        const data: Foto = await res.json();
        setFoto(data);
      } catch (error) {
        
        toast.error('Error al obtener la foto.')
        console.error('Error al obtener la foto:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchFoto();
  }, [id]);

  const enviarComentario = async () => {
    if (!userId) return;

    try {
      const body = {
        texto_comentado: comentario,
        user: userId,
        foto: id,
      };

      const result = await comentar(body);
      console.log('Comentario enviado:', result);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  if (loading) {
    return <Cargando />;
  }

  if (!foto) {
    return null; // O mostrar un mensaje de que no se encontró la foto
  }

  return (
    <>
      <ToastContainer />

      <Head>
        <title>Photo Blog - {foto.titulo}</title>
        <meta name="description" content="Descripción de la página" />
      </Head>

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
          <div className='w-1/2 m-4 p-4 overflow-y'>

            <div className='flex inline font-bold text-2xl mt-6 items-center'>
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
            
            {/*Comentarios*/}
            <div className='mt-2'>
              <div className='font-bold text-lg'>
                <h2>Comentarios</h2>
              </div>
              <div className='border rounded'>
                <input
                  type="text"
                  placeholder='Crear Comentario'
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}  // Actualizamos el estado con el valor del input
                />
                <button onClick={enviarComentario}>
                  Comentar
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FotoPage;
