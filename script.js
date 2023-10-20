// Selecciona todos los elementos de pantalla y los botones de selección de insectos
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

// Agrega un event listener al botón de inicio
start_btn.addEventListener('click', () => screens[0].classList.add('up'))

// Agrega event listeners a los botones de selección de insectos
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Obtiene la imagen y la información del insecto seleccionado
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        // Oculta la pantalla de selección y comienza el juego
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

// Inicia el juego y comienza a medir el tiempo
function startGame() {
    setInterval(increaseTime, 1000)
}

// Incrementa el tiempo y lo muestra en el elemento de tiempo
function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

// Crea un nuevo insecto en una ubicación aleatoria
function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    // Crea la imagen del insecto y la rota aleatoriamente
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

// Obtiene una ubicación aleatoria en la ventana del navegador
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

// Maneja el evento de hacer clic en un insecto (atrapar un insecto)
function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

// Agrega insectos adicionales después de un tiempo
function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

// Incrementa la puntuación y muestra un mensaje si se supera cierto puntaje
function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
