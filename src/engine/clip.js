import {Node} from "./node"
export class Clip extends Node{
    constructor(init){
        super(init)
        this.mask = null
    }
    // _render(ctx,a,b,c,d,e,f){
    //     if(this.mask==null){
    //         Node.prototype._render.call(this,ctx,a,b,c,d,e,f)
    //         return
    //     }
    //     var canvasObj = this.engine._getTempCanvas(this.width,this.height)
    //     canvasObj.context.globalCompositeOperation = "source-over"
    //     canvasObj.context.setTransform(1,0,0,1,0,0)
    //     canvasObj.context.clearRect(0,0,this.width,this.height)
    //     canvasObj.context.fillStyle = "rgba(225,225,225,0.1)"
    //     this.mask._render(canvasObj.context,1,0,0,1,0,0)
    //     canvasObj.context.globalCompositeOperation = "source-atop"
    //     for(var i=0;i<this._children.length;i++){
    //         this._children[i]._render(canvasObj.context,1,0,0,1,0,0)
    //     }
        
    //     ctx.setTransform(a,b,c,d,this.x+e,this.y+f)
    //     ctx.drawImage(canvasObj.canvas,0,0,this.width,this.height)
    //     this.engine._backTempCanvas(canvasObj)
    // }
}