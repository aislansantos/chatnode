import express, { Request, Response } from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";


const server = express();

const serverHttp = http.createServer(server);
const io = new Server(serverHttp);

server.use(express.static(path.join(__dirname, "../public")));

let connectedUsers: string[] = [];

io.on("connection", (socket) => {
    console.log("Conexão detectada ...");

    socket.on("join-request", (username) => {
        (socket as any).username = username;
        connectedUsers.push(username);
        console.log(connectedUsers);

        socket.emit("user-ok", connectedUsers);
        socket.broadcast.emit("list-update", {
            joined: username,
            list: connectedUsers
        });
    });

    socket.on("disconnect", () => {
        connectedUsers = connectedUsers.filter(user => user !== (socket as any).username)
        console.log(connectedUsers);

        socket.broadcast.emit("list-update", {
            left: (socket as any).username,
            list: connectedUsers
        })

    })
});

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});


export { serverHttp, io }