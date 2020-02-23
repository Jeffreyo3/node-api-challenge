const express = require('express');

const actionRouter = require('./routes/actionRouter');
const projectRouter = require('./routes/projectRouter');

const helmet = require('helmet');

const server = express();
server.use(express.json(), helmet(), logger);

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>jeffreyo3's API Sprint Challenge is ALIVE!!</h2>`)
})

server.get('/api', (req, res) => {
    res.send(`
    <h2>jeffreyo3's API Sprint Challenge</h2>
    </br>
    <p>Actions: '/api/actions'</p>
    </br>
    <p>Projects: '/api/projects'</p>
    `)
})


function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.url} at ${new Date().toISOString()}`);
    next();
}

module.exports = server;