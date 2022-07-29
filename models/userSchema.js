/**
 * @file This file contains MongoDB schema for normal user
 */


/**
 * @imports module
 * @const
 */
const mongoose = require('mongoose');
/**
 * @imports module
 * @const
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema

/**
 * Mongoose Schema for User
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contactNo: {
        type: Number,
        require: true
    },
    class:{
        type:Number
    },
    about:{
        type:String
    },
    connect:{
        type:String
    },
    tests: [{
        test: {
            type: Schema.Types.ObjectId,
            ref: 'Test'
        },
        marksScored: {
            type: Number
        }
    }
    ],
    points: {
        type: Number,
        default: 0
    },
    courses:[{
        course:{type:String},
        coursePayment:{type: String, default:false},
        course_id:{type:Number}
    }],
    password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    check:{
        type:String,
        default:"false"
    },
    followers: [{ type: Schema.Types.ObjectId }],
    following: [{ type: Schema.Types.ObjectId }],
    bookmarks: [{ type: Schema.Types.ObjectId }],
}, {
    collection: 'userData'
});


//Hashing the password
/**
 * @params {method}
 * @async
 */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


//generating Token

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


const user = mongoose.model('USERDATA', userSchema);
/**
 * @exports {mongoose.model}
 */
module.exports = user;