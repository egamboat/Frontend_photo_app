'use client';
import { register } from 'module';
// pages/register.tsx
import { useState } from 'react';
import Usuario from '../useIniciarSesion';
import Cargando from '@/components/loading';

interface RegisterResponse {
  token: string;
  user: {
    username: string;
    email: string;
  };
}

interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}

const registerUser = async ({ username, email, password }: RegisterUserParams): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/usuario/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.detail || 'Something went wrong'}`);
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUser } = Usuario();

  const handleRegister = async () => {
    //Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Debe introducir un correo electrónico correcto.");
      setSuccess(null);
      return; // Detener el proceso si el correo no es válido
    }

    try {
      setLoading(true);
      const data = await registerUser({ username, email, password });
      setSuccess(`Registration successful!`);
      setError(null);
      setLoading(false);
      window.location.href = '/usuario/iniciar_sesion';
    } catch (error) {
      setError('Error registering user');
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen p-4">
        <div className="flex justify-center items-center w-full md:w-1/2 p-2">
          <div className=" w-full max-w-md p-4">
            <h2 className='text-xl font-bold mb-4'>U-Foto</h2>

            {(loading) && <Cargando />}

            <h3 className='text-lg font-bold'>Registrar Usuario</h3>
            <div className="space-y-4">
              <div className='mt-2'>
                <label className='mt-2'>
                  Nombre de Usuario:
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                    className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <label className='mt-2'>
                  Email:
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <label className='mt-2'>
                  Contraseña:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <div className="flex justify-between items-center pt-4">
                  <button type="button" onClick={handleRegister}
                    className="block w-full text-center mt-4 px-4 py-2 bg-green-500 rounded-lg shadow-md"
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
            {error && <p>Error: {error}</p>}
            {success && <p>{success}</p>}
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src="/img/fuego.jpg" alt="Imagen de Fuego" className="w-full h-full object-cover" />
        </div>

      </div>

    </>
  );
}
export default Register
//contraseña: esau2001