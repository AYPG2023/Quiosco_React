import useSWR from "swr"
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers";
export default function Ordenes() {

    const token = localStorage.getItem("AUTH_TOKEN")
    const fetcher = () => clienteAxios("/api/pedidos", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { data, error, isLoading } = useSWR("/api/pedidos", fetcher, { refreshInterval: 1000 });

    const { handleClickCompletarPedido } = useQuiosco()


    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Hubo un error</p>


    return (
        <div className="grid grid-cols-3">
            <h1 className="text-4xl font-black">Ordenes</h1>
            <p className="text-2xl my-10">
                Administra las ordnes desde aquí.
            </p>

            <div>
                {data.data.data.map(pedido => (
                    <div key={pedido.id} className="bg-white shadow p-5 mb-5 rounded-lg">
                        <p className="text-xl font-bold">Pedido</p>

                        {pedido.productos.map(producto => (
                            <div key={producto.id} className="border-b-slate-200 last-of-type:border-none py-">
                                <p className="text-sm font-bold">id: {producto.id}</p>
                                <p>{producto.nombre}</p>
                                <p>Cantidad: {''} <span className="font-bold">{producto.privot.cantidad}</span></p>
                                <p className="text-lg font-bold">{producto.precio}</p>
                            </div>
                        ))}

                        <p className="text-lg font-bold text-slate-600">
                            Cliente:{''} <span className="font-normal">{pedido.user.name}</span>
                        </p>

                        <p className="text-lg font-bold text-amber-600">
                            Total a pagar:{''} <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                        </p>

                        <button
                            type="button"
                            className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                            onClick={() => handleClickCompletarPedido(pedido.id)}
                        >Completar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
