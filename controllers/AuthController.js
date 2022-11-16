import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AuthController{
    static getConnect(request, response){
        console.log("test")
        console.log(request.get('authorization'))
        //return response.status(200).send({ "redis": redisClient.isAlive(), "db": dbClient.isAlive()})
    }
    
}

module.exports = AppController