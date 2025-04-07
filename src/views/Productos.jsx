import useSWR from "swr";
import clienteAxios from "../config/axios";
import Producto from "../components/Producto";

export default function Productos() {
    const token = localStorage.getItem("AUTH_TOKEN");

    const fetcher = () =>
        clienteAxios("/api/productos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.data);

    const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
        refreshInterval: 1000,
    });

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Hubo un error</p>;

    return (
        <div>
            <h1 className="text-4xl font-black">Productos</h1>
            <p className="text-2xl my-10">
                Administra la disponibilidad de los Productos acá.
            </p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.data.map((producto) => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </div>
    );
}
