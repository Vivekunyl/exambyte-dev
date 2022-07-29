/**
 * @file This file contains MongoDB Schema for MCQ test paper
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const testSchema = new mongoose.Schema({
    title: {
        type: String
    },
    noOfQestions: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdById: {
        type: Schema.Types.ObjectId,
        ref: "NORMALADMINDATA"
    },
    slug: {
        type: String,
        required: true
    },
    questions: [
        {
            question: {
                type: String
            },
            option1: {
                type: String
            },
            option2: {
                type: String
            },
            option3:{
                type:String
            },
            option4:{
                type:String
            },
            answer: {
                type: String
            }
        }
    ]
});


testSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
        })
    }
    next()
});




module.exports = mongoose.model('Test', testSchema);