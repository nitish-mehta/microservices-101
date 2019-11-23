const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const associations = [];

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(file => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const model = require(`./${file}`);
        const definedModel = model(sequelize);
        db[definedModel.name] = definedModel;
        if (model.associate) {
            associations.push(model.associate);
        }
    });

associations.forEach(eachAssociation => {
    eachAssociation(db);
});

sequelize.sync().then(function () {
    logger.info('Connection to db been established successfully.');
}).catch(function (error) {
    logger.info('Unable to connect to the database:', error);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
