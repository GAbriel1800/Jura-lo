document.getElementById('juramento-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const motivo = document.getElementById('motivo').value;
    const detalles = document.getElementById('detalles').value;
    
    // Enviar los datos al servidor para generar el enlace
    const response = await fetch('/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motivo, detalles })
    });
    
    const data = await response.json();
    
    if (data.success) {
        document.getElementById('juramento-link').href = data.link;
        document.getElementById('juramento-link').innerText = data.link;
        document.getElementById('link-container').style.display = 'block';
    } else {
        alert('Error al generar el enlace. Inténtalo de nuevo.');
    }
});
