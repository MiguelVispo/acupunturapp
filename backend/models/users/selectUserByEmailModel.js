//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Importamos las funciones de error.
const { invalidCredentialsError } = require('../../services/errorService');

//Función que se conectará a la base de datos u devolverá los datos de un usuario.
const selectUserByEmailModel = async (email) => {
    let connection;
    try {
        connection = await getDb();

        //Localizamos al usuario con el email dado.
        const [users] = await connection.query(
            `SELECT id, password, role FROM users WHERE email = ?`,
            [email]
        );

        //Si no hay ningún usuario con ese email lanzamos un error.
        if (users.length < 1) {
            invalidCredentialsError();
        }

        //Dado que no puede existir más de un usuario con un email determinado, en caso de que en el array de usuarios haya algún usuario, este estará en la posición 0.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailModel;
