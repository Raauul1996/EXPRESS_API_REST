const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(require('./routes/index'))
app.disable('x-powered-by')


module.exports = {
    app
}