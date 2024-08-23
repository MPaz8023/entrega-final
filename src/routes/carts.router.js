const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.get("/:cid", async (req, res) => {
    const carritoId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(carritoId);
        res.json(carrito.products);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
        res.json(carritoActualizado.products);
    } catch (error) {
        res.status(500).send("Error al ingresar un producto al carrito");
    }
})


module.exports = router; 