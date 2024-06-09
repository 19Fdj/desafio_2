const express = require('express');
const path = require('path');
const router = express.Router();
const filesRouter = require('./files/indexFilesRouter');

// Rutas de archivos
router.use('/files', filesRouter);

// Ruta para manejar solicitudes GET en la raíz
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = router;
