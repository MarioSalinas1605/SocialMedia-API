const config = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'hKw1ucHnau',
        password: process.env.MYSQL_PASSWORD || 't9HymlweDb',
        database: process.env.MYSQL_DB || 'hKw1ucHnau'
    }
}

module.exports = config