const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const config = require('config');
let sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'),
    config.get('mysql')
);
sequelize.sync();

const patient = sequelize.define(
    'patient',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        gender: {
            type: Sequelize.ENUM,
            values: ['male', 'female'],
            allowNull: false
        },
        wallet_amount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true
    }
);

module.exports = { patient, sequelize };
