import { Link } from "react-router-dom"
import { useAuth } from '../hooks/useAuth';

export default function AdminSidebar() {
    const { user, logout } = useAuth({
        middleware: 'auth',
    });
    return (
        <aside className="md:w-72 min-h-screen bg-white shadow">
            <div className="p-4">
                <img src="/img/logo.svg" alt="Imagen del logotipo" className="w-40" />
            </div>

            <nav className="flex flex-col gap-4 p-4">
                <Link to="/admin" className="font-bold text-lg">Ordenes</Link>
                <Link to="/admin/productos" className="font-bold text-lg">Productos</Link>
            </nav>

            <div className="my-5 px-5">
                <button
                    onClick={logout}
                    type='button'
                    aria-label="Cerrar sesión"
                    className='bg-red-500 text-center text-white p-3 font-bold truncate w-full hover:bg-red-800'>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )
}
