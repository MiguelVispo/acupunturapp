//Importamos las dependencias.
const bcrypt = require('bcrypt');

//Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require('../../db/getDb');

//Importamos los errores.
const {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} = require('../../services/errorService');

//Función que se conectará a la base de datos y creará un usuario.
const insertUserModel = async (username, email, password) => {
    let connection;

    try {
        connection = await getDb();

        //Buscamos en la base de datos algún usuario con ese email.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        //Si existe un usuario con ese email lanzamos error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        //Buscamos en la base de datos algún usuario con ese nombre.
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        //Si existe un usuario con ese nombre lanzamos error.
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        //Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creamos el usuario.
        await connection.query(
            `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
            [email, username, hashedPassword]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
