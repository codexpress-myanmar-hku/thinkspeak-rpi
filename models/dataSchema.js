let mongoose = require('mongoose');
let config = require('../config');

let dataSchema = new mongoose.Schema({
    soil_temp: {type: Number, required: false},
    soil_moist: {type: Number, required: false},
    temp: {type: Number, required: false},
    humidity: {type: Number, required: false},
    input_current: {type: Number, required: false},
    input_voltage: {type: Number, required: false},
    rssi: {type: Number, required: false},
    sw: {type: Boolean, required: true},
    timestamp: {type: Date, required: true}
});


let options = {
    useNewUrlParser: true,
    autoReconnect: true
};

let db1 = mongoose.createConnection("mongodb+srv://" + config.R_DB_USER + ":" + config.R_DB_PASS + config.R_DB_URL, options);
let db2 = mongoose.createConnection("mongodb://" + config.L_DB_URL, options);

let model1 = db1.model('data', dataSchema);
let model2 = db2.model('data', dataSchema);

module.exports = {
    remote: model1,
    local: model2
};
