const {MongoClient} = require('mongodb');
//require('dotenv').config()



class DBClient{
    constructor(){
        const DB_HOST = 'localhost';
        const DB_PORT = 27017;
        const DB_DATABASE = 'files_manager';
        try{
            DB_HOST = process.env.DB_HOST
        }catch(err){
            
        }
        try{
            DB_PORT = process.env.DB_PORT
        }catch(err){
        }
        try{
            DB_DATABASE = process.env.DB_DATABASE
        }catch(err){
        }

        const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
        ///?authSource=${DB_DATABASE}
        MongoClient.connect(uri, (err, client) => {
            if (err){
                console.log(`Error: ${err}`)
            }
            const database = client.db(DB_DATABASE)
            this.users = database.collection('users')
            this.files = database.collection('files')


            //this.client = client
            //client.close()
        })

        //this.client.connect()
        //this.database = this.client.db(DB_DATABASE)

    }
    isAlive(){
        return !!this.client && !!this.client.topology && this.client.topology.isConnected()
    }
    async nbUsers(){
        //const users = this.database.collection('users')
        //console.log(users)
        const count = await this.users.countDocuments()
        console.log(count)
        return count
    }
    async nbFiles(){
        //const files = this.database.collection('files')
        const count = await this.files.countDocuments()
        console.log(count)

        return count
    }
}

const dbClient = new DBClient

module.exports = dbClient