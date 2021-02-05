const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routers = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_URL } = require('./configs');
const { rateLimiter } = require('./configs/rate-limiter');
const centralErrHandler = require('./middlewares/central-err-handler');

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(requestLogger);
app.use(rateLimit(rateLimiter));
app.use(helmet());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(routers);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(centralErrHandler);

app.listen(PORT);
