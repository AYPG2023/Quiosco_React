import { Outlet } from 'react-router-dom';  // Importaciones de librerías externas
import Modal from 'react-modal';  // Importaciones de librerías externas
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';  // Importaciones de componentes internos
import Resumen from '../components/Resumen';
import ModalProducto from '../components/ModalProducto';

import useQuiosco from '../hooks/useQuiosco';  // Importación de hooks personalizados
import { useAuth } from '../hooks/useAuth';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root"); // Para que no de error de accesibilidad

export default function Layout() {

  useAuth({ middleware: 'auth' });
  const { modal, handleClickModal } = useQuiosco();

  return (
    <>
      <div className='md:flex'>
        <Sidebar />
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-5'>
          <Outlet />
        </main>
        <Resumen />
      </div>
      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </Modal>

      <ToastContainer />
    </>

  )
}
