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
    if (!db[tabla]) {
        db[tabla] = []
    }
    
    db[tabla].push(data)

    console.log(db);
    
}

async function remove(tabla, id) {
    return true
}

async function query(tabla, q) {
    let keys = Object.keys(q)
    let key = keys[0]
    return db[tabla].filter(item => item[key] === q[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}