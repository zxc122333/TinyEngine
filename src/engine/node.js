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

    mixin(plugin){
        this.__proto__ = {...this.__proto__, ...plugin.prototype}
        plugin.call(this)
    }

    localToGlobal(x,y){
        if(this._parent == null)return {x:0,y:0}
        return this._parent.localToGlobal(this.x + x,this.y + y)
    }

    isInside(x,y){
        return x< this.width && y< this.height
    }
}