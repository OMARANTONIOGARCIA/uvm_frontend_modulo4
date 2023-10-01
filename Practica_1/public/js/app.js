const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const div  = document.querySelector('#divElement');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    div.textContent = 'Loading...';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                div.textContent = ''
                const nuevoParrafo = document.createElement("p");
                nuevoParrafo.innerHTML = data.error;
                div.appendChild(nuevoParrafo);
            } else {
                div.textContent = ''
                const nuevoParrafo = document.createElement("p");
                nuevoParrafo.innerHTML = `
                    La Cuidad es ${data.location.country} <br>
                    La Capital es ${data.location.name} <br>
                    La Latitud es ${data.location.lat} <br>
                    La Longitud es ${data.location.lon} <br>                    
                    La temperatura es ${data.current.temperature} grados
                `;
                div.appendChild(nuevoParrafo);

                const Imagen = document.createElement("img");
                Imagen.src = data.current.weather_icons[0];
                div.appendChild(Imagen);
            }
        })
    })
});