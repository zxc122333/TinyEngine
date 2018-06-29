import { Canvas } from "./canvas";
import {EventMixin} from "./eventMixin"
export class Engine extends EventMixin{
    constructor(){
        super()
        this.canvas = new Canvas()
        this.canvas._active = true
        this.canvas.engine = this
        this.updateTimer = null
    }
    update(){
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
        
        this.canvas._callUpdate()
        this.canvas._renderCanvas()
    }
    start(){
        if(this.updateTimer !== null)
            return

        this.emit("start")
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
    }
    stop(){
        if(this.updateTimer === null)
            return
        
        cancelAnimationFrame(this.updateTimer)
        this.updateTimer = null
        this.emit("stop")
    }

    static mixin(targetClass,mixin){
        if(typeof(targetClass)!="function"){
            throw Error("mixin target must be class")
        }
        if(typeof(mixin)!="function"){
            throw Error("mixin must be class")
        }

        if(!targetClass.__mixin__){
            targetClass.__mixin__ = [mixin]
        }else{
            targetClass.__mixin__.push(mixin)
        }

        targetClass.prototype = {...targetClass.prototype,...mixin.prototype}
        targetClass.prototype = {__proto__:targetClass.prototype}
        Object.assign(targetClass.prototype,mixin.prototype)
    }
}

export { Label } from "./label"
export { Node } from "./node"
export { Sprite } from "./sprite"
export { Touch,TouchManager } from "./touch"
export { EventMixin } from "./eventMixin"
export { TouchEventMixin } from "./touchEventMixin"
export { ScrollList }from "./scrollList"
export {ResourceLoader} from "./resource"