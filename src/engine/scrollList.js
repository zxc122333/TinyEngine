import {Node} from "./node"
export class ScrollList extends Node{
    constructor(init){
        super(init)
        this.scrollY = this.scrollY || 0
        this.minY = 0
        this._canvas = wx.createCanvas()
        this._ctx = this._canvas.getContext("2d")
    }
    onEnter(){
        this.engine.touchManager.addLayer(10,this)
        this._canvas.width = this.width
        this._canvas.height = this.height
    }
    onExit(){
        this.engine.touchManager.removeLayer(this)
    }

    relocation(){
        var curY = this.scrollY
        for(var i = 0;i<this._children.length;i++){
            this._children[i].y = curY
            curY += this._children[i].height
        }
        this.minY = curY - this.height
    }

    _render(ctx,a,b,c,d,e,f){
        this._ctx.setTransform(1,0,0,1,0,0)
        this._ctx.clearRect(0,0,this.width,this.height)
        for(var i=0;i<this._children.length;i++){
            if(this._children[i].y > this.height || this._children[i].y + this._children[i].height < 0){
                continue
            }
            this._children[i]._render(this._ctx,a,b,c,d,0,0)
        }
        ctx.setTransform(a,b,c,d,this.x + e,this.y + f)
        ctx.drawImage(this._canvas,0,0,this.width,this.height)
    }

    onTouchBegin(touch){
        if(!this.isInside(touch.current.x,touch.current.y)){
            return
        }
        return true
    }
    onTouchMove(touch){
        var dy = touch.delta.y
        this.scrollY += touch.delta.y

        if(this.scrollY > 0){
            dy = dy - this.scrollY
            this.scrollY = 0
        }else if(this.scrollY < -this.minY){
            dy = dy - (this.scrollY + this.minY)
            this.scrollY = -this.minY
        }

        for(var i = 0;i<this._children.length;i++){
            this._children[i].y += dy
        }
        if(touch.distance>20){
            touch.swallow = true
        }
    }
    onTouchEnd(touch){

    }
    onTouchCancel(touch){

    }
}