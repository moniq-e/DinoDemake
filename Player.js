import { Floor } from "./Floor.js"
import { Obstacle } from "./Obstacle.js"
import { PowerUp } from "./PowerUp.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class Player {
    static options = {
        mousejump: false,
        hard: false,
        infinity: false
    }
    static run = false
    static width = parseInt(canvas.width * 0.1)
    static height = parseInt(canvas.width * 0.1)
    static minJumpHeight = 6
    gravity = 0.5
    jumpHeight = 0
    jumps = 0
    fall = false
    invincible = false

    constructor() {
        this.x = canvas.width / 2 - Player.width / 2
        this.y = canvas.height - Player.height
        this.yvel = 0

        this.setListener()
    }

    tick() {
        this.draw()
        this.y -= this.yvel
        this.yvel -= this.gravity
        this.jumpHeight = Player.minJumpHeight + parseInt(Obstacle.speed * 0.25)

        if (this.y > canvas.height - Player.height) {
            this.y = canvas.height - Player.height
            this.yvel = 0
            this.jumps = 0
        } else if (this.y < 0) {
            this.y = 0
            this.yvel--
        } else if (this.x < Floor.floor.x + Floor.floor.width &&
            this.x + Player.width > Floor.floor.x &&
            this.y < Floor.floor.y + Floor.floor.height &&
            this.y + Player.height > Floor.floor.y) {

            this.y = Floor.floor.y - Player.height
            this.yvel = 0
            this.jumps = 0
            this.fall = true
        } else if (this.x > Floor.floor.x + Floor.floor.width && this.fall) {
            this.fall = false
            this.yvel = this.jumpHeight
        } else if (this.x < PowerUp.powerup.x + PowerUp.powerup.width &&
            this.x + Player.width > PowerUp.powerup.x &&
            this.y < PowerUp.powerup.y + PowerUp.powerup.height &&
            this.y + Player.height > PowerUp.powerup.y) {

            PowerUp.powerup.collided()
        }
    }

    draw() {
        ctx.fillStyle = this.invincible ? 'rgba(0, 0, 0, 0.5)' : '#000'
        ctx.fillRect(this.x, this.y, Player.width, Player.height)
    }

    setListener() {
        document.querySelector("canvas").addEventListener("click", _ => {
            if (Player.options.mousejump && this.jumps < 2) {
                this.yvel = this.jumpHeight
                this.jumps++
            }
        })
        document.querySelector("canvas").addEventListener("touchstart", _ => {
            if (Player.options.mousejump && this.jumps < 2) {
                this.yvel = this.jumpHeight
                this.jumps++
            }
        })
        document.addEventListener("keydown", e => {
            if (Player.run) {
                if (e.key == " ") {
                    if (this.jumps < 2 || this.gravity == .25) {
                        this.yvel = this.jumpHeight
                        this.jumps++
                    }
                    e.preventDefault()
                }
            }
        })
    }
}