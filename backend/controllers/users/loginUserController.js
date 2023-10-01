//Importamos las dependencias.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Importamos los modelos.
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');

//Importamos las funciones de error.
const {
    missingFieldsError,
    invalidCredentialsError,
} = require('../../services/errorService');

//Función controladora final que loguea a un usuario.
const loginUserController = async (req, res, next) => {
    try {
        //Obtenemos los datos necesarios del body.
        const { email, password } = req.body;

        //Si falta algún campo lanzamos error.
        if (!email || !password) {
            missingFieldsError();
        }

        //Obetenemos los datos del usuario.
        const user = await selectUserByEmailModel(email);

        //Comprobamos si la contraseña que ha insertado el usuario es correcta.
        const validPassword = await bcrypt.compare(password, user.password);

        //Si la contraseña no coincide lanzamos un error.
        if (!validPassword) {
            invalidCredentialsError();
        }

        //Generamos un objeto con la información que queramos agregar al token.
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        // Generamos el token.
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUserController;
