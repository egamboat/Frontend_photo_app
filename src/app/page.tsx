'use client';
import React from 'react';
import Navbar from '@/components/navbar';

const Home = () => {
  const subir_foto = () => {
    window.location.href = '/foto/crear';
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>Photo App!</h1>
        <button className="m-2 bg-blue rounded border" onClick={subir_foto}>
          Subir Foto
        </button>
      </div>
    </>
  );
}

export default Home;

