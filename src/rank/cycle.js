import {Node} from "../engine"
export class Cycle extends Node{
    constructor(init){
        super(init)
        this.r = this.r||0
    }
    render(ctx,a,b,c,d,e,f){
        ctx.fillStyle = "#000000"
        ctx.beginPath();
        ctx.arc(this.width/2,this.height/2,this.r,0,2*Math.PI)
        ctx.fill()
        // ctx.fillRect(0,0,15,15)
        
    }
}