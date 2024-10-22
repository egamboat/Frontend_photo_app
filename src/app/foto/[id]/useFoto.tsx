interface ComentarioBody {
  texto_comentado: string;
  user: string;
  foto: string;
}

const funcionesFoto = () => {

  const token = localStorage.getItem('token');
  const comentar = async (body: ComentarioBody, comentarioId?: number) => {
    const url = comentarioId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/${comentarioId}/`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/`;
    
    const method = comentarioId ? 'PUT' : 'POST';  // Cambiar método según si es creación o actualización
  
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error('Error al enviar el comentario');
    }
  
    return await response.json();
  };
  

  const cargarComentarios = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/?foto_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al cargar los comentarios.');
    }

    return await response.json();
  };

  const eliminarComentario = async (comentarioId: number) => {
    const token = localStorage.getItem('token'); // Obtén el token de autenticación
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foto/api/comentario/${comentarioId}/`, {
      method: 'DELETE', // Método DELETE para eliminar
      headers: {
        'Authorization': `Token ${token}`, // Agrega el token en los headers
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar el comentario');
    }
  
    return response;
  };
  
  return {
    comentar,
    cargarComentarios,
    eliminarComentario,
  };
}

export default funcionesFoto;

