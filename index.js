import { Player } from "./Player.js"
import { Obstacle } from "./Obstacle.js"
import { Floor } from "./Floor.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const speedSpan = document.querySelector("span#spe")
const jumpSpan = document.querySelector("span#jum")
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
            player.x + Player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + Player.size > obs.y) {
    
            for (let i = 0; i < 5; i++) {
                if (score > scores[i].score) {
                    let name = prompt("Digite um nome:", lastName)
                    if (name) {
                        let pre = scores.findIndex(e => e.name == name)
                        if (pre != -1) {
                            if (scores[pre].score < score) {
                                scores.splice(pre, 1)
                                scores.push({name: name.trim(), score})
                                lastName = name.trim()
                            }
                        } else {
                            scores.push({name: name.trim(), score})
                            lastName = name.trim()
                        }
                        drawScores()
                        localStorage.scores = JSON.stringify(scores)
                    }
                    break
                }
            }
    
            score = 0
            Obstacle.speed = 5
            obs.collided = true
        }

        obs.tick()
        Floor.floor.tick()
        player.tick()
    
        if (obs.change) obs = Obstacle.getRandom()
    
        scoreSpan.innerText = score
        score++
        speedSpan.innerText = parseInt(Obstacle.speed)
        jumpSpan.innerText = player.jumpSpeed
    
        await new Promise(r => setTimeout(r, 30))
    }
}
run()

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

document.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        if (!Player.run) {
            Player.run = true
            run()
        } else {
            Player.run = false
        }
    }
})