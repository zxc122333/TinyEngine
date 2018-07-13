import {Node} from "./node"
export class Canvas extends Node{
    constructor(init){
        super(init)
        this._wxCanvas = wx.getSharedCanvas()
        this.ctx=this._wxCanvas.getContext('2d')
        this.width = this._wxCanvas.width
        this.height = this._wxCanvas.height
    }

    _renderCanvas(){
        this.ctx.setTransform(this._engine.scale.x,0,0,this.engine.scale.y,0,0)
        this.ctx.clearRect(0,0,this.width,this.height);
        for(var i=0;i<this._children.length;i++){
            this._children[i]._render(this.ctx,1,0,0,1,0,0)
        }
    }
    localToGlobal(x,y){
        return {x,y}
    }
    globalToLocal(x,y){
        return {x,y}
    }
}