const mysql = require('mysql')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection

function handleConnection() {
    connection = mysql.createConnection(dbconf)
    connection.connect(error => {
        if (error) {
            console.error('[db error]', error);
            setTimeout(handleConnection, 2000)
        }
    })
    connection.on('error', error => {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection()
        } else {
            throw error
        }
    })
}

handleConnection()

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) return reject(error)
            resolve(data)
        })
    })
}

module.exports = {
    list
}