const { SuccessResponse } = require('../../../core/ApiResponse');
const CategoryRepo = require('../../../database/repository/CategoryRepo');
const { ErrorHandler } = require('../../../core/ErrorHandler');
const _ = require('lodash');
const paramHelper = require('../../../helper/queryParam.helper');
const mongoose = require('mongoose')
const fileUpload = require('../../../core/fileUpload')
module.exports = {
    parent:
    {
        upload_image: async function (req, res) {
            try {
                const directory = Object.keys(req.files)[0]
                const file_name = await fileUpload(req, res, directory)
                const link = '/files/' + directory + '/' + file_name
                new SuccessResponse('AllSuccess').send(res, { link: link })
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
    }
}