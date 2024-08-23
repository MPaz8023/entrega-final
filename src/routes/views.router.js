const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const manager = new ProductManager("");
const ProductModel = require("../dao/models/product.model.js")



//ruta products

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

    // res.render("home", {productos});
// })

//punto 2. mostrar los productos en tiempo real con form para agregar y boton de eliminar


router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})


module.exports = router;