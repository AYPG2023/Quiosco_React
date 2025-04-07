import axios from "axios";

const clienteAxios = axios.create({

    baseURL: import.meta.env.VITE_API_URL,
    // Funciona para el backend de Laravel 
    // para aceptar las peticiones de la API 
    headers: {
        "Accept": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,

});

export default clienteAxios;
