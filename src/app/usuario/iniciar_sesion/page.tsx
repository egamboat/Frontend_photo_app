"use client";
// pages/login.tsx
import React from 'react';
import { useState } from 'react';

interface LoginResponse {
  token: string;
  user: {
    username: string;
    email: string;
  };
}

interface LoginUserParams {
  username: string;
  password: string;
}

const loginUser = async ({ username, password }: LoginUserParams): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/usuario/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error || 'Something went wrong'}`);
    }
    console.log("Sesión Iniciada")
    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.log('Error logging in:', error);
    throw error;
  }
};

const IniciarSesion = ()=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const  contrasena = "";
  const  usuario = "esaugt2001";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem('token', data.token)
      window.location.href = '/';
      setSuccess(`Inicio de sesión exitoso!`);
      setError(null);
    } catch (error) {
      console.log(error)
      setSuccess(null);
    }
  };

  const crearCuenta = ()=>{
    window.location.href = '/usuario/registrarse';
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label className='m-2 border'>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label className='m-2 border'>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className='m-4 border font-bold' type="submit">Login</button>
      </form>
      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>}
      <div>
        <p>¿No tienes una Cuenta?</p>
        <div>
          <button onClick={crearCuenta}>
            Creear Cuenta
          </button>
        </div>
      </div>
      <div>
        <p>¿Olvidaste tu contraseña?</p>
        <div>
          <button>
            Reestablecer Contraseña
          </button>
        </div>
      </div>
    </div>

  );
}
export default IniciarSesion