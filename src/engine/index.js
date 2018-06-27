import { Canvas } from "./canvas";
import {ResourceLoader} from "./resource"

export class Engine{
    constructor(){
        this.canvas = new Canvas()
        this.updateTimer = null
        this.loader = new ResourceLoader()
    }
    update(){
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
        this.canvas.update()
        this.canvas._renderCanvas()
    }
    start(){
        if(this.updateTimer !== null)
            return
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
    }
    stop(){
        if(this.updateTimer === null)
            return
        
        cancelAnimationFrame(this.updateTimer)
        this.updateTimer = null
    }
}

export { Label } from "./label"
export { Node } from "./node"
export { Sprite } from "./sprite"
export { Touch } from "./touch"