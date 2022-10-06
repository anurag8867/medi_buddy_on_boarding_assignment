let patientRepo = require('../repositories/patient');
const redis = require('../helpers/redis');

const addPatient = function ({ name, age, gender, walletAmount }) {
    return patientRepo.addPatient({ name, age, gender, walletAmount });
};
const updatePatient = function ({ id, name, age, gender, walletAmount }) {
    return patientRepo.updatePatient({ id, name, age, gender, walletAmount });
};

const getPatient = async function ({ walletAmount }) {
    const key = `walletAmount_${walletAmount}`;
    const getValueFromRedis = await redis.get(key);
    if (getValueFromRedis) {
        return JSON.parse(getValueFromRedis);
    }
    const getPatient = await patientRepo.getPatient({ walletAmount });
    await redis.set(key, JSON.stringify(getPatient));
    return getPatient;
};

module.exports = { addPatient, getPatient, updatePatient };
