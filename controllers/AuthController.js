import { del } from 'request';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
const { uuid } = require('uuidv4');
const sha1 = require('sha1');
const mongo = require("mongodb")

class AuthController{
    static async getConnect(request, response){
        const collection = dbClient.db.collection('users')
        const auth = request.get('authorization').split(' ')[1]
        const step1 = Buffer.from(auth, 'base64').toString('utf8'); //result - email:password
        const step2 = step1.split(':') //result - [email, password]

        const email = step2[0]
        const password = step2[1]
        console.log(email)
        console.log(sha1(password))
        console.log(await dbClient.db.collection('users').find())
        console.log("-------------------------------------------------")
        const user = await collection.findOne({email: email, password: sha1(password)})
        if (!user){
            return response.status(401).send({'error': 'Unauthorized'})
        }
        const token = uuid()
        const key = `auth_${token}`
        //console.log(user.ops[0])
        console.log(user)
        await redisClient.set(key, user._id, 24 * 3600)
        return response.status(200).send({ "token": token })
    

    }
    static async getDisconnect(request, response){
        console.log("test")
        const token = request.headers['x-token']
        const key = `auth_${token}`
        const user = redisClient.get(key)
        if (!user){
            return response.status(401).send('error: Unauthorized')
        }
        redisClient.del(key)
        return response.status(204)
    }

}

module.exports = AuthController