const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const faultySchema = new mongoose.Schema({
    facultyName:{
        type:String
    },
    facultyDegree:{
        type:String
    },
    facultyExperience:{
        type:Number
    },
    facultyDescription:{
        type:String
    }
},{
    collection:'facultyData'
});

const facultyData = new mongoose.model('facultyData',faultySchema);

module.exports = facultyData;