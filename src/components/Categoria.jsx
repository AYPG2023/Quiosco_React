import useQuiosco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
  const { handleClickCategoria, categoriaActual } = useQuiosco();
  const { icono, id, nombre } = categoria;

  return (
    <div
      className={`flex items-center gap-4 border w-full p-3 cursor-pointer 
      ${categoriaActual?.id === id ? "bg-amber-400" : "bg-white"} hover:bg-amber-400`}
      onClick={() => handleClickCategoria(id)} // Se movió el onClick aquí
    >
      <img
        src={`/img/icono_${icono}.svg`}
        alt={`Icono de ${nombre}`}
        className="w-12"
      />
      <button className="text-lg font-bold cursor-pointer truncate" type="button">
        {nombre}
      </button>
    </div>
  );
}
