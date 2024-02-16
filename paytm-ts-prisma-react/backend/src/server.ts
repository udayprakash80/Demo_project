import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const mainRouter = require('./routes/index');
app.use('/api/v1', mainRouter);

app.listen(3000);
