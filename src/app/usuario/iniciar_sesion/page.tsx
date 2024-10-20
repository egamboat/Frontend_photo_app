"use client";

import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Cargando from '@/components/loading';
import Usuario from '../useIniciarSesion';

const IniciarSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUser } = Usuario();

  const contrasena = "";
  const usuario = "esau2001";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await loginUser({ username, password });
      localStorage.setItem('token', data.token)
      window.location.href = '/';
      setSuccess('Inicio de sesión exitoso!');
      setError(null);
      setLoading(false);

    } catch (error) {
      console.log(error)
      setSuccess(null);
      setLoading(false);
    }
  };

  const crearCuenta = () => {
    window.location.href = '/usuario/registrarse';
  }

  return (
    <>

      <div className="flex h-screen p-4">
        <div className="hidden md:block md:w-1/2">
          <img src="/img/tronco.jpg" alt="Imagen de tronco" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 p-2">
          <div className=" w-full max-w-md p-4">
            <h2 className='text-xl font-bold mb-4'>U-Foto</h2>

            {(loading) && <Cargando />}
            <h3 className='text-lg font-bold'>Iniciar Sesión</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <button
                  type="submit"
                  className="block w-full text-center mt-2 px-4 py-2 bg-green-500 rounded-lg shadow-md"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿No tienes una Cuenta?
                </a>
              </div>
              <button
                onClick={crearCuenta}
                className="block w-full text-center mt-2 px-4 py-2 bg-green-500 rounded-lg shadow-md"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IniciarSesion