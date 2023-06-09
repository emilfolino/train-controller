require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const fetchTrainPositions = require('./models/trains.js')
const delayed = require('./routes/delayed.js');

const app = express()
const httpServer = require("http").createServer(app);


app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:9000",
    methods: ["GET", "POST"]
  }
});

const port = 1337

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/delayed", delayed);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// fetchTrainPositions(io);
