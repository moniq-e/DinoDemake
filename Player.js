import { Floor } from "./Floor.js"
import { Obstacle } from "./Obstacle.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class Player {
    static run = true
    static size = parseInt(canvas.width * 0.1)
    jumpSpeed = 7
    jumps = 0
    fall = false

    constructor() {
        this.x = canvas.width / 2 - Player.size / 2
        this.y = canvas.height - Player.size
        this.yvel = 0

        this.setListener()
    }

    tick() {
        this.y -= this.yvel
        this.yvel--
        this.jumpSpeed = 7 + parseInt(Obstacle.speed * 0.25)

        if (this.y > canvas.height - Player.size) {
            this.y = canvas.height - Player.size
            this.yvel = 0
            this.jumps = 0
        } else if (this.y < 0) {
            this.y = 0
            this.yvel = 0
        } else if (this.x < Floor.floor.x + Floor.floor.width &&
            this.x + Player.size > Floor.floor.x &&
            this.y < Floor.floor.y + Floor.floor.height &&
            this.y + Player.size > Floor.floor.y) {

            this.y = Floor.floor.y - Player.size
            this.yvel = 0
            this.jumps = 0
            this.fall = true
        } else if (this.x > Floor.floor.x + Floor.floor.width && this.fall) {
            this.fall = false
            this.yvel = this.jumpSpeed
        }
        this.draw()
    }

    draw() {
        ctx.fillStyle = '#000'
        ctx.fillRect(this.x, this.y, Player.size, Player.size)
    }

    setListener() {
        document.addEventListener("click", _ => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
        })
        document.addEventListener("keydown", e => {
            if (Player.run) {
                switch (e.key) {
                    case " ":
                        if (this.jumps < 2) {
                            this.yvel = this.jumpSpeed
                            this.jumps++
                        }
                        break
                    default:
                        break
                }
            }
        })
    }
}