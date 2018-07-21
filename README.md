# CodeXpress - Raspberry Pi
Node.js Server for Data Backup.

## Plan
The Raspberry Pi connects to the Internet via the router which will connect the rest of the Arduino devices. This Node.js server will serve as a data backup system so that data is not lost in case of power failure or network failure. The Raspberry Pi's local MongoDB server will have a replicated set of data that the Arduino will attempt to send to the cloud.

## Data Flow
1. The [MQTT server](https://github.com/codexpress-myanmar-hku/mqtt-rpi) recieves data from the Arduino devices. That data is parsed as JSON.
2. The server saves a local entry into the MongoDB database. Then it attempts to send a copy of the data (including the `_id`) to the cloud. The `_id` will help to avoid redundant entries in the cloud database.

## Further Improvements
The data that could not be sent is still stored locally. We need to find an efficient way to cross-verify missing entries and send them to the cloud database so that we can add them to the visualization graph.
