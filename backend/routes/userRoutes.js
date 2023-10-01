//Importamos express y creamos un router.
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras.
const authUserController = require('../middlewares/authUserController')

//Importamos las funciones controladoras finales.
const { 
    newUserController,
    loginUserController,
    editAvatarController 
} = require('../controllers/users');

//Registro de usuario.
router.post('/users/register', newUserController);

//Login de usuario.
router.post('/users/login', loginUserController);

//Editar avatar de usuario.
router.put('users/avatar', authUserController, editAvatarController)

module.exports = router;
