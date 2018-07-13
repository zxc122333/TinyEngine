import { Canvas } from "./canvas";
import {EventMixin} from "./eventMixin"
export class Engine extends EventMixin{
    constructor(){
        super()
        this.canvas = new Canvas()
        this.canvas._active = true
        this.canvas.engine = this
        this.updateTimer = null
        this._lastUpdate = 0
        this._scale = {x:1,y:1}
        this._tempCanvas = {}
    }
    update(){
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
        var last =  this._lastUpdate
        this._lastUpdate = Date.now()
        this.canvas._callUpdate(this._lastUpdate - last)
        this.emit("update",this._lastUpdate - last)
        this.canvas._renderCanvas()
    }
    start(){
        if(this.updateTimer !== null)
            return

        this.emit("start")
        this._lastUpdate = Date.now()
        this.updateTimer = requestAnimationFrame(this.update.bind(this))
    }
    stop(){
        if(this.updateTimer === null)
            return
        
        cancelAnimationFrame(this.updateTimer)
        this.updateTimer = null
        this.emit("stop")
    }
    scale(x,y){
        this.scale.x = x
        this.scale.y = y
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
    
    _getTempCanvas(width,height){
        var id = width + "x" + height
        var canvases = this._tempCanvas[id] || (this._tempCanvas[id] = [])
        if(canvases.length ==0){
            var canvas = wx.createCanvas()
            console.log("create temp canvas:"+id)
            canvas.width = width
            canvas.height = height
            return {
                id:id,
                canvas: canvas,
                context: canvas.getContext("2d"),
            }
        }
        return canvases.pop()
    }
    _backTempCanvas(obj){
        var canvases = this._tempCanvas[obj.id] || (this._tempCanvas[id] = [])
        canvases.push(obj)
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
export {Tween,TweenGroup,TweenEasing,TweenInterpolation} from "./tween"