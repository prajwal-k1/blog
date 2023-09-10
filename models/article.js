const mongoose = require('mongoose')
const marked = require('marked')

const articleSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)