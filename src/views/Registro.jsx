import {Link} from 'react-router-dom'

export default function Registro() {
    return (
        <> {/* Esto se le conoce como fragmet */}
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu cuenta llenado el formulario</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form>
                    {/*Label para el nombre  */}
                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="name" >Nombre:</label>
                        <input type="text" id="name" className="mt-2 w-full p-3 bg-gray-50" name="name" placeholder="Tu nombre" />
                    </div>
                    {/*Label para el email  */}
                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="email" >Email:</label>
                        <input type="email" id="email" className="mt-2 w-full p-3 bg-gray-50" name="email" placeholder="Tu correo" />
                    </div>
                    {/*Label para el contraseña  */}
                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="password" >Contraseña:</label>
                        <input type="password" id="password" className="mt-2 w-full p-3 bg-gray-50" name="password" placeholder="Tu contraseña" />
                    </div>
                    {/*Label para el Repetircontraseña  */}
                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="password_confirmatio" >Repetir contraseña:</label>
                        <input type="password" id="password_confirmatio" className="mt-2 w-full p-3 bg-gray-50" name="password_confirmatio" placeholder="Repite tu contraseña" />
                    </div>

                    <input type="submit" value="Crear cuenta" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"/>
                </form>
            </div>

            <nav className="mt-5">
                        <Link to="/auth/login">¿Ya tienes cuenta? Inicia Sesión</Link>
            </nav>
        </>
    )
}
