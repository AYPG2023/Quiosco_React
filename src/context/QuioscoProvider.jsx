import { createContext, useState } from "react";
import { categorias as categoriasDB } from "../data/categorias";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categoriasDB[0] || {}); // Se asegura que no sea undefined
  const [modal, setModal] = useState(false); // Se asegura que no sea undefined

  const handleClickCategoria = (id) => {
    const categoria = categorias.find((categoria) => categoria.id === id);
    if (categoria) setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(!modal);  // Cambia el estado de modal a su valor contrario
  }

  return (
    <QuioscoContext.Provider value={{ categorias, categoriaActual, handleClickCategoria, modal, handleClickModal }}>
      {children}
    </QuioscoContext.Provider>
  );
};

// Exportaciones corregidas
export { QuioscoProvider };
export default QuioscoContext;
