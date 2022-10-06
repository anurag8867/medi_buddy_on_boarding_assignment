const { createClient } = require('redis');

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

function set(key, data) {
    return client.set(key, data, 'EX', 60 * 60);
}

async function get(key) {
    return await client.get(key);
}
module.exports = { set, get };
