let { patient } = require('../db/models');
const { Op } = require('sequelize');

const addPatient = function ({ name, age, gender, walletAmount }) {
    return patient.create({ name, age, gender, wallet_amount: walletAmount });
};

const updatePatient = async function ({ id, name, age, gender, walletAmount }) {
    const data = await patient.findOne({
        where: {
            id
        }
    });
    if (!data) {
        throw { message: `Data not found`, status: 404 };
    }

    return data.update({ name, age, gender, wallet_amount: walletAmount });
};

const getPatient = function ({ walletAmount }) {
    return patient.findAll({
        where: {
            wallet_amount: {
                [Op.gte]: walletAmount
            }
        }
    });
};
module.exports = { addPatient, getPatient, updatePatient };
