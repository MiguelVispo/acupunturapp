//Importamos los modelos.
const insertUserModel = require('../../models/users/insertUserModel');


//Importamos los errores.
const { missingFieldsError } = require('../../services/errorService');

//Función controladora final que inserta un nuevo usuario.
const newUserController = async (req, res, next) => {
    try {
        //Importamos los datos del body.
        const { username, email, password } = req.body;

        //Si falta algún campo lanzamos error.
        if (!username || !email || !password) {
            missingFieldsError()
        }

        //Insertamos el usuario.
        await insertUserModel(username, email, password);

        res.send({
            status: 'Ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;
