import { toast } from 'react-toastify';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

interface LoginUserParams {
    username: string;
    password: string;
}
const Usuario = () => {

    const loginUser = async ({ username, password }: LoginUserParams): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/usuario/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 404) {
                    throw new Error('Usuario no encontrado.');
                } else if (response.status === 400) {
                    throw new Error(errorData.error || 'Credenciales inválidas.');
                } else {
                    throw new Error('Ocurrió un error.');
                }
            }

            const data: LoginResponse = await response.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user.id);

            console.log("Sesión Iniciada");
            toast('Sesión Iniciada.')
            return data;
        } catch (error) {
            console.log(error);

            const errorMessage = (error as Error).message || 'Error desconocido';
            toast.error(errorMessage);

            throw error;
        }
    };

    return {
        loginUser,
    };

}

export default Usuario
