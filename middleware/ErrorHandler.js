const { constants } = require('../constant');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                strackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                strackTrace: err.stack
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Un-Authorized",
                message: err.message,
                strackTrace: err.stack
            });
            break;
            
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                strackTrace: err.stack
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                strackTrace: err.stack
            });
            break;
        
        default:
            break;
    }
}


module.exports = errorHandler;