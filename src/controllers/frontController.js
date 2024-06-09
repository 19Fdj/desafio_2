import('nanoid').then(({ nanoid }) => {
});
const fs = require('fs').promises;
const path = require('path');

// Obtener todas las canciones
const getSongs = async () => {
    const fsResponse = await fs.readFile('Desafio_2/src/controllers/canciones.json', 'utf-8');
    const canciones = JSON.parse(fsResponse);
    return canciones;
};

// Enviar archivo index.html
const frontFile = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
};

// Añadir una nueva canción (POST)
const addSong = async (req, res) => {
    const { Titulo, Artista, Tono } = req.body;
    const nuevaCancion = {
        id: nanoid(),
        Titulo,
        Artista,
        Tono,
    };
    let canciones = await getSongs();
    canciones.push(nuevaCancion);
    await fs.writeFile('canciones.json', JSON.stringify(canciones, null, 2));
    res.status(201).json(nuevaCancion);
};

// Actualizar una canción (PUT)
const updateSong = async (req, res) => {
    const id = req.params.id;
    const { Titulo, Artista, Tono } = req.body;

    let canciones = await getSongs();
    const cancionIndex = canciones.findIndex((cancion) => cancion.id === id);

    if (cancionIndex === -1) {
        return res.status(404).json({ message: 'Song not found' });
    }

    const updatedCancion = {
        ...canciones[cancionIndex],
        Titulo,
        Artista,
        Tono,
    };

    canciones[cancionIndex] = updatedCancion;

    await fs.writeFile('canciones.json', JSON.stringify(canciones, null, 2));
    res.json(updatedCancion);
};

// Eliminar una canción (DELETE)
const deleteSong = async (req, res) => {
    const id = req.params.id;

    let canciones = await getSongs();
    const cancionIndex = canciones.findIndex((cancion) => cancion.id === id);

    if (cancionIndex === -1) {
        return res.status(404).json({ message: 'Song not found' });
    }

    canciones = canciones.filter((cancion) => cancion.id !== id);

    await fs.writeFile('canciones.json', JSON.stringify(canciones, null, 2));
    res.json(canciones);
};

module.exports = {
    frontFile,
    getSongs,
    addSong,
    updateSong,
    deleteSong
};
