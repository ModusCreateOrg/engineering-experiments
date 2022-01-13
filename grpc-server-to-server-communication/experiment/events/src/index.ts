import express from 'express';
import cors from 'cors';
import { HttpController } from './controllers';
import config from './shared/configs';

const app            = express();
const router         = express.Router();
const port           = config.ports.self;
const httpController = new HttpController();

// Actual HTTP APIs
router.get('/', httpController.getAll.bind(httpController));
router.post('/', httpController.create.bind(httpController));
router.get('/:id', httpController.getOne.bind(httpController));

router.get('/:id/tickets', httpController.getTickets.bind(httpController));
router.post('/:id/tickets', httpController.buyTicket.bind(httpController));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/events', router);

app.listen(port, () => console.log(`HTTP server is listening on ${port}`));

