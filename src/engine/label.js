import {Node} from "./node"
export class Label extends Node{
    constructor(init){
        super(init)
        this.text = this.text || "Label"
        this.font = this.font || "30px"
        this.fillStyle = this.fillStyle || "#000000"
    }
    render(ctx,a,b,c,d,e,f){
        ctx.setTransform(a, b,c,d,this.x + e,this.y + f)
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text,0,0);
    }
}