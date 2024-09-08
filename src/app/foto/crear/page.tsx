"use client";
import React, { useState } from "react";
import axios from "axios"; // Para realizar solicitudes HTTP

const PageFoto = () => {
    // Usamos el estado para manejar los datos de la foto y la descripción
    const [foto, setFoto] = useState(null); // Almacena la foto seleccionada
    const [description, setDescription] = useState(""); // Almacena la descripción de la foto
    const [visibilidad, setVisibilidad] = useState("public"); // Visibilidad de la foto

    // Función para manejar la subida de la foto
    const handleFileChange = (e) => {
        setFoto(e.target.files[0]); // Almacenamos el archivo de la foto seleccionada
    };

    // Función para manejar el cambio de la descripción
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value); // Almacenamos la descripción
    };

    // Función para manejar el cambio de visibilidad
    const handleVisibilidadChange = (e) => {
        setVisibilidad(e.target.value); // Almacenamos la visibilidad (pública o privada)
    };

    // Función para enviar la foto al backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir que la página se recargue al hacer submit

        // Crear un objeto FormData para enviar la imagen y los datos
        const formData = new FormData();
        formData.append("foto_url", foto); // Añadir la foto al FormData
        formData.append("description", description); // Añadir la descripción
        formData.append("visibilidad", visibilidad); // Añadir la visibilidad

        try {
            // Enviar la solicitud POST al backend
            const response = await axios.post("http://localhost:8000/foto/crear/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            // Mostrar un mensaje si la foto se sube correctamente
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
                {/* Input para seleccionar la foto */}
                <div>
                    <label>Seleccionar foto:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} required />
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

                {/* Botón para enviar el formulario */}
                <button type="submit">Subir foto</button>
            </form>
        </>
    );
};

export default PageFoto;

