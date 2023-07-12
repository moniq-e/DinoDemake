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
    Obstacle.maxSpeed = Player.options.hard ? 12 : 8
    Obstacle.minSpeed = Player.options.hard ? 4 : 2.5
    Obstacle.speed = Math.max(Obstacle.speed, Obstacle.minSpeed)
})

document.querySelector("#infinity").addEventListener("click", _ => {
    Player.options.infinity = !Player.options.infinity
})