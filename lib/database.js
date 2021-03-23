const { MongoClient , ObjectId } = require('mongodb');

const config = require('../config/index');

const USER = encodeURIComponent(config.db.user);

const PASS = encodeURIComponent(config.db.password);

const URI = `mongodb+srv://${USER}:${PASS}@${config.db.host}/${config.db.name}?retryWrites=true&w=majority`;

class DBLib {
    constructor(collection) {
        this.client = new MongoClient(URI , { useNewUrlParser : true, useUnifiedTopology: true });
        this.dbName = config.db.name; 
        this.collection = collection;
    }
    connect(){
        if (!DBLib.connection){
            DBLib.connection = new Promise((resolve , reject) => {
                this.client.connect(err => {
                    if (err) return reject(err);
                    console.log('[DB] connect')
                    resolve(this.client.db(this.dbName));
                })
            })
        }
        return DBLib.connection;
    }
    getAll(limit) {
        return this.connect().then(db => {
            if(limit) {
                return db.collection(this.collection).find({}).limit(limit).toArray();
            } else {
                return db.collection(this.collection).find({}).toArray();
            }
            
        })
    }
    get(id) {
        return this.connect().then(db => {
            return db.collection(this.collection).findOne({_id : ObjectId(id)})
        })
    }
    create(data) {
        return this.connect().then(db => {
            return db.collection(this.collection).insertOne(data);
        }).then(r => r.insertedId);
    }
    patch(id , data){
        return this.connect().then(db => {
            return db.collection(this.collection).updateOne({_id: ObjectId(id)} , {$set: data} , {upsert: true});
        }).then(r => r.insertedId || id);
    }
    delete(id) {
        return this.connect().then(db => {
            return db.collection(this.collection).deleteOne({_id:ObjectId(id)})
        }).then(() => ({message: "cart deleted" , id}))
    }
}
module.exports = DBLib