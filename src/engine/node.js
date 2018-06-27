export class Node{
    constructor(){
        this._children = []
        this._parent = null
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0

        this._active = false
        this.engine = null
        if(this.__mixin__){
            for(var i =0;i<this.__mixin__.length;i++){
                this.__mixin__[i].call(this)
            }
        }
    }

    addChild(child){
        // console.log(child)
        this._children.push(child)
        child._parent = this
        if(this._active){
            child._callOnEnter()
        }
    }

    removeChild(child){
        var index = this._children.indexOf(child)
        if(index==-1){
            return
        }
        this._children.splice(index,1)
        if(this._active){
            child._callOnExit()
        }
    }

    removeFromParent(){
        if(this._parent === null){
            return
        }
        this._parent.removeChild(this)
    }

    _callOnEnter(engine){
        this._active = true
        this.engine = engine
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callOnEnter()
        }
        if(this.onEnter){
            this.onEnter()
        }
        if(this.__mixinEvent__){
            this.emit("enter")
        }
    }
    _callOnExit(){
        this._active = false
        this.engine = null
        if(this.onExit){
            this.onExit()
        }
        if(this.__mixinEvent__){
            this.emit("exit")
        }
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callOnExit()
        }
    }
    _callUpdate(){
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callUpdate()
        }
        if(this.update){
            this.update()
        }
    }

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