import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import useQuiosco from '../hooks/useQuiosco'

export default function Layout() {
  const {modal} = useQuiosco();

  return (
    <div className='md:flex'>
      <Sidebar/>
      <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-5'>
        <Outlet/>
        </main>
      <Resumen/>
    </div>
  )
}
