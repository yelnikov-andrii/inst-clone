import express from 'express';
import 'dotenv/config'
import { router } from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import { errorMiddleware } from './middleware/index.js';
import path from 'path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Message } from './models/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174']
  }
});

io.on('connection', (socket) => {
  console.log("user is connected");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId.toString())
  });

  socket.on("typing", ({ chatId, userId }) => {
    socket.to(chatId.toString()).emit("typing", { userId })
  });

  socket.on("stop typing", ({ chatId, userId }) => {
    socket.to(chatId.toString()).emit("stop typing", { userId });
  })

  socket.on('send message', async ({ chatId, senderId, recipientId, text }) => {
    const message = await Message.create({
      chatId,
      senderId,
      text,
      recipientId
    });

    io.to(chatId.toString()).emit('new message', message);

  })
});

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

app.use(fileUpload());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const port = process.env.PORT || 3000;

app.use(router);
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
