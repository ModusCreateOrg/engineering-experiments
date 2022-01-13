import express from 'express';
import cors from 'cors';

const app    = express();
const port   = 8003;
const router = express.Router();

app.get('/', (req, res) => res.send('We are live with tickets'));

app.listen(port, () => console.log(`Server is listening on ${port}`));
