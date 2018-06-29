import {Node} from "./node"
export class Sprite extends Node{
    constructor(init){
        super(init)
        this.image = this.image || null
        this.patch9 = this.patch9 || null
    }

    render(ctx,a,b,c,d,e,f){
        if(!this.image)return
        ctx.setTransform(a, b,c,d,this.x + e,this.y + f)
        if(!this.patch9){
            ctx.drawImage(this.image, 0, 0, this.width, this.height)
            return
        }
        var px = this.patch9.x
        var py = this.patch9.y
        var pw = this.patch9.w
        var ph = this.patch9.h
        var rw = this.image.width
        var rh = this.image.height
        var w = this.width
        var h = this.height
        ctx.drawImage(this.image,     0,     0,       px,       py,            0,            0,              px,              py) // 左上
        ctx.drawImage(this.image,    px,     0,       pw,       py,           px,            0, w-px-(rw-px-pw),              py) // 上
        ctx.drawImage(this.image, px+pw,     0, rw-px-pw,       py, w-(rw-px-pw),            0,      (rw-px-pw),              py) // 右上
        ctx.drawImage(this.image,     0,    py,       px,       ph,            0,           py,              px, h-py-(rh-py-ph)) // 左
        ctx.drawImage(this.image,    px,    py,       pw,       ph,           px,           py, w-px-(rw-px-pw), h-py-(rh-py-ph)) // 中
        ctx.drawImage(this.image, px+pw,    py, rw-px-pw,       ph, w-(rw-px-pw),           py,      (rw-px-pw), h-py-(rh-py-ph)) // 右
        ctx.drawImage(this.image,     0, py+ph,       px, rh-ph-py,            0, h-(rh-py-ph),              px,        rh-py-ph) // 左下
        ctx.drawImage(this.image,    px, py+ph,       pw, rh-ph-py,           px, h-(rh-py-ph), w-px-(rw-px-pw),        rh-py-ph) // 下
        ctx.drawImage(this.image, px+pw, py+ph, rw-px-pw, rh-ph-py, w-(rw-px-pw), h-(rh-py-ph),      (rw-px-pw),        rh-py-ph) // 右下 
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