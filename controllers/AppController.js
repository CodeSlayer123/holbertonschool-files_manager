import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController{
    static getStatus(request, response){
        return response.status(200).send({ "redis": redisClient.isAlive(), "db": dbClient.isAlive()})
    }
    static getStats(request, response){
        return response.status(200).send({ "users": dbClient.nbUsers(), "files": dbClient.nbFiles()})

    }
}

module.exports = AppController