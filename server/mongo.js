const mongoose = require("mongoose");

exports.initialize = async (res) => {

    const mongoOptions = {
        maxPoolSize: 50,
        minPoolSize: 10,
        socketTimeoutMS: 10000,
        maxIdleTimeMS: 60000
    };
    const dbUri = "mongodb+srv://doadmin:kwO3AZ0v1n49M678@db-mongodb-nyc3-61951-f622e3b2.mongo.ondigitalocean.com/metakeep?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-61951";
    try {
        await mongoose.connect(`${dbUri}`, mongoOptions);
        console.log('Connect to MongoDb')
    } catch (error) {
        console.log('error', error)
    }
}