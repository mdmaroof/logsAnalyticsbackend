const mongoose = require('mongoose');

const logsSchema = mongoose.Schema(
    {
        userId: String,
        timestamp: { type: Date, default: Date.now },
        status: String,
        errorMessage: String,
        request: Object,
        response: Object,
    },
    {
        collection: "logs"
    },
)

logsSchema.index({ timestamp: 1, userId: 1 });

const logsModel = mongoose.model('logs', logsSchema);

exports.getAllLogs = async (filter) => {
    const sort = { 'timestamp': -1 }
    let response = await logsModel.find(filter).sort(sort);
    return response;
}
exports.insertLogs = async (data) => {
    let response = await logsModel.create(data)
    return response;
}
exports.countFailedApi = async (filter) => {
    let response = await logsModel.find({ ...filter, status: 'failed' }).countDocuments()
    return response;
}
exports.countTotalUserUnqiue = async (filter) => {
    let response = await logsModel.find(filter).distinct('userId')
    return response.length;
}
exports.countTotalAPICall = async (filter) => {
    let response = await logsModel.find(filter).countDocuments()
    return response;
}