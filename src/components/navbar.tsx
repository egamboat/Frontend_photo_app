"use client";

import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';

const Navbar = () => {
    const [haveToken, setHaveToken] = useState<any>()

    const iniciarSesion = () => {
        window.location.href = '/usuario/iniciar_sesion';
    }

    const subirFoto = () => {
        window.location.href = '/foto/crear';
    };

    const handleLogout = async () => {
        setHaveToken(localStorage.getItem('token'))

        if (haveToken) {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/usuario/logout/`, {}, {
                    headers: {
                        'Authorization': `Token ${haveToken}`
                    }
                });

                localStorage.removeItem('token');

                window.location.href = '/usuario/iniciar_sesion';
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        } else {
            window.location.href = '/usuario/iniciar_sesion';
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setHaveToken(token);
        }
    })
    return (
        <>
            <nav className="bg-white border border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            U-Foto
                        </span>
                    </a>

                    {/* <div className="flex items-center">
                        <button
                            id="menu-toggle"
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button> 
                    </div>*/}

                    <div
                        className="w-full md:block md:w-auto hidden"
                        id="mobile-menu"
                    >
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            {(haveToken) ? (
                                <li>
                                    <button
                                        onClick={subirFoto}
                                        className="block rounded border py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Subir Foto
                                    </button>
                                </li>
                            ) : null}
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                {(haveToken) ? (
                                    <button
                                        onClick={handleLogout}
                                        className="block p-4 text-black text-[1rem] hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    ><span>
                                        <i className="ri-logout-box-line"></i>
                                    </span>
                                    </button>
                                ) :
                                    (<button
                                        onClick={iniciarSesion}
                                        className="block py-2 pr-4 pl-3 text-black hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Iniciar Sesión
                                    </button>
                                    )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar