import { formatearDinero } from "../helpers";
import { useAuth } from "../hooks/useAuth";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = e => {
    e.preventDefault();

    handleSubmitNuevaOrden(logout);
  }

  return (
    <aside className="w-72 h-screen overflow-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      <p className="text-lg my-5">
        Aquí se mostrarán los productos que has seleccionado y la cantidad de cada uno.
      </p>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay productos seleccionados</p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </div>

      {/* Total del pedido */}
      <p className="text-xl mt-10">
        Total: {''}
        {formatearDinero(total)}
      </p>

      <form
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            type="submit"
            className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
            value="Confirmar pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  );
}
