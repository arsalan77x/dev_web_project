const mongoose = require('mongoose')
const Logger = require('../core/Logger')
const {db} = require('../../config')

// Build the connection string
const prod_db = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`
console.log(prod_db)
const dbURI = process.env.NODE_ENV == 'test' ? t_db : prod_db
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

async function databaseConnector() {
    mongoose
        .connect(dbURI, options)
        .then(() => {
            Logger.info('Mongoose connection done')
        })
        .catch((e) => {
            Logger.info('Mongoose connection error')
            Logger.info(prod_db)
            Logger.error(e)
        })

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', () => {
        // Logger.info('Mongoose default connection open to ' + dbURI);
    })

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
        Logger.error('Mongoose default connection error: ' + err)
    })

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        // Logger.info('Mongoose default connection disconnected');
    })

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            // Logger.info('Mongoose default connection disconnected through app termination');
            process.exit(0)
        })
    })

    return mongoose.connection
}
// Create the database connection

module.exports = {databaseConnector}
