const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mpazrodriguezmedano:coder@cluster0.0jfpw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conectado a la BD"))
.catch(() => console.log("No se conecta a la BD"))