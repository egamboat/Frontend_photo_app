'use client';
import { register } from 'module';
// pages/register.tsx
import { useState } from 'react';

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
    const response = await fetch('http://127.0.0.1:8000/usuario/register/', {
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

const Register = ()=> {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const data = await registerUser({ username, email, password });
      setSuccess(`Registration successful!`);
      setError(null);
      window.location.href = '/usuario/iniciar_sesion';
    } catch (error) {
      setError('Error registering user');
      setSuccess(null);
    }
  };

  return (
    <>
      <div className=''>
        <div>
          <label>
            Nombre de Usuario:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="button" onClick={handleRegister}>Register</button>
        </div>
        {error && <p>Error: {error}</p>}
        {success && <p>{success}</p>}
      </div>
    </>
  );
}
export default Register
//contraseña: esau2001