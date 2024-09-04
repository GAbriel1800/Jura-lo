const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let juramentos = {};

app.post('/generate-link', (req, res) => {
    const { motivo, detalles } = req.body;
    const id = uuidv4();
    const link = `http://localhost:${port}/juramento/${id}`;
    
    juramentos[id] = { motivo, detalles };
    
    res.json({ success: true, link });
});

app.get('/juramento/:id', (req, res) => {
    const { id } = req.params;
    const juramento = juramentos[id];
    
    if (juramento) {
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>JuraLo</title>
            </head>
            <body>
                <h1>Juramento</h1>
                <p><strong>Motivo:</strong> ${juramento.motivo}</p>
                <p><strong>Detalles:</strong> ${juramento.detalles}</p>
                <button onclick="confirmarJuramento()">Jurar</button>
                <script>
                    function confirmarJuramento() {
                        alert('¡Has jurado cumplir con este compromiso!');
                    }
                </script>
            </body>
            </html>
        `);
    } else {
        res.status(404).send('Juramento no encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
