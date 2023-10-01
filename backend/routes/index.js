//Importamos express y creamos un router.
const express = require('express');
const router = express.Router();

//Importamos las rutas.
const userRoutes = require('./userRoutes');

//Middleware que indica a express dónde se encuentran las rutas de los usuarios.
router.use(userRoutes);

module.exports = router;
