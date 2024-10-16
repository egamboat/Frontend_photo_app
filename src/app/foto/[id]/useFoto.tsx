interface ComentarioBody {
  texto_comentado: string;
  user: string;
  foto: string;
}

const funcionesFoto = () => {

  const comentar= async (body: ComentarioBody) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el comentario');
    }

    return await response.json();
  };

  const cargarComentarios= async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/?foto_id=${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error al cargar los comentarios.');
    }

    return await response.json();
  };

  return {
    comentar,
    cargarComentarios,
  };
}

export default funcionesFoto;

