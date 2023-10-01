//Importamos las variables de entorno de nuestro fichero".env".
require('dotenv').config();

//Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require('./getDb.js');

//Función que borrará las tablas de la base de datos (si existen) y las volverá a crear.

const main = async () => {
    //Variable que almacenará una conexión libre con la base de datos.
    let connection;

    try {
        let connection = await getDb();

        console.log('Borrando Tablas...');

        await connection.query(`DROP TABLE IF EXISTS users`);

        console.log('Creando Tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR (30) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            avatar VARCHAR(100),
            role ENUM('admin', 'normal') DEFAULT 'normal',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        console.log('¡Tablas Creadas!');
        
    } catch (err) {
        console.error(err);
    } finally {
        //Si existe una conexión la liberamos.
        if (connection) connection.release();

        //Finalizamos el proceso.
        process.exit();
    }
};

//Llamamos a la función anterior.
main();
