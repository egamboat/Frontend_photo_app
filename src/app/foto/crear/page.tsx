"use client";
import React, { useState } from "react";
import axios from "axios"; // Para realizar solicitudes HTTP

const PageFoto = () => {
    // Usamos el estado para manejar los datos de la foto y la descripción
    const [foto, setFoto] = useState(""); // Almacena la foto seleccionada
    const [description, setDescription] = useState(""); // Almacena la descripción de la foto
    const [visibilidad, setVisibilidad] = useState("public"); // Visibilidad de la foto
    const [titulo, setTitulo] = useState(""); // Visibilidad de la foto
    const [user, setUser] = useState("")

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
    const handleUser = (e: any) => {
        setUser(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("foto_url", foto);
        formData.append("description", description);
        formData.append("visibilidad", visibilidad);
        formData.append("user", user);

        try {
            const response = await axios.post("http://localhost:8000/foto/api/fotos/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    //"Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            alert("¡Foto subida exitosamente!");
        } catch (error) {
            console.error("Error al subir la foto:", error);
            alert("Hubo un error al subir la foto.");
        }
    };

    return (
        <>
            <h2>Subir una nueva foto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <textarea value={titulo} onChange={handleUrlTitulo} placeholder="Título para la foto." required />
                </div>
                <div>
                    <label>Seleccionar foto:</label>
                    {/* <input type="file" accept="image/*" onChange={handleFileChange} required /> */}
                    <textarea value={foto} onChange={handleUrlFoto} placeholder="Coloca el enlace de la foto" required />
                </div>

                {/* Input para agregar la descripción */}
                <div>
                    <label>Descripción:</label>
                    <textarea value={description} onChange={handleDescriptionChange} placeholder="Añade una descripción..." required />
                </div>

                {/* Selector para elegir la visibilidad */}
                <div>
                    <label>Visibilidad:</label>
                    <select value={visibilidad} onChange={handleVisibilidadChange}>
                        <option value="public">Pública</option>
                        <option value="private">Privada</option>
                    </select>
                </div>
                <div>
                    <label>Usuario:</label>
                    <textarea value={user} onChange={handleUser} placeholder="Coloca el usuario..." required />
                </div>

                {/* Botón para enviar el formulario */}
                <button type="submit">Subir foto</button>
            </form>
        </>
    );
};

export default PageFoto;

