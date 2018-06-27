import {Node} from "./node"
export class Sprite extends Node{
    constructor(){
        super()
        this.image = null
    }

    render(ctx){
        if(!this.image)return
        ctx.drawImage(this.image, 0, 0, this.width, this.height)
    }

    fitImgSize(){
        this.width = this.image.width
        this.height = this.image.height
    }

    wait(loadPromise, autoFitImgSize){
        loadPromise.then(image =>{
            this.image = image
            if(autoFitImgSize){
                this.fitImgSize()
            }
        })
    }
}