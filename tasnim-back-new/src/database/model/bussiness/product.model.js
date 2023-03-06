
const mongoose = require('mongoose')
const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'products';

const typeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  code: {
    type: Number,
  },
  count: {
    type: Number,
    default: 0,
    required: false
  }

});
const tasteSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  }

});

const Schema = new mongoose.Schema({

  name: {
    type: String,
    required: false
  },
  caption: {
    type: String,
    required: false
  },
  code: {
    type: String,
    required: false
  },
  ishidden: {
    type: Boolean,
    required: false,
    default: false
  },
  donthave: {
    type: Boolean,
    required: false,
    default: false
  },
  order: {
    type: Number,
    required: false
  },
  types: {
    type: [typeSchema],
    required: false,
  },
  taste_count: {
    type: Number,
    required: false,
  },
  tastes: {
    type: [tasteSchema],
    required: false,
  },
  price: {
    type: Number,
    required: false
  },
  packprice: {
    type: Number,
    required: false
  },
  off_percent: {
    type: Number,
    default: 0,
    required: false
  },
  off_start_time: {
    type: String,
    required: false
  },
  off_end_time: {
    type: String,
    required: false
  },
  star: {
    type: Number,
    required: false
  },
  daily_offer: {
    type: Boolean,
    required: false
  },
  daily_off: {
    type: Boolean,
    required: false
  },
  materials: {
    type: String,
    required: false
  },
  pic_url: {
    type: String,
    required: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: false
  },
},
  {
    versionKey: false,
  },
);


module.exports = mongoose.model(DOCUMENT_NAME, Schema, COLLECTION_NAME)
