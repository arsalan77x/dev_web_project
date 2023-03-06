const ApiKeyRepo = require('../database/repository/ApiKeyRepo');
const { ForbiddenError } = require('../core/ErrorHandler');
const Logger = require('../core/Logger');
const express = require('express');
const router = express.Router();
const { validator, ValidationSource } = require('../core/validation/validator');
const schema = require('./schema');


module.exports = router.use(
    validator(schema.apiKey, ValidationSource.HEADER),
    async (req, res, next) => {
        // req.apiKey = req.headers['x-api-key'].toString();
        // console.log(req.apiKey)
        // const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
        // // Logger.info(apiKey);
        // if (!apiKey) next(new ForbiddenError('PermissionDenied'));
        return next();
    })