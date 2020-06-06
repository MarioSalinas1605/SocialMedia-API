const jwt = require('jsonwebtoken')
const config = require('../config')

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret)
}
function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req)
        console.log(decoded);
        if (decoded.id !== owner) {
            throw new Error("You can't do this")
        }
    }
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)
    req.user = decoded
    return decoded
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No token')
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid format')
    }
    let token = auth.replace('Bearer ', '')
    return token
}



module.exports = {
    sign,
    check
}