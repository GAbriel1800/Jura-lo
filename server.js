// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configuración de MongoDB
mongoose.connect('mongodb://localhost/juramentos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Esquema y modelo de Juramento
const juramentoSchema = new mongoose.Schema({
    motivo: String,
    detalles: String,
    fecha: { type: Date, default: Date.now }
});

const Juramento = mongoose.model('Juramento', juramentoSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir archivos estáticos

// Ruta para crear un juramento
app.post('/juramentos', async (req, res) => {
    const { motivo, detalles } = req.body;
    const nuevoJuramento = new Juramento({ motivo, detalles });
    await nuevoJuramento.save();
    res.json(nuevoJuramento);
});

// Ruta para obtener los juramentos
app.get('/juramentos', async (req, res) => {
    const juramentos = await Juramento.find().sort({ fecha: -1 });  // Más recientes primero
    res.json(juramentos);
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
