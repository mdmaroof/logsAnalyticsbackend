const mongoose = require("mongoose");

exports.initialize = async (res) => {

    const mongoOptions = {
        maxPoolSize: 50,
        minPoolSize: 10,
        socketTimeoutMS: 30000,
        maxIdleTimeMS: 60000
    };
    const dbUri = "mongodb+srv://doadmin:u56KPV298317WiCm@db-mongodb-blr1-90569-d733b9ff.mongo.ondigitalocean.com/metaKeep?tls=true&authSource=admin&replicaSet=db-mongodb-blr1-90569";
    try {
        await mongoose.connect(dbUri, mongoOptions);
        console.log('Connect to MongoDb')
    } catch (error) {
        console.log('error', error)
    }
}