//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

const uptdateAvatarModel = async (avatarName, userId) => {
    let connection;
    try {
        connection = await getDb();

        await connection.query(`UPDATE users SET avatar = ?`, [
            avatarName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = uptdateAvatarModel;