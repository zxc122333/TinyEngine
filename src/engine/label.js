import {Node} from "./node"
export class Label extends Node{
    constructor(){
        super()
        this.text = ""
    }
    render(ctx){
        ctx.font="30px";
        ctx.fillStyle="#FF0000";
        ctx.fillText(this.text,0,0);
    }
}