import {Node} from "./node"
export class ScrollList extends Node{
    constructor(){
        super()
        this.scrollY = 0
    }

    addChild(child){
        Node.prototype.addChild.call(this,child)
        this.relocation()
    }

    removeChild(child){
        Node.prototype.removeChild.call(this,child)
        this.relocation()
    }

    relocation(){
        var curY = this.scrollY
        for(var i = 0;i<this._children.length;i++){
            this._children[i].y = curY
            curY += this._children[i].height
        }
    }

    render(ctx){
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
        ctx.clip();
    }
    onTouchBegin(touch){
        if(!this.isInside(touch.current.x,touch.current.y)){
            return
        }
        return true
    }
    onTouchMove(touch){
        this.scrollY += touch.delta.y
        for(var i = 0;i<this._children.length;i++){
            this._children[i].y += touch.delta.y
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