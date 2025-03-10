import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';

export default function Sidebar() {
  const { categorias } = useQuiosco();
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img className="w-40" src="img/logo.svg" alt="Logo de la empresa" />
      </div>
      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria
            key={categoria.id} // Agrega una key única
            categoria={categoria}
          />
        ))}
      </div>
      <div className='my-5 py-5'>
        <button type='button' className='bg-red-500 text-center text-white p-3 font-bold trucate w-full hover:bg-red-800'>
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}