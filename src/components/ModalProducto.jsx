import { useState, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function ModalProducto() {
    const { producto, handleClickModal, handleAgregarProducto, pedido} = useQuiosco();
    const [cantidad, setCantidad] = useState(1); 
    const [edicion, setEdicion] = useState(false); 

    useEffect(() => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0];
            setCantidad(productoEdicion.cantidad);
            setEdicion(true);
        }
    }, [pedido]);

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <img src={`/img/${producto.imagen}.jpg`} alt={`Imagen del producto ${producto.nombre}`} />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-center">{producto.nombre}</h1>
                <p className="mt-5 text-5xl font-black text-amber-500 text-center">
                    {formatearDinero(producto.precio)}
                </p>

                {/* Agregar un input para la cantidad */}
                <div className="flex justify-center gap-4 mt-5">
                    {/* Botón de disminuir cantidad */}
                    <button
                        type="button"
                        onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <p className="text-3xl">{cantidad}</p>

                    {/* Botón de aumentar cantidad (Máximo 5) */}
                    <button
                        type="button"
                        onClick={() => { if (cantidad < 5)  setCantidad(cantidad + 1) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>


                {/* Botón para agregar al carrito */}
                <button
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {handleAgregarProducto({ ...producto, cantidad })
                    handleClickModal()
                }} // Agregar la cantidad al producto
                    
                >
                    {edicion ? 'Guardar cambios' : 'Agregar al carrito'}
                </button>
            </div>
        </div>
    );
}
