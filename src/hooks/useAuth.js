import { useEffect } from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url } = {}) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    const navigate = useNavigate();

    const fetchUser = () =>
        clienteAxios
            .get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data.user)
            .catch((error) => {
                throw Error(error?.response?.data?.message || "Error al autenticar");
            });

    const { data: user, error, mutate } = useSWR(token ? "/api/user" : null, fetchUser);

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post("/api/login", datos);
            localStorage.setItem("AUTH_TOKEN", data.token);
            setErrores([]);
            await mutate(); // actualiza el usuario
            navigate("/");
        } catch (error) {
            const erroresRespuesta = error.response?.data?.errors;
            setErrores(erroresRespuesta ? Object.values(erroresRespuesta) : ["Ocurrió un error inesperado"]);
        }
    };

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post("/api/registro", datos);
            localStorage.setItem("AUTH_TOKEN", data.token);
            setErrores([]);
            await mutate(); // Cargar el usuario
            navigate("/"); // 
        } catch (error) {
            const erroresRespuesta = error.response?.data?.errors;
            setErrores(erroresRespuesta ? Object.values(erroresRespuesta) : ["Ocurrió un error inesperado"]);
        }
    };

    const logout = async () => {
        try {
            await clienteAxios.post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("AUTH_TOKEN");
            await mutate(undefined); // Reinicia el usuario en useSWR
            navigate("/auth/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        if (middleware === "guest" && user && url) {
            navigate(url);
        }
        if (middleware === "guest" && user && user.admin) {
            navigate("/admin");
        }

        if (middleware === "admin" && user && !user.admin) {
            navigate("/");
        }

        if (middleware === "auth" && error) {
            navigate("/auth/login");
        }
    }, [user, error]);

    return {
        user,
        login,
        registro,
        logout,
        error,
    };
};
