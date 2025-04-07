import { useAuth } from '../hooks/useAuth';
import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';

export default function Sidebar() {
  const { categorias } = useQuiosco();

  const { user, logout } = useAuth({
    middleware: 'auth',
  });

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img className="w-40" src="img/logo.svg" alt="Logo de la empresa" />
      </div>
      <p className='my-10 text-xl text-center'>Hola:{user?.name}</p>
      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>
      <div className='my-5 py-5'>
        <button
          onClick={logout}
          type='button'
          className='bg-red-500 text-center text-white p-3 font-bold truncate w-full hover:bg-red-800'>
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}
