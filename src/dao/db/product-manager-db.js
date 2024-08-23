const ProductModel = require("../models/product.model.js");



class ProductManager {

    async addProduct({ title, description, code, price, stock, category, thumbnail }) {
        try {
            if (!title || !description || !code || !price || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existeCodigo = await ProductModel.findOne({ code: code });
            if (existeCodigo) {
                console.log("El codigo debe ser unico");
                return;
            }

            const nuevoProducto = new ProductModel({
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                thumbnail
            });

            await nuevoProducto.save();
        } catch (error) {
            console.log("Error al agregar un producto");
        }

    }

    async getProducts() {
        try {
            const arrayProductos = await ProductModel.find();
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

    }

    async getProductById(id) {
        try {
            const buscado = await ProductModel.findById(id);

            if (!buscado) {
                console.log("producto no encontrado");
                return null;
            }
                console.log("Producto encontrado");
                return buscado;

        } catch (error) {
            console.log("Error al buscar por id", error);
        }
    }


    async updateProduct(id, productoActualizado) {
        try {
            const updateado = await ProductModel.findByIdAndUpdate(id, productoActualizado);

            if(!updateado) {
                console.log("No se encuentra el producto buscado");
                return null;
            }

            return updateado;

        } catch (error) {
            console.log("Tenemos un error al actualizar productos");
        }
    }

    async deleteProduct(id) {
        try {
          const deleteado = await ProductModel.findByIdAndDelete(id);

          if(!deleteado){
            console.log("No existe el producto a eliminar");
            return null;
          }
          return deleteado; 
          
        } catch (error) {
            console.log("Tenemos un error al eliminar productos");
        }
    }

}

module.exports = ProductManager; 