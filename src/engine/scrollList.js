import {Node} from "./node"
export class ScrollList extends Node{
    constructor(init){
        super(init)
        this.scrollY = this.scrollY || 0
        this.minY = 0
    }
    onEnter(){
        this.engine.touchManager.addLayer(10,this)
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
        ctx.save()
        ctx.setTransform(a,b,c,d,this.x + e,this.y + f)
        ctx.rect(0,0,this.width,this.height);
        // ctx.stroke();
        ctx.clip();
        for(var i=0;i<this._children.length;i++){
            if(this._children[i].y > this.height || this._children[i].y + this._children[i].height < 0){
                continue
            }
            this._children[i]._render(ctx,a,b,c,d,this.x + e,this.y + f)
        }
        ctx.restore()
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