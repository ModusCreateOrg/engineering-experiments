import express from 'express';
import cors from 'cors';
import { HttpController } from './controllers';
import config from './shared/configs';

const app            = express();
const router         = express.Router();
const port           = config.ports.self;
const httpController = new HttpController();

// Actual APIs
router.get('/', httpController.getAll.bind(httpController));
router.post('/', httpController.create.bind(httpController));

router.get('/:id', httpController.getOne.bind(httpController));
router.get('/:id/attendee', httpController.getAttendeeInfo.bind(httpController));
router.get('/:id/event', httpController.getEventInfo.bind(httpController ));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tickets', router);

app.listen(port, () => console.log(`server is listening on ${port}`));
