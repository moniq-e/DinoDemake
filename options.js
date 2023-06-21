import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"

document.querySelectorAll("#buttons div").forEach(d => {
    d.addEventListener("click", _ => {
        d.style.backgroundColor = !d.style.backgroundColor ? 'deeppink' : ''
    })
})

document.querySelector("#mousejump").addEventListener("click", _ => {
    Player.options.mousejump = !Player.options.mousejump
})

document.querySelector("#hard").addEventListener("click", _ => {
    Player.options.hard = !Player.options.hard
    Obstacle.maxSpeed = Player.options.hard ? 20 : 12
    Obstacle.minSpeed = Player.options.hard ? 8 : 5
    Obstacle.speed = Math.max(Obstacle.speed, Obstacle.minSpeed)
})

document.querySelector("#infinity").addEventListener("click", _ => {
    Player.options.infinity = !Player.options.infinity
})

document.querySelector("#heavy").addEventListener("click", _ => {
    Player.options.heavy = !Player.options.heavy
    Player.minJumpHeight = Player.options.heavy ? 10 : 7
})