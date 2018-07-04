import { Node, Label, Sprite, ResourceLoader } from "../engine";
import { Clip } from "../engine/clip";
import { Cycle } from "./cycle";

export class RankNode extends Node{
    constructor(init){
        super(init)
        this.height = 100
        {
            this.head = new Sprite({width:132,height:132})
            this.addChild(this.head)
        }
        {
            this.label = new Label({text:""})
            this.addChild(this.label)
        }

    }
    setData(data){
        console.log("setData",data.name)
        this.data = data
        this.label.text = data.name
        this.head.wait(ResourceLoader.instance.loadImgAsync(this.data.img),false)
    }
}