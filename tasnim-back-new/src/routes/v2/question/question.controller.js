const { SuccessResponse } = require('../../../core/ApiResponse');
const QuestionRepo = require('../../../database/repository/QuestionRepo');
const { ErrorHandler } = require('../../../core/ErrorHandler');
const _ = require('lodash');
const paramHelper = require('../../../helper/queryParam.helper');
const mongoose = require('mongoose')

module.exports = {
    question:
    {
     
        get_list: async function (req, res) {
            try {
                const params = paramHelper(req)
                const question = await QuestionRepo.get_list(params);

                new SuccessResponse('AllSuccess').send(res, question);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        get_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)
                const question = await QuestionRepo.get_one(id);

                new SuccessResponse('AllSuccess').send(res, question);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }

        },
        create_one: async function (req, res) {
            try {
                const newData = req.body
                const question = await QuestionRepo.create_one(newData);
                new SuccessResponse('AllSuccess').send(res, question);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        update_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)

                const newData = req.body
                const question = await QuestionRepo.update_one(id, newData);
                new SuccessResponse('AllSuccess').send(res, question);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },

        delete_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)
                const question = await QuestionRepo.delete_one(id);
                new SuccessResponse('AllSuccess').send(res, question);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        delete_list: async function (req, res) {
            try {
                const params = paramHelper(req)
                const question_ids = (params.filter["question_ids"])
                const questions = await QuestionRepo.delete_list(question_ids);
                new SuccessResponse('AllSuccess').send(res, questions);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        }
    }
}