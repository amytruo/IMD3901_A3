const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/moderator', function( req, res ){ 
    res.sendFile( __dirname + '/public/moderator.html' );
});

app.get( '/player', function( req, res ){ 
    res.sendFile( __dirname + '/public/player.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    // piano keys
    socket.on("white", (data) => {
        console.log( "white (b) event received" );
        io.sockets.emit("color_change", {r:255, g:255, b:255});
    });

    socket.on("bflat", (data) => {
        console.log( "bflat event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:0});
    });


    socket.on("pink", (data) => {
        console.log( "pink (a) event received" );
        io.sockets.emit("color_change", {r:235, g:77, b:180});
    });

    socket.on("aflat", (data) => {
        console.log( "aflat event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:0});
    });


    socket.on("purple", (data) => {
        console.log( "purple (f) event received" );
        io.sockets.emit("color_change", {r:132, g:0, b:255});
    });

    socket.on("yellow", (data) => {
        console.log( "yellow (g) event received" );
        io.sockets.emit("color_change", {r:255, g:225, b:0});
    });

    socket.on("fsharp", (data) => {
        console.log( "fsharp event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:0});
    });

    socket.on("red", (data) => {
        console.log( "red event received" );
        io.sockets.emit("color_change", {r:255, g:0, b:0});
    });

    socket.on("csharp", (data) => {
        console.log( "csharp event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:0});
    });

    socket.on("eflat", (data) => {
        console.log( "eflat event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:0});
    });


    socket.on("green", (data) => {
        console.log( "green event received" );
        io.sockets.emit("color_change", {r:0, g:255, b:0});
    });

    socket.on("blue", (data) => {
        console.log( "blue event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:255});
    });

    // start timer
    socket.on('start', (data) => {
        console.log('timer started')
        io.sockets.emit('start_timer');
    });

    // stop timer
    socket.on('pause', (data) => {
        console.log('timer paused')
        io.sockets.emit('pause_timer');
    });

    // display songs
    socket.on('display_song', (data) => {
        console.log('mary had a little lamb')
        io.sockets.emit('showSongA');
    });

    socket.on('display_songB', (data) => {
        console.log('red swan')
        io.sockets.emit('showSongB');
    });

    socket.on('display_songC', (data) => {
        console.log('the black pearl')
        io.sockets.emit('showSongC');
    });
});