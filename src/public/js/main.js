const socket = io();

socket.on("productos", (data) => {
    // console.log(data);
    renderProductos(data);
})

//"contenedorProductos"

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `  <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.price} </p>
                            <button> ELIMINAR </button>
                            `  
        contenedorProductos.appendChild(card);   
        
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}


// Seleccionar el formulario y los campos
const form = document.getElementById('addProductForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');

// Manejar el envío del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores de los campos
    const title = titleInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;

    // Emitir un evento con los datos del producto
    socket.emit('agregarProducto', {
        title: title,
        description: description,
        price: price
    });

    // Limpiar el formulario
    form.reset();
});

