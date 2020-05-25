const port = 4611;

const express = require('express');
const cors = require('cors');

//const session = require('express-session');
const cookieParser = require('cookie-parser');

const videoRouter = require('./routes/video');
//const videoRouter = require('./routes/videos');
const { userController } = require('./controller');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/resource', videoRouter);

app.post('/auth', userController.auth);

app.post('/deauth', userController.deauth);

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
