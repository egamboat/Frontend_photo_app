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


  return {
    comentar,
  };
}

export default funcionesFoto;

