const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const db = async ()=> {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected:", connect.connection.host, connect.connection.name);
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = db;