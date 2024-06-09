const express = require('express');
const filesRouter = express.Router();
const { frontFile, addSong, updateSong, deleteSong, getSongs } = require('../../controllers/frontController');

// Ruta para enviar el archivo HTML
filesRouter.get('/', frontFile);

// Ruta para obtener todas las canciones
filesRouter.get('/canciones', async (req, res) => {
    try {
        const canciones = await getSongs();
        res.json(canciones);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Ruta para añadir una nueva canción
filesRouter.post('/canciones', async (req, res) => {
    try {
        await addSong(req, res);
    } catch (error) {
        console.error('Error al agregar una nueva canción:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Ruta para actualizar una canción
filesRouter.put('/canciones/:id', async (req, res) => {
    try {
        await updateSong(req, res);
    } catch (error) {
        console.error('Error al actualizar la canción:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Ruta para eliminar una canción
filesRouter.delete('/canciones/:id', async (req, res) => {
    try {
        await deleteSong(req, res);
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = filesRouter;
