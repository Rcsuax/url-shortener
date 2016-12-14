'use strict';
import express from 'express';
import mongoose from  'mongoose';
import {router} from './routes'

const app = express();
const port = process.env.PORT || 8080;

app.use(router);

mongoose.connect('127.0.0.1:27017/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongo connected');
});

app.listen(port, () => {
    console.log('Express listening at port: ' + port);
});
