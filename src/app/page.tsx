'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation'
import { Foto } from '@/interface/default';
interface Headers {
  [key: string]: string;
}
// @ts-ignore
import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';


const Home: React.FC = () => {
  // const subir_foto = () => {
  //   window.location.href = '/foto/crear';
  // };
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<Foto[]>([]);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    async function fetchData() {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos/`, {
          method: 'GET',
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error('Error al cargar las fotos');
        }
  
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener las fotos:', error);
      }
    }
  
    fetchData();
  }, []);
  


  console.log(data)
  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="flex flex-col items-center">
          <div className="my-4">
            <p className="font-bold text-3xl text-center mt-4">Comunidad</p>
          </div>
          {data.map((foto: Foto) => {
            // Verificamos si la foto es "public" o si el usuario está autenticado
            if (foto.visibilidad === 'public' || isAuthenticated) {
              return (
                <div key={foto.id} className="flex flex-row items-center bg-white pr-6 rounded-lg max-w-4xl">

                  <div className="w-1/2 pr-4 m-4">
                    <img
                      src={foto.foto_url}
                      alt={foto.titulo}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="w-1/2" m-4>
                    <div className='flex inline'>
                      <p className='mr-4 h-4 w-4'>
                        {foto.visibilidad === 'public' ? (
                          <EyeIcon className="h-6 w-6" />
                        ) : (
                          <LockClosedIcon className="h-6 w-6" />
                        )}
                      </p>
                      <h2 className="font-bold text-xl">{foto.titulo}</h2>
                    </div>

                    <p className="text-gray-600">{foto.user}</p>
                    <p className="text-gray-500 mt-4">{foto.description}</p>
                    {/* <p className="mt-2 text-gray-400">{foto.creacion}</p> */}
                    <a href={`/foto/${foto.id}`} className="mt-2 inline-block">
                      Ver más...
                    </a>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

      </div>
    </>
  );
};

export default Home;