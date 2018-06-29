import { Node, Label } from "../engine";

export class RankNode extends Node{
    constructor(init){
        super(init)
        this.height = 100
        this.label = new Label({text:this.data.name})
        this.addChild(this.label)
    }
}