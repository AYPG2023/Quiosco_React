import { use, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errores, setErrores] = useState([]);

  const { login } = useAuth({ middleware: 'guest', url: '/login' });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,

    }

    login(datos, setErrores);
  }

  return (
    <> {/* Esto se le conoce como fragmet */}
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {errores.length > 0 && errores.map((error, index) => (
            <Alerta key={index}>{error}</Alerta>
          ))}
          {/*Label para el email  */}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email" >Email:</label>
            <input type="email" id="email" className="mt-2 w-full p-3 bg-gray-50" name="email" placeholder="Tu correo" ref={emailRef} />
          </div>
          {/*Label para el contraseña  */}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password" >Contraseña:</label>
            <input type="password" id="password" className="mt-2 w-full p-3 bg-gray-50" name="password" placeholder="Tu contraseña" ref={passwordRef} />
          </div>
          <input type="submit" value="Iniciar sesión" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md" />
        </form>
      </div>

      <nav className="mt-5">


        <Link to="/auth/registro" >Crear cuenta</Link>

      </nav>
    </>
  )
}
