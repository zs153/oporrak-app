#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from "debug";
import http from "http";
import app from "../app";
import { Server } from "socket.io";

const onlineClients = new Set();
let notes = [];

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "4200");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

/**
 * socket.io
 */
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  onlineClients.add(socket.id);

  socket.emit('server:loadnotes', notes)

  socket.on("client:newnote", (message) => {
    notes.push(message)
    io.emit("server:newnote", message)
  })
  socket.on("send-message", (message) => {
    //socket.broadcast.emit("receive-message", message);
    //socket.emit('receive-message', message)    
    onlineClients.forEach((value) => {
      socket.emit('send-message', {message: 'Hola mundo', id: value})
    })
  });
  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    console.log("Desconectado");
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
