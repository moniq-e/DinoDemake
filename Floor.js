import { Obstacle } from "./Obstacle.js"

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

        const chance = Math.random()
        if (chance < 0.3) {
            this.y = canvas.height - parseInt((canvas.width * 0.1) * (1.2 + Math.random()))
            if (chance < 0.15) this.slow = true
        } else {
            this.y = canvas.height
        }
    }

    tick() {
        this.x -= Obstacle.speed / (this.slow ? 2 : 1)
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
    () => new Floor(canvas.width / 2, 3, '#000'),
]