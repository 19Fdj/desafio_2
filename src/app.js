const express = require('express');
const routes = require('./routes/indexDeRoutes');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', routes);

module.exports = app;
