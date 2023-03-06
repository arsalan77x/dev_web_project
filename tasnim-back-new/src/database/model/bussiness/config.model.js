const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Config';
const COLLECTION_NAME = 'configs';

const FactorSchema = new mongoose.Schema({
    today_date: {
        type: Date,
        required: false,
    },
    factor_number: {
        type: Number,
        required: false,
    }
})

const PositionSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        required: true,
    }
})

const LocationSchema = new mongoose.Schema({
    shop_location: {
        type: { PositionSchema },
        required: true,
        default: { lat: "34.67456803391187", lon: "50.87393486171505" }
    },
    top: {
        type: { PositionSchema },
        required: true,
        default: {
            lat: "34.686048538476406",
            lon: "50.87219757373365"
        }
    },
    bottom: {
        type: { PositionSchema },
        required: true,
        default: {
            lat: "34.5969730794299",
            lon: "50.880879511559705"
        }
    },
    right: {
        type: { PositionSchema },
        required: true,
        default: {
            lat: "34.64950556309895",
            lon: "50.922501742902185"
        }
    },
    left: {
        type: { PositionSchema },
        required: true,
        default: {
            lat: "34.661478313048",
            lon: "50.827766480153336"
        }
    },
    unit: {
        type: Number,
        required: true,
        default: 1
    },
    price_per_unit: {
        type: Number,
        required: true,
        default: 1000
    },
    free_distance_unit: {
        type: Number,
        required: true,
        default: 1
    },
    free_send_on_price: {
        type: Number,
        required: true,
        default: 150000
    },
    order_time_from: {
        type: Number,
        required: true,
        default: 1030
    },
    order_time_to: {
        type: Number,
        required: true,
        default: 2400
    },
    versionKey: false
});

const Schema = new mongoose.Schema({
    location: {
        type: { LocationSchema },
        required: true,
    },
    factor: {
        type: { FactorSchema },
        required: true,
    },
},
    {
        versionKey: false,
    },
);
module.exports = mongoose.model(DOCUMENT_NAME, Schema, COLLECTION_NAME)
