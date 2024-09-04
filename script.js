// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#juramento-form');
    const tableBody = document.querySelector('#juramentos-table tbody');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const motivo = document.querySelector('#motivo').value;
        const detalles = document.querySelector('#detalles').value;
        
        if (motivo && detalles) {
            fetch('https://tu-backend-url/juramentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ motivo, detalles })
            })
            .then(response => response.json())
            .then(data => {
                // Limpiar el formulario
                form.reset();
                
                // Actualizar la tabla
                updateJuramentosTable();
            });
        } else {
            alert('Por favor, rellena todos los campos.');
        }
    });
    
    function updateJuramentosTable() {
        fetch('https://tu-backend-url/juramentos')
        .then(response => response.json())
        .then(juramentos => {
            tableBody.innerHTML = '';
            juramentos.forEach(juramento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${juramento.motivo}</td>
                    <td>${juramento.detalles}</td>
                    <td>${new Date(juramento.fecha).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        });
    }
    
    // Cargar juramentos al inicio
    updateJuramentosTable();
});
