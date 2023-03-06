const {BadRequestError, InternalError} = require('../../../core/ErrorHandler')
const Config = require('../../../database/model/bussiness/config.model')
const {toIranTimeZone} = require('../../../core/persianDate')
const Order = require('../../../database/model/bussiness/order.model')
const Product = require('../../../database/model/bussiness/product.model')
const {InternalErrorResponse} = require('../../../core/ApiResponse')
const {CONFIG_ID} = require('../../../../config')

function calcDistance(lat, lon, location) {
    let shopLat = location.shop_location.lat
    let shopLon = location.shop_location.lon

    shopLon = (shopLon * Math.PI) / 180
    lon = (lon * Math.PI) / 180
    shopLat = (shopLat * Math.PI) / 180
    lat = (lat * Math.PI) / 180

    // Haversine formula
    let dlon = lon - shopLon
    let dlat = lat - shopLat
    let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(shopLat) * Math.cos(lat) * Math.pow(Math.sin(dlon / 2), 2)

    let c = 2 * Math.asin(Math.sqrt(a))

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371

    // calculate the result
    // console.log(lat + " " + lon)
    return c * r
}

function isLocationValid(lat, lon, location) {
    var top = location.top
    var bottom = location.bottom
    var right = location.right
    var left = location.left
    if (
        lat.localeCompare(top.lat) <= 0 &&
        lat.localeCompare(bottom.lat) >= 0 &&
        lon.localeCompare(left.lon) >= 0 &&
        lon.localeCompare(right.lon) <= 0
    )
        return true
    return false
}

async function calcPrice(lat, lon) {
    let price = 0
    let location = await Config.findOne({_id: '617822c0d4978297215a0043'})
    location = location.location
    if (isLocationValid(lat, lon, location)) {
        let distance = calcDistance(lat, lon, location)
        if (String.toString(distance).localeCompare(location.free_distance_unit) <= 0) {
            return price
        }
        price = ((distance - location.free_distance_unit) * location.price_per_unit) / location.unit
        return price
    } else {
        throw new BadRequestError('خارح از محدوده')
    }
}

async function sendPriceCalc(lat, lon) {
    let price = await calcPrice(lat, lon)
    price = Math.ceil(price / 1000) * 1000
    return price
}

async function basketPriceCalc(req) {
    try {
        let priceAfterOff = 0
        let priceBeforeOff = 0
        let sumPackPrice = 0
        const products = await req.body.detail.map(async (requestedProduct) => {
            const foundedProduct = await Product.findById(
                requestedProduct.product,
                async function (err, localProduct) {
                    if (err) {
                        new BadRequestResponse(err.message).send(res)
                    } else {
                        if (localProduct.packprice) {
                            sumPackPrice += parseInt(localProduct.packprice)
                        }
                        const offPercent = localProduct.off_percent
                        const types = await requestedProduct.types.map(async (rtype) => {
                            let local = await localProduct.types.filter(
                                (ltype) => ltype._id == rtype._id,
                            )[0]

                            newType = {}
                            newType.id = rtype._id
                            newType.count = rtype.count
                            newType.size = local.size
                            newType.price = local.price
                            return newType
                        })
                        const alltypes = await Promise.all(types)

                        const priceOfProductAfterOff = await alltypes.map((type) => {
                            const total = type.count * type.price
                            if (offPercent === 0) {
                                return total
                            } else {
                                return total - total * (offPercent / 100)
                            }
                        })

                        const priceOfProductBeforeOff = await alltypes.map((type) => {
                            const total = type.count * type.price
                            return total
                        })

                        const donePriceAfterOff = await Promise.all(priceOfProductAfterOff)
                        const donePriceBeforeOff = await Promise.all(priceOfProductBeforeOff)

                        priceAfterOff += donePriceAfterOff.reduce((a, b) => a + b, 0)
                        priceBeforeOff += donePriceBeforeOff.reduce((a, b) => a + b, 0)
                    }
                },
            )
        })
        const numFruits = await Promise.all(products)
        req.priceAfter = priceAfterOff
        req.priceBefore = priceBeforeOff
        req.packprice = sumPackPrice
    } catch (err) {
        throw new InternalError()
    }
}

async function findOrderByToday(todayDate, filter) {
    let sixAmToday = new Date(Date.now())
    sixAmToday.setHours(6, 0, 0, 0)
    const iranToday = toIranTimeZone(sixAmToday)

    let sixAmYesterday = new Date(Date.now())
    sixAmYesterday.setDate(sixAmYesterday.getDate() - 1)
    sixAmYesterday.setHours(6, 0, 0, 0)
    const iranYesterday = toIranTimeZone(sixAmYesterday)

    let from = ''
    let to = ''
    if (todayDate > sixAmToday) {
        console.log('>')

        from = sixAmToday
        to = Date.now()
    } else {
        console.log('<')

        from = sixAmYesterday
        to = Date.now()
    }

    return Order.find({
        time: {
            $gte: from,
            $lte: to,
        },
        ...filter,
    })
        .lean()
        .exec()
}

async function getFactorNumberOfToday() {
    const config_id = CONFIG_ID
    let today = new Date(Date.now())

    const config = await Config.findOne({_id: config_id})
    let dayOfDB = config.factor.today_date
    dayOfDB = new Date(dayOfDB)
    dayOfDB.setHours(5, 0, 0, 0) // set 5 am to start of day

    let factor_number_db = config.factor.factor_number
    let factor_number

    if (dayOfDB < today) {
        let factor = {today_date: new Date(Date.now()), factor_number: 0}
        const updateDay = await Config.updateOne({_id: config_id}, {factor: factor})
        factor_number = 0
    } else {
        factor_number = factor_number_db + 1
        let factor = {today_date: new Date(Date.now()), factor_number: factor_number}
        const updateDay = await Config.updateOne({_id: config_id}, {factor: factor})
    }
    
    return factor_number
}

async function makeid(length) {
    var result = ''
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = {sendPriceCalc, basketPriceCalc, findOrderByToday, getFactorNumberOfToday, makeid}
