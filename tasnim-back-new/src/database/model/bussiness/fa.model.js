
const mongoose = require('mongoose')
const DOCUMENT_NAME = 'Fa';
const COLLECTION_NAME = 'fas';
const Schema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
},
  {
    versionKey: false,
  },
);

module.exports = mongoose.model(DOCUMENT_NAME, Schema, COLLECTION_NAME)
