const urlRandom = 'https://ghibliapi.vercel.app/films'
const botoNovaPeli = document.getElementById('novaPeli')
const contenidorPeli = document.getElementById('Peli')

const textBuscar = document.getElementById('textBusqueda')
const botoBuscar = document.getElementById('botoBuscar')

function cargarPeliRandom() {
    fetch(urlRandom)
        .then(resposta => resposta.json())
        .then(dades => {
            contenidorPeli.innerHTML = ''
            const random = dades[Math.floor(Math.random() * dades.length)]
            contenidorPeli.innerHTML += `
            <div class="card" style="width: 18rem;">
             <img src="${random.image}" class="card-img-top" style="height:250px; object-fit:cover;">
             <div class="card-body">
             <h5 class="card-title">${random.title}</h5>
             <p class="card-text">
            <b>Director:</b> ${random.director}<br>
            <b>Any:</b> ${random.release_date}<br>
             <b>Puntuació:</b> ${random.rt_score}
        </p>
        <p>${random.description}</p>
    </div>
</div>
`
        })
}

function buscarPeli(input) {
    fetch(`https://ghibliapi.vercel.app/films`)
        .then(resposta => resposta.json())
        .then(dades => {
            contenidorPeli.innerHTML = ""

            const resultats = dades.filter(peli =>
                peli.title.toLowerCase().includes(input.toLowerCase())
            )

            if (resultats.length === 0) {
                contenidorPeli.innerHTML = "<p>No es troben pelis</p>"
                return
            }

            resultats.forEach(peli => {
                contenidorPeli.innerHTML += `
<div class="card" style="width: 18rem;">
    <img src="${peli.image}" class="card-img-top" style="height:250px; object-fit:cover;">
    <div class="card-body">
        <h5 class="card-title">${peli.title}</h5>
        <p class="card-text">
            <b>Director:</b> ${peli.director}<br>
            <b>Any:</b> ${peli.release_date}<br>
             <b>Puntuació:</b> ${peli.rt_score}
        </p>
        <p>${peli.description}</p>
    </div>
</div>
`
            })
        })
}

cargarPeliRandom()
botoNovaPeli.addEventListener('click', cargarPeliRandom)
botoBuscar.addEventListener('click', () => {
    const input = textBuscar.value
    buscarPeli(input)
})

