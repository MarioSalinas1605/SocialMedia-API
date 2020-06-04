const db = {
    'user': [
        {id: '1', name: 'Carlos'}
    ]
}

async function list(tabla) {
    return db[tabla]
}

async function get(tabla, id) { 
    return db[tabla].filter(item => item.id === id)[0] || null
}

async function upsert(tabla, data) {
    return db[tabla].push(data)
}

function remove(tabla, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}