import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class Floor {
    /**
     * @type {Floor}
     */
    static floor
    /**
     * @param {number} width
     * @param {number} height
     * @param {string} color 
     */
     constructor(width, height, color) {
        this.width = parseInt(width)
        this.height = parseInt(height)
        this.color = color
        this.x = canvas.width
        this.y = canvas.height - (Math.random() < 0.3 ? parseInt(Player.size * (1 + Math.random())) : 0)
    }

    tick() {
        this.x -= Math.floor(Obstacle.speed)
        if (this.x < 0 - this.width) Floor.transformRandom()
        this.draw()
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    static transformRandom() {
        Floor.floor = floors[Math.floor(Math.random() * floors.length)]()
    }
}

/**
 * @type {Floor[]}
 */
const floors = [
    () => new Floor(canvas.width * 0.3, 5, '#000'),
    () => new Floor(canvas.width * 0.02, canvas.width * 0.1, '#000'),
    () => new Floor(canvas.width / 2, 3, '#000'),
]