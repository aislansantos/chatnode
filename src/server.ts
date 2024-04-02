import express, { Request, Response } from "express";
import path from "path";

const server = express();

server.use(express.static(path.join(__dirname, "../public")));

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});


server.listen(3000);