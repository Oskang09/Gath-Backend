const maps = require('@google/maps');
const client = maps.createClient({
    key: process.env.GMAP_APIKEY,
    Promise: Promise,
});

module.exports = client;