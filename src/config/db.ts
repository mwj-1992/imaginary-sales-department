const Sequelize = require('sequelize');
export default new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    logging: false, //It is consuming the time on lambda function.
    dialect: process.env.DIAlECT,
    define: {
        timestamps: false
    },
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 10000
    }
});
