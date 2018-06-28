import {Node} from "./node"
export class Sprite extends Node{
    constructor(init){
        super(init)
        this.image = this.image || null
        this.patch9 = this.patch9 || null
    }

    render(ctx){
        if(!this.image)return
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
        ctx.drawImage(this.image,    px,     0,    pw-px,       py,           px,            0, w-px-(rw-px-pw),              py) // 上
        ctx.drawImage(this.image, px+pw,     0, rw-px-pw,       py, w-(rw-px-pw),            0,      (rw-px-pw),              py) // 右上
        ctx.drawImage(this.image,     0,    py,       px,    ph-py,            0,           py,              px, h-py-(rw-py-pw)) // 左
        ctx.drawImage(this.image,     0,    py,    pw-px,    ph-py,           px,           py, w-px-(rw-px-pw), h-py-(rw-py-pw)) // 中
        ctx.drawImage(this.image,     0,    py, rw-px-pw,    ph-py, w-(rw-px-pw),           py,      (rw-px-pw), h-py-(rw-py-pw)) // 右
        ctx.drawImage(this.image,     0, py+ph,       px, rh-ph-py,            0, h-(rh-py-ph),              px,        rw-py-pw) // 左下
        ctx.drawImage(this.image,    px, py+ph,    pw-px, rh-ph-py,           px, h-(rh-py-ph), w-px-(rw-px-pw),        rw-py-pw) // 下
        ctx.drawImage(this.image, px+pw, py+ph, rw-px-pw, rh-ph-py, w-(rw-px-pw), h-(rh-py-ph),      (rw-px-pw),        rw-py-pw) // 右下
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