import { Player } from "./Player.js"
import { Obstacle } from "./Obstacle.js"
import { Floor } from "./Floor.js"
import "./options.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const speedSpan = document.querySelector("span#spe")
const jumpSpan = document.querySelector("span#jum")
const gravitySpan = document.querySelector("span#gra")
const scoreSpan = document.querySelector("span#scr")
const scoresE = document.querySelector('ol')
/**
 * @type {{name: string, score: number}[]}
 */
let scores = [{score: 0}]
let lastName, score = 0

const player = new Player()

if (localStorage.scores) {
    scores = JSON.parse(localStorage.scores)
    drawScores()
}

let obs = Obstacle.getRandom()
Floor.transformRandom()

async function run() {
    while (Player.run) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (!obs.collided && player.x < obs.x + obs.width &&
            player.x + Player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + Player.height > obs.y) {
    
            for (let i = 0; i < 5; i++) {
                if (score > scores[i].score) {
                    let name = prompt("Digite um nome:", lastName)
                    if (name) {
                        name = name.trim()
                        let pre = scores.findIndex(e => e.name == name)
                        if (pre != -1) {
                            if (scores[pre].score < score) {
                                scores.splice(pre, 1)
                                scores.push({name: name, score})
                                lastName = name
                            }
                        } else {
                            scores.push({name: name, score})
                            lastName = name
                        }
                        drawScores()
                        localStorage.scores = JSON.stringify(scores)
                    }
                    break
                }
            }
    
            score = 0
            Obstacle.speed = Obstacle.minSpeed
            obs.collided = true
        }

        Floor.floor.tick()
        obs.tick()
        player.tick()
    
        if (obs.change) obs = Obstacle.getRandom()

        scoreSpan.innerText = score
        score++
        speedSpan.innerText = Obstacle.speed.toFixed(2)
        jumpSpan.innerText = player.jumpHeight
        gravitySpan.innerText = player.gravity.toFixed(2)

        await new Promise(r => setTimeout(r, 16))
    }
}

export function drawScores() {
    scores.sort((a, b) => b.score - a.score)
    scores = scores.slice(0, 5)

    scoresE.innerHTML = ''
    for (let i = 0; i < scores.length; i++) {
        let li = document.createElement('li')
        li.innerText = (scores[i].name ? scores[i].name + ': ' : "") + scores[i].score
        scoresE.append(li)
    }
}

function moveAside(key) {
    Player.x += key == 'a' ? -1 : 1
}

document.addEventListener('keydown', e => {
    if (['Escape', ' '].includes(e.key)) {
        if (!Player.run) {
            e.preventDefault()
            Player.run = true
            run()
        } else if (e.key == 'Escape') {
            Player.run = false
        }
    } else if ('ad'.includes(e.key)) {
        moveAside(e.key)
    }
})