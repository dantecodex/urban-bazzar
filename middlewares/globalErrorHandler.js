import customError from "../utils/customError.js"

const devError = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error
    })
}

const validationErrorHandler = (error) => {
    return new customError(error.message, 400)
}

const duplicateKeyErrorHandler = (error) => {
    return new customError(`${Object.keys(error.keyValue)} with given '${Object.values(error.keyValue)}' already exist`, 400)
}

const prodError = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).send(error.message)
    }
    else {
        res.status(500).json({
            status: "Error",
            message: "Something went wrong in porduction Envi"
        })
    }
}

const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    if (process.env.ENVI === 'dev') {
        devError(error, res)
    }
    if (process.env.ENVI === 'prod') {
        if (error.name === 'ValidationError')
            error = validationErrorHandler(error)
        if (error.code === 11000)
            error = duplicateKeyErrorHandler(error)
        prodError(error, res)
    }
}

export default globalErrorHandler