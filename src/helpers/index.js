export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}  // Exporta la función formatearDinero
// funciona para poder formatear el precio de los productos en la vista de Inicio.jsx.