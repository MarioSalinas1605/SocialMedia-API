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

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
            if (error) return reject(error)
            resolve(data)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })
    })
}

function upsert(table, data) {
    if (data && data.id) {
        return(update(table, data))
    }
    return(insert(table, data))
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err)
            resolve(res[0] || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}