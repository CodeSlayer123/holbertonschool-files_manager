const redis = require('redis');
const util = require('util');


class RedisClient{
    constructor(){
        this.client = redis.createClient({
        })

        this.client.on('error', err => {
            console.log(`Error: ${err}`)
        })
    }


    isAlive(){

        //return this.client.connected

        this.client.on('connect', () => {
            const tr = true
            //console.log(tr)
            return tr
        })
        return false

    }
    async get(key){
        const get = util.promisify(this.client.get).bind(this.client);
        try {
            return get(key)

        } catch(err){
            console.log(`Error: ${err}`)
        }
    }

    async set(key, value, duration){
        const set = util.promisify(this.client.set).bind(this.client);
        try {
            set(key, value, 'EX', duration)

        } catch(err){
            console.log(`Error: ${err}`)
        }

    }

    async del(key){
        const del = util.promisify(this.client.del).bind(this.client);
        try {
            del(key)

        } catch(err){
            console.log(`Error: ${err}`)
        }

    }
}

const redisClient = new RedisClient

module.exports = redisClient