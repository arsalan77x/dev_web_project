const { SuccessResponse, BadRequestResponse } = require('../../../core/ApiResponse')
const OrderRepo = require('../../../database/repository/OrderRepo')
const { ErrorHandler } = require('../../../core/ErrorHandler')
const _ = require('lodash')
const paramHelper = require('../../../helper/queryParam.helper')
const mongoose = require('mongoose')
const { sendPriceCalc, basketPriceCalc, getFactorNumberOfToday, makeid } = require('./helper')
const { paymentVerification, paymentRequest } = require('./payment')
const { makePersian } = require('../../../core/persianDate')
const CustomerRepo = require('../../../database/repository/CustomerRepo')
const Order = require('../../../database/model/bussiness/order.model')
const Customer = require('../../../database/model/bussiness/customer.model')

module.exports = {
    order: {
        get_list: async function (req, res) {
            try {
                const params = paramHelper(req)
                let order = await OrderRepo.get_list(params)
                if (params.lang) {
                    order = await makePersian(order, ['time'])

                }

                new SuccessResponse('AllSuccess').send(res, order)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },

        get_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)
                const order = await OrderRepo.get_one(id)

                new SuccessResponse('AllSuccess').send(res, order)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        create_one: async function (req, res, next) {
            try {
                // new SuccessResponse('AllSuccess').send(res, "ordernew")

                basketPriceCalc(req)
                //find customer mobile
                let sendPrice = 0
                if (req.body.deliver_type == "ارسال" && req.body.address?.latitude && req.body.address?.longitude)
                    sendPrice = await sendPriceCalc(
                        req.body.address.latitude,
                        req.body.address.longitude,
                    )
                let finalPriceToPay = +req.priceAfter + +req.packprice + +sendPrice
                const customer = await Customer.findById(req.body.customer_id)
                let zarrinResponse = ''
                let state = ''
                let isOfflinePay = false
                if (req.body.pay_type === 'online') {
                    zarrinResponse = await paymentRequest(
                        req.body.caption || 'new shop!',
                        'rezayazdian97@gmail.com',
                        customer.phone,
                        finalPriceToPay,
                    )
                    state = 'پرداخت ناموفق'
                } else if (req.body.pay_type === 'offline') {
                    state = 'پرداخت حضوری'
                    isOfflinePay = true
                }
                const factorNum = await getFactorNumberOfToday()
                const factorId = await makeid(5)
                const order = new Order({
                    customer_id: req.body.customer_id,
                    product_id: req.body.product_id,
                    time: Date.now(),
                    detail: req.body.detail,
                    customer_name: customer.name,
                    customer_phone: customer.phone,
                    off_percent: req.body.off_percent,
                    address: req.body.address,
                    state: state,
                    caption: req.body.caption,
                    deliver_type: req.body.deliver_type,
                    price: req.priceBefore,
                    send_price: sendPrice,
                    packprice: req.packprice,
                    final_price_pay: finalPriceToPay,
                    pay_type: req.body.pay_type,
                    price_after_off: req.priceAfter,
                    pay_authority: zarrinResponse.authority,
                    factor_number: factorNum,
                    factor_id: factorNum + factorId,
                })
                const ordernew = await OrderRepo.create_one(order)
                // new SuccessResponse('AllSuccess').send(res, ordernew)

                if (zarrinResponse.status === 100) {
                    new SuccessResponse().send(res, { url: zarrinResponse.url })
                } else if (isOfflinePay) {
                    new SuccessResponse().send(res, { message: 'offline' })
                } else new BadRequestResponse().send(res, { pay: zarrinResponse })
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        pay_verification: async function (req, res) {
            try {
                const authority = req.query.Authority
                let order = await OrderRepo.get_list({ filter: { pay_authority: authority } })
                order = order[0]
                const peyVerificResponse = await paymentVerification(
                    order.price_after_off,
                    order.pay_authority,
                )

                if (peyVerificResponse.status === 100) {
                    order.ref_id = peyVerificResponse.RefID
                    order.state = 'ثبت سفارش موفق'
                    order.save()
                    sendOrderEmail(order)
                }

                res.redirect('https://bastanitarasht.ir/profile/buyHistory')
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        update_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)

                let newData = req.body
                if (newData.is_print) {
                    newData = { ...newData, $inc: { print_time: +1 } }
                }
                console.log(newData)
                const order = await OrderRepo.update_one(id, newData)
                new SuccessResponse('AllSuccess').send(res, order)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },

        delete_one: async function (req, res) {
            try {
                const id = mongoose.Types.ObjectId(req.params.id)
                const order = await OrderRepo.delete_one(id)
                new SuccessResponse('AllSuccess').send(res, order)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        delete_list: async function (req, res) {
            try {
                const params = paramHelper(req)
                const order_ids = params.filter['order_ids']
                const orders = await OrderRepo.delete_list(order_ids)
                new SuccessResponse('AllSuccess').send(res, orders)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        send_price: async function (req, res) {
            try {
                customer = await CustomerRepo.get_one(req.params.cid)
                var address = await customer.address.filter(item => item._id == req.params.aid)[0]
                console.log(address)
                var sendPrice = await sendPriceCalc(address.latitude, address.longitude)
                var response = { send_price: sendPrice }
                new SuccessResponse('AllSuccess').send(res, response)
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },
        get_customer_order: async function (req, res) {
            try {
                const params = paramHelper(req)
                if (params.filter && params.filter._id) {
                    params.filter._id = mongoose.Types.ObjectId(params.filter._id)
                }

                const cid = mongoose.Types.ObjectId(req.params.cid)
                if (!params.filter) {
                    params.filter = {}
                }
                params.filter.customer_id = cid

                let order = await OrderRepo.get_list(params)
                var response = await makePersian(order, ['time'])

                new SuccessResponse().send(res, response);
            } catch (error) {
                ErrorHandler.handle(error, res)
            }
        },

    },
}