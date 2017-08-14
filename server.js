var randtoken = require('rand-token');
var express = require('express');
var socketio = require('socket.io');
var StoryHandler = require('./lib/storyhandler');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var mobilePath = path.join(__dirname, 'clients/mobile')
// var desktopPath = path.join(__dirname, 'clients/desktop')

var clientPath = path.join(__dirname, 'client');

var sessions = {};

function newSession(token, sessions) {
    return sessions[token] = {
        timeCreated: new Date(),
        token: token,
        playersConnected: 0
    }
}

//==============================

server.listen(3000);

console.log('Listening on port 3000');

app.use('/stories/:token', (req, res, next) => {
    express.static(clientPath)(req, res, next);
})

app.get(['/newstory', '/new'], (req, res) => {
    var token = randtoken.generate(6);
    var session = newSession(token, sessions);

    console.log('story room created - ', token)

    var storyMessages = io.of('/stories/'+token);
    session.handler = new StoryHandler(session, storyMessages);

    res.redirect('/stories/' + token);
})