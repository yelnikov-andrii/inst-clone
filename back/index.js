import express from 'express';
import 'dotenv/config'
import { router } from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/index.js';

const app = express();
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(router);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
