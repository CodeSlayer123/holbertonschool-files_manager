const {MongoClient} = require('mongodb');
//require('dotenv').config()



class DBClient{
    constructor(){
        const host = 'localhost';
        const port = 27017;
        const database = 'files_manager';
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
        ///?authSource=${DB_DATABASE}
        MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
            if (err){
                console.log(`Error: ${err}`)
            }
            this.db = client.db(database)
            this.users = this.db.collection('users')
            this.files = this.db.collection('files')


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