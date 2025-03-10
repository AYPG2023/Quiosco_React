import { productos as data } from '../data/productos';
import Producto from '../components/Producto';
import useQuiosco from '../hooks/useQuiosco';

export default function Inicio() {
  const { categoriaActual } = useQuiosco();

  // Filtrar productos que pertenecen a la categoría actual
  const productos = data.filter(producto => producto.categoria_id === categoriaActual?.id);

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-5xl font-extrabold text-gray-900">{categoriaActual?.nombre}</h1>
        <p className="text-lg text-gray-700 mt-2">✨ Elige y personaliza tu pedido a continuación. ✨</p>
      </div>

      {productos.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </>
  );
}
