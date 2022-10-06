const express = require('express'),
    patientsService = require('../services/patients');
const { query, body, check, validationResult } = require('express-validator');
const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.post(
    '/',
    [
        check('name').exists().notEmpty(),
        body('age').exists().isInt().notEmpty(),
        body('gender').exists().isIn(['male', 'female']).notEmpty(),
        body('walletAmount').exists().isInt().notEmpty()
    ],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send({ error: err.errors });
        } else {
            let resp = await patientsService.addPatient(req.body);
            return res.status((resp && resp.status) || 200).send({ resp });
        }
    }
);

app.get(
    '/',
    [query('walletAmount').exists().isInt().notEmpty()],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send({ error: err.errors });
        } else {
            let resp = await patientsService.getPatient(req.query);
            return res.status((resp && resp.status) || 200).send({ resp });
        }
    }
);

app.get('/session', async (req, res) => {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send('You visited this page ' + req.session.page_views + ' times');
    } else {
        req.session.page_views = 1;
        res.send('Welcome to this page for the first time!');
    }
});

app.put(
    '/',
    [
        body('id').exists().notEmpty(),
        body('name').exists().notEmpty(),
        body('age').exists().isInt().notEmpty(),
        body('gender').exists().isIn(['male', 'female']).notEmpty(),
        body('walletAmount').exists().isInt().notEmpty()
    ],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send({ error: err.errors });
        } else {
            let resp = await patientsService.updatePatient(req.body);
            return res.status((resp && resp.status) || 200).send({ resp });
        }
    }
);

module.exports = app;
