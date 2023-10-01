//Importamos las variables de entorno de nuestro fichero".env".
require('dotenv').config();

//Importamos las dependencias.
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

//Importamos las rutas.
const routes = require('./backend/routes');

//Importamos las funciones controladoras de errores.
const {
    errorController,
    notFoundController,
} = require('./backend/controllers/errors');

//Creamos el servidor.
const app = express();

//Middleware que deserializa un body en formato "raw" creando la propiedad "body" en el objeto request.
app.use(express.json());

//Middleware que deserializa un body en formato "form-data" creando la propiedad "body" y la propiedad files en el objeto request.
app.use(fileUpload());

//Middleware que muestra por consola información de la petición entrante.
app.use(morgan('dev'));

//Middleware que evita problemas con los CORS cuando intentamos conectar el cliente con el servidor.
app.use(cors());

//Middleware que indica a express dónde se encuentran las rutas.
app.use(routes);

//Middleware de ruta no encontrada.
app.use(notFoundController);

//Middleware de error.
// eslint-disable-next no-unused -vars.
app.use(errorController);

//Ponemos el servidor a escuchar peticiones de un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
