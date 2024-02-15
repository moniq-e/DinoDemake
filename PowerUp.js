import { Obstacle } from "./Obstacle.js"
import { speedSkill, gravitySkill, scoreSkill } from "./index.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

export class PowerUp {
    /**
     * @type {PowerUp}
     */
    static powerup
    constructor() {
        this.x = canvas.width
        this.width = 4
        this.height = 4
        this.speed = .75

        const chance = Math.random()
        if (chance < 0.1) {
            this.y = parseInt((Math.random() * canvas.height * 0.75))
            if (chance < 0.05) this.speed = .5
        } else {
            this.y = canvas.height
            this.speed = 1
        }
    }

    tick() {
        this.x -= Obstacle.speed * this.speed
        if (this.x < 0) PowerUp.transformRandom()
        this.draw()
    }

    draw() {
        ctx.fillStyle = randomRGB()
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    collided() {
        this.y = canvas.height
        skills[Math.floor(Math.random() * skills.length)]()
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

const skills = [
    speedSkill,
    gravitySkill,
    scoreSkill
]