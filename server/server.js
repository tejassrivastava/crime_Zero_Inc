const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express()
const PORT = 8080

const codeinc = require('./routes/codeinc')

app.use(morgan('dev'));

if (app.get('env') === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));

app.use(bodyParser.json())

app.use('/api', codeinc)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT} `)
})