const Question = require('../model/bussiness/fa.model');
const { InternalError, NoEntryError, NoDataError } = require('../../core/ErrorHandler');
const paramHelper = require('../../helper/queryParam.helper');
const aggregateManager = require('../../helper/aggregateMaker.helper');
const whatToUpdate = require('../../helper/whatToUpdate.helper')
const _ = require('lodash');
const mongoose = require('mongoose')


module.exports = class QuestionRepo {



    static async get_list(params) {
        const aggregate = aggregateManager(params,
            []
        )
        let data = await Question.aggregate(aggregate)
        data.count= await Question.countDocuments()

        return data
    }

    static async get_one(id) {
        let data = await Question.findById(id)
        if (data == null) throw new NoDataError()
        return data
    }

    static async update_one(id, newData) {
        const question = await Question.findOneAndUpdate({ _id: id }, newData, { returnOriginal: false })
        return question

    }

    static async create_one(data) {
        const question = new Question({
            title: data.title,
            caption: data.caption,
            link: data.link,
            pic_url: data.pic_url
        })
        const newQuestion = await question.save()
        return newQuestion
    }

    static async delete_one(id) {
        const question = await Question.deleteOne({ _id: id })
        return this.get_list()


    }

    static async delete_list(ids) {
        ids.map(id => {
            this.delete_one(id)
        })

        return this.get_list()

    }
}
