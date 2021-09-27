const config = require('./config')
const app = require('./app');
const http = require('http');

const server = http.createServer(app); 

console.log(`Starting api on port ${config.PORT}...`);
server.listen(config.PORT, () => {
    console.log('Started API Server!');
})
