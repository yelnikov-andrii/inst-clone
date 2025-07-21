import express from 'express';
import 'dotenv/config'
import { router } from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import { errorMiddleware } from './middleware/index.js';
import path from 'path';

const app = express();
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(fileUpload());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const port = process.env.PORT || 3000;

app.use(router);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
