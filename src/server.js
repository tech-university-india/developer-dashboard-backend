const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const dashRouter = require('./routes/dashRouter');
const projectRouter = require('./routes/projectRouter');
const eventsRouter = require('./routes/eventsRouter');
const leavesRouter = require('./routes/leavesRouter');
const adminRouter = require('./routes/adminRouter');
const teamRouter = require('./routes/teamRouter');
const auth = require('./routes/auth.js');
const cors = require('cors');
const {verifyJWT} = require('./middlewares/auth');
const pulseRouter = require('./routes/pulseRouter');
const { sendMail } = require('./utils/pulseMailer');

const app = express();
const port = 8080;

app.use(cors());

if(!process.env.jwtPrivateKey){
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth);
app.use(verifyJWT);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/admin', adminRouter);
app.use('/events', eventsRouter);
app.use('/leaves', leavesRouter);
app.use('/dashboard', dashRouter);
app.use('/projects', projectRouter);
app.use('/teams', teamRouter);
app.use('/pulse', pulseRouter);
sendMail();


app.listen(port, () =>
  console.log(`Dashboard BE listening at http://localhost:${port}`)
);