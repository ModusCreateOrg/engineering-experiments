import express from 'express';
import cors from 'cors';
import { HttpController } from './controllers/http';
import config from './shared/configs';

const app            = express();
const router         = express.Router();
const httpPort       = config.httpPorts.self;
const httpController = new HttpController();

// Actual APIs
router.post('/', httpController.create.bind(httpController));
router.get('/:id', httpController.getOne.bind(httpController));
router.put('/:id', httpController.update.bind(httpController));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/invoices', router);

app.listen(httpPort, () => console.log(`server is listening on ${httpPort}`));
