//Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const uptdateAvatarModel = require('../../models/users/updateAvatarModel');

//Importamos las funciones que me permiten guardar y  eliminar fotos del disco.
const deletePhoto = require('../../utils/deletePhoto');
const savePhoto = require('../../utils/savePhoto');

//Importamos las funciones de error.
const { missingFieldsError } = require('../../services/errorService');


//Función controladora final que edita el avatar de un usuario.
const editAvatarController = async (req, res, next) => {
    try {
        //Si no existe avatar lanzamos un error. Indicamos con la interrogación que 'files' puede ser undefined para evitar errores.
        if (!req.files?.avatar) {
            missingFieldsError();
        }

        //Obtener los datos del usuario para ver si tiene un avatar previo.
        const user = await selectUserByIdModel(req.user.id);

        //Si el usuario tiene un avatar asignado lo eliminamos de la carpeta 'uploads'.
        if (user.avatar) {
            await deletePhoto(user.avatar);

        }

        //Variable dónde almacenamos el nombre con el que vamos a guardar el avatar en la carpeta 'uploads'.
        const avatarName = await savePhoto(req.files.avatar, 150);

        //Actualizamos el avatar del usuario en la base de datos.
        await uptdateAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editAvatarController;
