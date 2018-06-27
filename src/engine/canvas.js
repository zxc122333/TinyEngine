import {Node} from "./node"
export class Canvas extends Node{
    constructor(){
        super()
        this._wxCanvas = wx.getSharedCanvas()
        this.ctx=this._wxCanvas.getContext('2d')
    }

    _renderCanvas(){
        this.ctx.save()
        this.ctx.fillStyle="#FFFFFF";
        this.ctx.fillRect(0,0,this._wxCanvas.width,this._wxCanvas.height);
        for(var i=0;i<this._children.length;i++){
            this._children[i]._render(this.ctx)
        }
        this.ctx.restore()
    }
    localToGlobal(x,y){
        return {x,y}
    }
}