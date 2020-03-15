'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const errorHandling = require('./middlewares/errorHandling')
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/', routes)
app.use(errorHandling)


http.listen(port, () => console.log(`App listening on port ${port}!`))