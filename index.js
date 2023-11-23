const express = require('express');
const cors = require('cors')

const app = express();
const mongodbCore = require('./server/mongo');
const { postLogs, getLogsList, postLogsFailed } = require('./controller/logs');

mongodbCore.initialize();

app.use(cors({
    origin: 'https://logs-analytics-frontend.vercel.app'
}))

app.get('/', function (req, res) {
    res.send('Welocome to MetaKeep API!');
})

app.get('/logs', getLogsList);

app.get(`/api/:userId`, postLogs);
app.get(`/api/:userId/failed`, postLogsFailed);

app.listen(5000, function () {
    console.log('App listening on port 5000!')
});