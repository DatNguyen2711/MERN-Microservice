const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient();

// ở đây là để connect vói mongodb local cài = docker (những service khác cũng tương tự)

// const dbHost = process.env.DB_HOST || 'localhost'
// const dbPort = process.env.DB_PORT || 27017
// const dbName = process.env.DB_NAME || 'my_db_name'
// const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
//     .catch(err => console.log(err));



// chuỗi ở dưới là để connect sang mongodb trên cloud (những service khác cũng tương tự)

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_cluster = process.env.MONGO_CLUSTER;

mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}.q0ksucl.mongodb.net/?retryWrites=true&w=majority`
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
    .catch(err => console.log(err));



module.exports = mongoose;