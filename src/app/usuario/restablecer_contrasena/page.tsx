"use client";
import { useState } from 'react';

const resetPassword = async (usernameOrEmail: string, newPassword: string) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch('http://127.0.0.1:8000/usuario/reset_password/', {
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
    <div>
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usernameOrEmail">Usuario o Correo Electrónico:</label>
          <input
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
          />
        </div>
        <button className="p-4" type="submit">Reestablecer Contraseña</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ResetPassword;