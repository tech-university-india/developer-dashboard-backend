
const express = require('express');
// const config = require('../config/default.json');
const dashRouter = require('./routes/dashRouter');
const projectRouter = require('./routes/projectRouter');


const app = express();
const port = 3000;
// const {verifyJWT} = require('./middlewares/auth');
// const auth = require('./routes/auth.js');


// if(!config.get('jwtPrivateKey')){
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }

app.use(express.json());
app.use('/dashboard', dashRouter);
app.use('/projects', projectRouter);
// app.use('/auth', auth);
// app.use('/', verifyJWT, (req, res)=>{
//   res.send('Hello World');
// });

app.listen(port, () =>
  console.log(`Dashboard BE listening at http://localhost:${port}`)
);