require('dotenv').config()

module.exports = {
    LOCAL_DEV: false,
    PORT: process.env.PORT,
    API_KEY: process.env.api_key,
    MONGO: {
        USERNAME: process.env.MONGO_USERNAME,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE,
    }
}
