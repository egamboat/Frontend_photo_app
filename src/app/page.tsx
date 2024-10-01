'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation'
import { Foto } from '@/interface/default';
interface Headers {
  [key: string]: string;
}

const Home: React.FC = () => {
  const subir_foto = () => {
    window.location.href = '/foto/crear';
  };
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<Foto[]>([]);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Actualizamos el estado solo en el cliente
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos/`);
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  console.log(data)
  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1 className="justify-center">Photo App!</h1>
        <div>
          <button className="m-2 bg-blue rounded border" onClick={subir_foto}>
            Subir Foto
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="my-4">
            <p className="font-bold text-3xl text-center">Comunidad</p>
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
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="w-1/2" m-4>
                    <h2 className="font-bold text-xl">{foto.titulo}</h2>
                    <p className="text-gray-600">{foto.user}</p>
                    <p className="text-gray-500 mt-4">{foto.description}</p>
                    <p className="mt-2 text-gray-400">{foto.creacion}</p>
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