const { notFoundError } = require('../../services/errorService');

//Función controladora final que retorna un error 404.
const notFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

module.exports = notFoundController;