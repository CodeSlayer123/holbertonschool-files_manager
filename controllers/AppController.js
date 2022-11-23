import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController{
    static getStatus(request, response){
        if (dbClient.isAlive() && redisClient.isAlive()){
            return response.status(200).send({ redis: true, db: true})

        }
        return response.status(400).send('Redis and MongoDB not connected')
    }
    static async etStats(request, response){
        const users = dbClient.nbUsers()
        const files = dbClient.nbFiles()
        return response.status(200).send({ users, files})

    }
}

module.exports = AppController