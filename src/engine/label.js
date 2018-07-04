import {Node} from "./node"
export class Label extends Node{
    constructor(init){
        super(init)
        this.text = this.text === undefined ? "Label" : this.text
        this.font = this.font || "30px"
        this.textBaseline = this.textBaseline || "top"
        this.fillStyle = this.fillStyle || "#000000"
    }
    render(ctx,a,b,c,d,e,f){
        ctx.setTransform(a, b,c,d,e,f)
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.textBaseline = this.textBaseline
        ctx.fillText(this.text,0,0);
    }
}