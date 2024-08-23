const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const ProductModel = require("../dao/models/product.model.js");
const manager = new ProductManager();


//http://localhost:8080/api/products?limit=2


router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();
    // router.get("/products", async (req, res) => {
        let page = 1;
        let limit = 2;
    try {
        const listadoProductos = await ProductModel.paginate({}, {limit, page});
        res.render("/products", {
            productos: listadoProductos.docs,
            hasPrevPage: listadoProductos.hasPrevPage,
            hasNextPage: listadoProductos.hasNextPage,
            prevPage: listadoProductos.prevPage,
            nextPage: listadoProductos.nextPage,
            currentPage: listadoProductos.page,
            totalPags: listadoProductos.totalPages
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("No funciona la paginacion");
    }
})


router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);
})



router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(id);

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})




router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await manager.addProduct(nuevoProducto);

        res.status(201).send("Producto agregado exitosamente");
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})


router.put("/:pid", async (req, res) => {
    const actualizarProducto = req.body;
    const id = req.params.pid;

    try {
        await manager.updateProduct(id, productoActualizado);
        res.json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto" })
    }
})


router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        await manager.deleteProduct(id);
        res.json({
            message: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
})


module.exports = router; 