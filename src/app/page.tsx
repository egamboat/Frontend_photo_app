'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Actualizamos el estado solo en el cliente
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/foto/api/fotos/');
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
        <div className=''>
          {data.map((foto: Foto) => {
            // Verificamos si la foto es "public" o si el usuario está autenticado
            if (foto.visibilidad === 'public' || isAuthenticated) {
              return (
                <div key={foto.id}>
                  <img
                    src={foto.foto_url}
                    alt={foto.titulo}
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                  <h2>{foto.titulo}</h2>
                  <p><strong>Descripción:</strong> {foto.description}</p>
                  <p><strong>Visibilidad:</strong> {foto.visibilidad}</p>
                  <p><strong>Creación:</strong> {new Date(foto.creacion).toLocaleString()}</p>
                  <p><strong>Modificación:</strong> {new Date(foto.modificacion).toLocaleString()}</p>
                  <p><strong>Usuario ID:</strong> {foto.user}</p>
                </div>
              );
            }
            // Si no es public y no está autenticado, no mostramos nada
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;

