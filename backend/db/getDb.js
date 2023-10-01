//Importamos las dependencias. CommonJS
const mysql = require('mysql2/promise');

//Obtenemos las variables de entorno necesarios mediante destructuring.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env;

//Variable que almacenará un grupo de conexiones.
let pool;

//Función que retorna una conexión libre con la base datos.
const getDb = async () => {
    try {
        //Si la variable "pool" es undefined.
        if (!pool) {
            //Creamos conexión con el servidor MySQL.
            const connection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                timezone: 'Z',
            });

            //Creamos la base de datos si no existe.
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            //Creamos el grupo de conexiones.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        //Retornamos una conexión libre.
        return await pool.getConnection();
    } catch (err) {
        console.log(err);
    }
};

//Exportamos la función anterior.
module.exports = getDb;
