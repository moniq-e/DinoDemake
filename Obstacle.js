import { Player } from "./Player.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class Obstacle {
    static minSpeed = 5
    static speed = 5
    static maxSpeed = 12
    /**
     * @param {number} width
     * @param {number} height
     * @param {string} color 
     */
    constructor(width, height, color) {
        this.width = width
        this.height = height
        this.color = color
        this.x = canvas.width
        this.y = canvas.height - this.height
        this.collided = false
    }

    tick() {
        this.x -= Math.floor(Obstacle.speed)
        Obstacle.speed = Player.options.infinity ? Obstacle.speed + 0.01 : Math.min(Obstacle.maxSpeed, Obstacle.speed + 0.01)
        if (this.x < 0 - this.width) this.change = true
        this.draw()
    }

    draw() {
        ctx.fillStyle = "#000"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 1)
    }

    /**
     * @returns {Obstacle}
     */
    static getRandom() {
        return obstacles[Math.floor(Math.random() * obstacles.length)]()
    }
}

/**
 * @type {Obstacle[]}
 */
 const obstacles = [
    () => new Obstacle(20, 20, '#E8005E'),
    () => new Obstacle(30, 10, '#FF4D00'),
    () => new Obstacle(10, 20, '#12F3EA')
]