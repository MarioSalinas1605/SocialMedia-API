const express = require('express')
const config = require('../config')
const user = require('./components/user/network')
const login = require('./components/auth/network')

const app = express()
app.use(express.json())

app.use('/api/user', user)
app.use('/api/auth', login)


app.listen(config.api.port, () => {
    console.log(`Server is listening at http://localhost:${config.api.port}`);
})