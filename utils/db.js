const {MongoClient} = require('mongodb');
//require('dotenv').config()



class DBClient{
    constructor(){
        const host = 'localhost';
        const port = 27017;
        const database = 'files_manager';
        this.connected = false

        try{
            host = process.env.DB_HOST
        }catch(err){
            
        }
        try{
            port = process.env.DB_PORT
        }catch(err){
        }
        try{
            database = process.env.DB_DATABASE
        }catch(err){
        }

        const uri = `mongodb://${host}:${port}/${database}`;
        MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
            if (err){
                this.isConnected(false)
                throw new Error(`Error: ${err}`)
            }
            this.isConnected(true)
            this.db = client.db(database)
        })

    }
    isConnected(status){
        this.connected = status
    }
    isAlive(){
        //console.log(this.connected)
        return this.connected
    }
    async nbUsers(){
        const users = this.db.collection('users')
        const count = await users.countDocuments()
        return count
    }
    async nbFiles(){
        const files = this.db.collection('files')
        const count = await files.countDocuments()
        return count
    }
}

const dbClient = new DBClient

module.exports = dbClient