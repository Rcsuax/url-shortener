'use strict';
import express from 'express';
import mongoose from  'mongoose';
import {router} from './routes'

const app = express();
const port = process.env.PORT || 8080;

app.use(router);

let dbUrl = process.env.DB || '127.0.0.1:27017/test'

mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongo connected');
    console.log(dbUrl);
});

app.listen(port, () => {
    console.log('Express listening at port: ' + port);
});
