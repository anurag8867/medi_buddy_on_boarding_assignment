const express = require('express');
const config = require('config');
const port = config.get('port');
const { handleError } = require('./helpers/error');
const patientsRoutes = require('./routes/patients');
const session = require('express-session');
var cookieParser = require('cookie-parser');
//This will create the Database via automation if it doesn't exist in mysql'
require('./db/connect');
let app = express();

app.use(session({ secret: 'Shh, its a secret!' }));
app.use(cookieParser());

app.use('/patient', patientsRoutes);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});

app.use((err, req, res, next) => {
    handleError(err, res);
});
