const mongoose = require('mongoose');

const options = {
    autoReconnect:true,
    poolSize:config["MONGO"].POOL_SIZE,
    connectTimeoutMS:3000,
    socketTimeoutMS:25000
};

mongoose.connect(config["MONGO"].HOST, options);
module.exports = mongoose;