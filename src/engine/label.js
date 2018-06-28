import {Node} from "./node"
export class Label extends Node{
    constructor(init){
        super(init)
        this.text = this.text || "Label"
        this.font = this.font || "30px"
        this.fillStyle = this.fillStyle || "#FFFFFF"
    }
    render(ctx){
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text,0,0);
    }
}