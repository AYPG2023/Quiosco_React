import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({ producto, botonAgregar = true, botonDisponible = false }) {
  const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco();
  const { id, nombre, precio, imagen } = producto;

  return (
    <div className="border p-3 shadow bg-white">
      <img
        src={`/img/${imagen}.jpg`}
        alt={`imagen de ${nombre}`}
        className="w-full"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

        {botonAgregar && (
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
              handleSetProducto(producto);
              handleClickModal();
            }}
          >
            Agregar al carrito
          </button>
        )}

        {botonDisponible && (
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => handleClickProductoAgotado(producto.id)}
          >
            Producto agotado
          </button>
        )}
      </div>
    </div>
  );
}
