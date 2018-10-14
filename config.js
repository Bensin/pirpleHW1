var enviorments = {};

enviorments.staging = {
    'port':3000,
    'envName':'staging'
};

enviorments.production = {
    'port':5000,
    'envName':'production'
};

var currentEnviorment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

var enviormentToExport = typeof(enviorments[currentEnviorment]) == 'object' ? enviorments[currentEnviorment] : enviorments.staging;

module.exports = enviormentToExport;