"use client";

import React, { useEffect, useState } from 'react';
import { Foto } from '@/interface/default';

const UserPhotosPage = () => {
    const [fotos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Función para cargar las fotos del usuario
    const fetchUserPhotos = async () => {
        const token = localStorage.getItem('authToken'); // Asegúrate de que el token esté almacenado
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/fotos_usuario/`, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error('Error al cargar las fotos del usuario');
            }

            const result = await response.json();
            setPhotos(result);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Ocurrió un error inesperado al obtener las fotos del usuario');
            }
            console.error('Error al obtener las fotos del usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPhotos();
    }, []);

    // Renderizado de la lista de fotos del usuario
    return (
        <div>
            <h1>Mis Fotos</h1>
            {loading && <p>Cargando fotos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="fotos-grid">
                {fotos.length > 0 ? (
                    fotos.map((foto: Foto) => (
                        <div key={foto.id} className="foto-item">
                            <img src={foto.foto_url} alt={foto.titulo} className="foto-image" />
                            <h2>{foto.titulo}</h2>
                            <p>{foto.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No tienes fotos.</p>
                )}

            </div>
        </div>
    );
};

export default UserPhotosPage;
