const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://nikitalztn:KupLRwmd9O2sni7T@cluster0.c2dgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const start = async () =>{
    try{
        await client.connect()
        console.log('yes');
    }catch(e){
        console.log(e)
    }
}

start();