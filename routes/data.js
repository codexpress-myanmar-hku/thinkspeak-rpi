let express = require('express');
let router = express.Router();
let dataModel = require('../models/dataSchema');

router.post('/', (req, res, next) =>{

    let payload = req.body;
    console.log("INCOMING DATA ENTRY: " + req.body);
    dataModel.local.create({
        soil_temp: payload.soil_temp,
        soil_moist: payload.soil_moist,
        temp: payload.temp,
        humidity: payload.humidity,
        input_current: payload.input_current,
        input_voltage: payload.input_voltage,
        rssi: payload.rssi,
        sw: payload.sw,
        timestamp: new Date()
    }, (err, entry)=> {
        if(err){
            console.log("Error in Local Database",err);
        }
        else{
            console.log("Written to local database", entry);
            dataModel.remote.create({
                _id: entry._id,
                soil_temp: entry.soil_temp,
                soil_moist: entry.soil_moist,
                temp: entry.temp,
                humidity: entry.humidity,
                input_current: entry.input_current,
                input_voltage: entry.input_voltage,
                rssi: entry.rssi,
                sw: entry.sw,
                timestamp: entry.timestamp
            }, (err, entryRemote)=> {
                if(err){
                    console.log("Error in Remote Database",err);
                }
                else{
                    console.log("Written to remote database", entryRemote);
                }
            });
        }
    });

    res.status(200);
    res.send("Done. Check logs for details.");


});

module.exports = router;
