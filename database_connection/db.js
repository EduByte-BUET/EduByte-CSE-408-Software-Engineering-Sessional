const oracledb = require('oracledb');
oracledb.autoCommit = true;


const database = {
    user: 'APURBO',
    password: 'apurbo',
    connectString: 'localhost:1521/orclpdb'
};

let connection;
async function connectToDB() {
    try {
        connection = await oracledb.getConnection(database);
        console.log('Connected to Oracle Database');

    } catch (err) {
        console.error('Error connecting to Oracle Database:', err.message);
        throw err;
    }
}

async function execute(sql, binds, options) {
    try {
        const result = await connection.execute(sql, binds, options);
        // console.log('Query executed successfully');
        return result;
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
};

module.exports = { connectToDB, execute, options };
