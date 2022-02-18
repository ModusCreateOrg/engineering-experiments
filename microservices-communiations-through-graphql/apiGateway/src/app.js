const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(helmet());
app.use('/', routes);

app.listen(PORT, () => console.log(`Gateway has started on port: ${PORT}`));
