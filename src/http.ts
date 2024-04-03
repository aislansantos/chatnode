import express, { Request, Response } from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";


const server = express();

const serverHttp = http.createServer(server);
const io = new Server(serverHttp);

server.use(express.static(path.join(__dirname, "../public")));

const connectedUsers = 

io.on("connection", (socket) => {
    console.log("Conexão detectada ...");
});

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});


export { serverHttp, io }