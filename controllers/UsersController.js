import dbClient from '../utils/db';
import redisClient from '../utils/redis';
const sha1 = require('js-sha1');


class UsersController{
    static postNew(req, response){
        const err = new Error()
        err.statusCode = 400
        console.log(req.body)
        if(!request.params.email){
            err.message = 'Missing email'
            throw err
        }
        if(!request.params.password){
            err.message = 'Missing password'
            throw err
        }
        if(dbClient.db.collection('users').find({'email': request.params.email})){
            err.message = 'Already exist'
            throw err
        }
        newUser = dbClient.db.collection('users').insert_one({ 'email': request.params.email, 'topics': sha1(request.params.password)})
        return response.status(201).send({ "id": newUser.id, "email": newUser.email})
    }


}

module.exports = UsersController