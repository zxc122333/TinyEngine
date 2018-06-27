export class Node{
    
    constructor(){
        this._children = []
        this._parent = null
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
    }

    addChild(child){
        // console.log(child)
        this._children.push(child)
        child._parent = this
    }

    removeFromParent(){
        if(this._parent === null){
            return
        }
        this._parent._children.splice(this._parent._children.indexOf(this),1)
    }

    update(){/*stub*/}

    _render(ctx){
        ctx.save()
        ctx.translate(this.x,this.y)
        this.render(ctx)
        for(var i=0;i<this._children.length;i++){
            this._children[i]._render(ctx)
        }
        ctx.restore()
    }
    render(ctx){/*stub*/}
}