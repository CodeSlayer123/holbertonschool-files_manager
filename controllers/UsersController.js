import dbClient from '../utils/db';
import redisClient from '../utils/redis';
const mongo = require('mongodb');
const sha1 = require('sha1');


class UsersController{
    static async postNew(request, response){
        await dbClient.db.collection('users').remove()
        if(!request.body.email){
            return response.status(400).send({"error": "Missing email"})
        }
        if(!request.body.password){
            return response.status(400).send({"error": "Missing password"})
        }
        if(await dbClient.db.collection('users').findOne({email: request.body.email})){
            return response.status(400).send({"error": "Already exist"})
        }

        const newUser = await dbClient.db.collection('users').insertOne({email: request.body.email, password: sha1(request.body.password)})
        console.log({ "id": newUser.insertedId, "email": request.body.email})
        return response.status(201).send({"id": newUser.insertedId, "email": request.body.email})
    }

    static async getMe(request, response){
        const token = request.headers['x-token']
        const key = `auth_${token}`
        const userId = await redisClient.get(key)
        if (!userId){
            return response.status(401).send('error: Unauthorized')

        }
        //userId = new mongo.ObjectID(userId)
        console.log('userId: ' + userId)
        const user = await dbClient.db.collection('users').findOne({'_id': userId})
        console.log('user: ' + user)
        if (!user){
            return response.status(401).send('error: Unauthorized!!!!!!')

        }
        return response.status(200).send({"id":userId,"email":user.ops[0].email})
    }


}

module.exports = UsersController