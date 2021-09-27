require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    MONGO: {
        USERNAME: process.env.MONGO_USERNAME,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE,
    }
}
