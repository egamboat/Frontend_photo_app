'use client';
import React from 'react';
import Navbar from '@/components/navbar';

const Home = () => {
  const iniciarSesion = () => {
    window.location.href = '/usuario/iniciar_sesion';
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>Mi Aplicación Next.js</h1>
        <button className="m-2 bg-blue border" onClick={iniciarSesion}>
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}

export default Home;

