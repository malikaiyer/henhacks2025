const mongoose = require('mongoose');
//const { type } = require('os');



const locationSchema = new mongoose.Schema({
    "tags": {type: [String], required: true},
    "name": {type: String, required: true},
    "coords": {type: [Number], required: true}, 
    "location": {type: String, required: true},
    "type": {type: String, required: true},
    "descr": {type: String, required: true}
}, {timeStamps: true});

module.exports = mongoose.model('Location', locationSchema);