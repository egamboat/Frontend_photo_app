"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Foto } from '@/interface/default';
import Head from 'next/head';
import Cargando from '@/components/loading';
import funcionesFoto from './useFoto';
import { toast } from 'react-toastify';
import { Comentario } from '@/interface/default';
// @ts-ignore
import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';

interface FotoPageProps {
  params: { id: string };
}

const { comentar, cargarComentarios, eliminarComentario } = funcionesFoto();

const FotoPage = ({ params }: FotoPageProps) => {
  const { id } = params;
  const [foto, setFoto] = useState<Foto | null>(null);
  const [fotoID, setFotoID] = useState<Foto | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comentario, setComentario] = useState<string>("");
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [editandoComentarioId, setEditandoComentarioId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    const token = localStorage.getItem('token');

    const cargarFoto = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos/${id}/`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        const data: Foto = await res.json();
        setFoto(data);
      } catch (error) {

        toast.error('Error al obtener la foto.');
        console.error('Error al obtener la foto:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarFoto();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const idfoto = parseInt(id);
    if (!isNaN(idfoto)) {
      cargaComentarios(idfoto);
      console.log(idfoto)
    } else {
      console.error('ID de la foto no es válido.');
    }
  }, [id]);
  const iniciarEdicion = (comentario: Comentario) => {
    setComentario(comentario.texto_comentado); // Cargar el texto en el campo de comentario
    setEditandoComentarioId(comentario.id);    // Guardar el ID del comentario que se está editando
  };

  const enviarComentario = async () => {
    if (!userId) return;

    const body = {
      texto_comentado: comentario,
      user: userId,
      foto: id,
    };

    try {
      if (editandoComentarioId) {
        await comentar(body, editandoComentarioId);
        toast.success('Comentario actualizado.');
      } else {
        await comentar(body);
        toast.success('Comentario creado.');
      }

      setComentario('');
      setEditandoComentarioId(null);

      const idfoto = parseInt(id);
      if (!isNaN(idfoto)) {
        await cargaComentarios(idfoto);
      }
    } catch (error) {
      console.error('Error al enviar o actualizar el comentario:', error);
    }
  };

  const cargaComentarios = async (idfoto: number) => {
    try {
      const result = await cargarComentarios(idfoto);
      setComentarios(result)
      console.log('Comentarios:', result);
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al cargar los comentarios.')
    }
  };
  const eliminaComentario = async (idComentario: number) => {
    try {
      const result = await eliminarComentario(idComentario);
      setEditandoComentarioId(null);
      const idfoto = parseInt(id);
      if (!isNaN(idfoto)) {
        await cargaComentarios(idfoto);
      }

    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al cargar los comentarios.')
    }
  }

  if (loading) {
    return <Cargando />;
  }

  if (!foto) {
    return null;
  }

  return (
    <>
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
            <div className='mt-4'>
              <div className='font-bold text-lg'>
                <h2>Comentarios</h2>
              </div>
              <div className='flex items-center rounded py-2'>
                <input
                  type="text"
                  placeholder='¿Qué opinas de la foto?'
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className='flex-grow border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
                <button
                  onClick={enviarComentario}
                  className='ml-2 border-lg rounded-lg p-2 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Comentar
                </button>
              </div>

              <div className="space-y-4">
                {comentarios.map((comentario) => {
                  const userIdFromLocalStorage = localStorage.getItem('user_id');
                  const isOwner = userIdFromLocalStorage === String(comentario.user);

                  return (
                    <div
                      key={comentario.id}
                      className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          {/* Esto es un placeholder para la imagen de perfil */}
                          <span className="text-xl font-semibold text-gray-700">
                            {comentario.nombre_usuario.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-[1rem] font-bold text-gray-900">
                            {comentario.nombre_usuario}
                          </h3>

                          {isOwner && (
                            <div className="flex ml-auto">
                              {/* Condicional para mostrar el botón "Editar" solo si el usuario es el autor del comentario */}
                              <button
                                onClick={() => iniciarEdicion(comentario)}  // Iniciar el proceso de edición
                                className="text-blue-500 text-sm px-2"
                              >
                                <i className="ri-edit-2-line"></i>
                              </button>
                              <button
                                onClick={() => eliminaComentario(comentario.id)}
                                className="text-red-500 text-sm px-2"
                              >
                                <i className="ri-delete-bin-6-line"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-gray-700 text-sm">{comentario.texto_comentado}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(comentario.creacion).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FotoPage;
