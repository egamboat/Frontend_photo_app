"use client";
import { useState } from 'react';

const resetPassword = async (usernameOrEmail: string, newPassword: string) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/usuario/reset_password/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username_or_email: usernameOrEmail,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error || 'Something went wrong'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

const ResetPassword = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await resetPassword(usernameOrEmail, newPassword);
      setMessage(result.message);
      setError(null);
    } catch (error) {
      console.log(error)
      setError('Failed to reset password');
      setMessage(null);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex justify-center items-center w-1/2">
          <div className=" w-full max-w-md">
            <h2 className='text-xl font-bold mb-4'>U-Foto</h2>
            <h3 className='text-lg font-bold'>Restablecer Contraseña</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">Usuario o Correo Electrónico:</label>
                <input
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-4" type="submit">Reestablecer Contraseña</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
        <div className="w-1/2">
          <img src="/img/tronco.jpg" alt="Imagen de tronco" className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;