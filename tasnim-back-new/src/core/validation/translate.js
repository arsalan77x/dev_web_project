const { validationResult } = require('express-validator')
const fromEntries = require('object.fromentries')
const BadRequestResponse =require('../ApiResponse')
const { NotFoundError, ErrorHandler, BadRequestError } =  require('../../core/ErrorHandler')

const  translateMessages = (errObj, req)=> {
    // Convert the errObj to an Array
    const errArr = Object.entries(errObj)

    // For each array(err), compare the error msg with the polyglot phrases, and replace it.
    errArr.forEach(err => {
        Object.keys(req.polyglot.phrases).forEach(phrase => {
            if (phrase == err[1].msg) {
                err[1].msg = req.polyglot.t(phrase)
            }
        })
    })

    // Return a function that converts the Array to an Object
    return fromEntries(errArr)
}

module.exports= async function validationErrorResponse(req, res, next){

    // Verifies if there were validation errors added to the request
    const validationErrors = validationResult(req)
    // If there were errors in the validation
    if (!validationErrors.isEmpty()) {
        // Return the result of the function below
        const translated=JSON.stringify(translateMessages(validationErrors.mapped()))
        // return res.status(400).send(translateMessages(validationErrors.mapped(), req))
        return ErrorHandler.handle(new BadRequestError(translated));
    } else {
        // If no errors, go!
        next()
    }
}