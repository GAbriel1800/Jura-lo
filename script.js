// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que el formulario está en el DOM
    const form = document.querySelector('#juramento-form');
    const resultContainer = document.querySelector('#result-container');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const motivo = document.querySelector('#motivo').value;
        const detalles = document.querySelector('#detalles').value;
        
        if (motivo && detalles) {
            // Generar un enlace único (esto es un ejemplo, para propósitos reales necesitas un backend)
            const enlace = `https://example.com/juramento/${btoa(motivo + detalles)}`;
            
            // Mostrar el enlace
            resultContainer.innerHTML = `
                <p>Tu juramento ha sido creado.</p>
                <p><a href="${enlace}" target="_blank">${enlace}</a></p>
            `;
        } else {
            alert('Por favor, rellena todos los campos.');
        }
    });
});

