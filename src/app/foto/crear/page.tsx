"use client";
import React, { useState } from "react";
import axios from "axios";
import Navbar from '@/components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cargando from '@/components/loading';
import Usuario from "@/app/usuario/useIniciarSesion";

const PageFoto = () => {

    const [foto, setFoto] = useState("");
    const [description, setDescription] = useState("");
    const [visibilidad, setVisibilidad] = useState("public");
    const [titulo, setTitulo] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const { loginUser } = Usuario();

    // const handleFileChange = (e:any) => {
    //     setFoto(e.target.files[0]);
    // };
    const handleUrlTitulo = (e: any) => {
        setTitulo(e.target.value);
    }
    const handleUrlFoto = (e: any) => {
        setFoto(e.target.value);
    }
    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const handleVisibilidadChange = (e: any) => {
        setVisibilidad(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userId = localStorage.getItem('user_id');

        if (!userId) {
            throw new Error("Usuario no autenticado");
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("foto_url", foto);
        formData.append("description", description);
        formData.append("visibilidad", visibilidad);
        formData.append("user", userId);

        try {
            setLoading(true);

            const response = await axios.post("http://localhost:8000/foto/api/fotos/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
            });
            setLoading(false);

            toast.success("¡Foto subida exitosamente!");
            window.location.href = '/';

        } catch (error) {
            setLoading(false);
            console.error("Error al subir la foto:", error);
            toast.error("Hubo un error al subir la foto.");
        }
    };

    return (
        <>
            <ToastContainer />
            <Navbar></Navbar>
            <div className="max-w-md mx-auto rounded-lg p-6">
                {(loading) && <Cargando />}

                <h2 className="text-2xl font-bold my-4 text-center">Publicar una Nueva Foto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mt-4">
                        <label className="block text-lg font-bold mb-1">Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={handleUrlTitulo}
                            placeholder="Título para la foto."
                            required
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-lg font-bold mb-1">Url de la Imágen:</label>
                        <input
                            type="text"
                            value={foto}
                            onChange={handleUrlFoto}
                            placeholder="Url de la imágen."
                            required
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* Input para agregar la descripción */}
                    <div className="mt-4">
                        <label className="block text-lg font-bold mb-1"> Descripción:</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Añade una descripción..."
                            required
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Selector para elegir la visibilidad */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visibilidad:</label>
                        <select
                            value={visibilidad}
                            onChange={handleVisibilidadChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="public">Pública</option>
                            <option value="private">Privada</option>
                        </select>
                    </div>

                    {/* Botón para enviar el formulario */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full mt-2 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md border"
                        >
                            Subir foto
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PageFoto;

