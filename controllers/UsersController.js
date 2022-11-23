import dbClient from '../utils/db';
import redisClient from '../utils/redis';
const mongo = require('mongodb');
const sha1 = require('sha1');


class UsersController{
    static async postNew(request, response){
        //await dbClient.db.collection('users').remove()
        const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const user = await dbClient.db.collection('users').findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'Already exist' });
      }

      const hash = sha1(password);
      const newUser = await dbClient.db
        .collection('users')
        .insertOne({ email, password: hash });
      return res.status(201).send({ id: newUser.insertedId, email });
    
    }

    static getMe(request, response) {
        const token = request.headers['x-token']
        const key = `auth_${token}`
        console.log('key: '+key)
        let userId;
        redisClient.get(key).then((result) => {
            if (!result){
                return response.status(401).send('error: Unauthorized')
            }
            userId = result
        })
        dbClient.db.collection('users').findOne({userId}, (err, result) => {
            if (!result){
                return response.status(401).send('error: Unauthorized')
            }
            return response.status(200).send({id:userId,email:result.email})
        })

    }
}

module.exports = UsersController