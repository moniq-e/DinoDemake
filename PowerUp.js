import { Obstacle } from "./Obstacle.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class PowerUp {
    /**
     * @type {PowerUp}
     */
    static powerup
    constructor() {
        this.x = canvas.width
        this.r = 4

        const chance = Math.random()
        if (chance < 0.1) {
            this.y = parseInt((Math.random() * canvas.height * 0.75) + this.r)
            if (chance < 0.05) this.slow = true
        } else {
            this.y = canvas.height + this.r
        }
    }

    tick() {
        this.x -= Obstacle.speed / (this.slow ? 2 : 1)
        if (this.x < 0) PowerUp.transformRandom()
        this.draw()
    }

    draw() {
        ctx.fillStyle = randomRGB()
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    static transformRandom() {
        PowerUp.powerup = new PowerUp()
    }
}

/**
 * @returns {string}
 */
function randomRGB() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    
    return "rgb("+r+","+g+"," +b+" )"
}