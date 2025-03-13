import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { categorias as categoriasDB } from "../data/categorias";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categoriasDB[0] || {});
  const [modal, setModal] = useState(false);  // Asegúrate de que el estado inicial sea falso
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
    setTotal(nuevoTotal);
  }, [pedido]);


  const handleClickCategoria = (id) => {
    const categoria = categorias.find((categoria) => categoria.id === id);
    if (categoria) setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(prevModal => !prevModal);  // Alternar el estado del modal correctamente
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleAgregarProducto = ({ categoria_id, cantidad, ...producto }) => {
    let mensaje = ""; // Variable para el mensaje de notificación

    setPedido((prevPedido) => {
      const existe = prevPedido.find((item) => item.id === producto.id);

      if (existe) {
        // Si el producto ya existe, actualizar su cantidad
        const actualizado = prevPedido.map((item) =>
          item.id === producto.id ? { ...item, cantidad } : item
        );

        mensaje = "Cantidad actualizada en el pedido"; // Mensaje para actualizar
        return actualizado;
      } else {
        // Si el producto no existe, agregarlo al pedido
        const nuevoPedido = [...prevPedido, { ...producto, cantidad }];

        mensaje = "Producto agregado al pedido"; // Mensaje para nuevo producto
        return nuevoPedido;
      }
    });


    // Ejecutar el toast una vez fuera del setPedido
    if (mensaje) {
      toast.success(mensaje, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Funcion para editar la cantidad de un producto
  const handleEditarCantidad = (id) => {
    const productoActualizado = pedido.find(producto => producto.id === id); // Busca el producto en el pedido

    if (productoActualizado) { // Verifica que existe antes de actualizar el estado
      setProducto(productoActualizado);
      setModal(true); // Abre el modal
    } else {
      console.error("Producto no encontrado en el pedido.");
    }
  };

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Eliminando producto.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarProducto,
        handleEditarCantidad,
        handleEliminarProducto,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
