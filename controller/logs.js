const { getAllLogs, insertLogs, countTotalUserUnqiue, countFailedApi, countTotalAPICall } = require("../model/logs");

exports.getLogsList = async (req, res) => {
    let response;

    const { last24HoursFilter, last7daysFilter, fromDate, toDate } = req.query;

    let filter = {};
    const currentTime = new Date();
    if (last24HoursFilter) {
        const timestamp = new Date(currentTime - 24 * 60 * 60 * 1000);
        filter['timestamp'] = { $gte: timestamp };
    }
    if (last7daysFilter) {
        const timestamp = new Date(currentTime - 7 * (24 * 60 * 60 * 1000));
        filter['timestamp'] = { $gte: timestamp };
    }

    if (fromDate && toDate) {
        const timestamp = {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        }
        filter['timestamp'] = timestamp;
    }


    try {
        response = await getAllLogs(filter);
        const totalUserUnique = await countTotalUserUnqiue(filter);
        const totalFailedApi = await countFailedApi(filter);
        const totalApi = await countTotalAPICall(filter);
        res.status(200).send({ payload: { response, totalUserUnique, totalFailedApi, totalApi } });
    }
    catch (err) {
        console.log(err)
        return
    }
}

exports.postLogs = async (req, res) => {
    const { params } = req;

    let payload = {
        userId: params.userId,
        status: 'success',
        request: { request: {} },
        response: { response: {} },
    }
    let response;
    try {
        response = await insertLogs(payload);
        res.status(200).send({ message: 'Hello World' });
    }
    catch (err) {
        payload = { ...payload, status: 'failed', errorMessage: 'Error' }
        response = await insertLogs(payload);
        res.status(400).send({ message: 'Error' });
    }
}

exports.postLogsFailed = async (req, res) => {
    const { params } = req;

    let payload = {
        userId: params.userId,
        status: 'success',
        request: { request: {} },
        response: { response: {} },
    }
    let response;
    try {
        throw new Error('Error')
    }
    catch (err) {
        payload = { ...payload, status: 'failed', errorMessage: 'Error' }
        response = await insertLogs(payload);
        res.status(400).send({ message: 'Error' });
    }
}