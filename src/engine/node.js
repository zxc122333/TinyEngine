export class Node{
    constructor(init){
        this._init = init

        this._children = []
        this._parent = null
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0

        this._active = true
        this.engine = null
        if(this.__mixin__){
            for(var i =0;i<this.__mixin__.length;i++){
                this.__mixin__[i].call(this,init)
            }
        }
        if(init){
            for(var key in init){
                if(key[0] == "$"){
                    continue
                }
                this[key] = init[key]
            }
        }
    }
    get active(){
        return this._active
    }
    set active(value){
        if(this._active == value){
            return
        }
        this._active = value
        if(!this.engine){
            return
        }
        if(value){
            this._callOnEnter(this.engine)
        }else if(!value){
            this._callOnExit(this.engine)
        }
    }
    addChild(child){
        // console.log(child)
        this._children.push(child)
        child._parent = this
        if(this._attached){
            child._call
        }
        if(this._active && this.engine){
            child._callOnEnter(this.engine)
        }
        if(this.onAddChild){
            this.onAddChild(child)
        }
    }

    removeChild(child){
        var index = this._children.indexOf(child)
        if(index==-1){
            return
        }
        this._children.splice(index,1)
        if(this._active && this.engine){
            child._callOnExit(null)
        }
        if(this.onRemoveChild){
            this.onRemoveChild(child)
        }
    }

    removeAllChildren(){
        while(this._children.length){
            var child = this._children.shift()
            if(this._active && this.engine){
                child._callOnExit(null)
            }
            if(this.onRemoveChild){
                this.onRemoveChild(child)
            }
        }
    }

    removeFromParent(){
        if(this._parent === null){
            return
        }
        this._parent.removeChild(this)
    }

    _callOnEnter(engine){
        this.engine = engine
        if(!this._active){
            return
        }
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callOnEnter(engine)
        }
        if(this.onEnter){
            this.onEnter()
        }
        if(this.__mixinEvent__){
            this.emit("enter")
        }
    }
    _callOnExit(engine){
        if(!this._active){
            return
        }
        if(this.onExit){
            this.onExit()
        }
        if(this.__mixinEvent__){
            this.emit("exit")
        }
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callOnExit(engine)
        }
        this.engine = engine
    }
    _callUpdate(dt){
        for(var i =0;i<this._children.length;i++){
            this._children[i]._callUpdate(dt)
        }
        if(this.update){
            this.update(dt)
        }
    }

    _render(ctx,a,b,c,d,e,f){
        this.render && this.render(ctx,a,b,c,d,this.x + e,this.y + f)
        for(var i=0;i<this._children.length;i++){
            this._children[i]._render(ctx,a,b,c,d,this.x + e,this.y + f)
        }
    }

    mixin(plugin){
        this.__proto__ = {__proto__:this.__proto__}
        Object.assign(this.__proto__,plugin.prototype)
        
        plugin.call(this,this._init)
    }

    localToGlobal(x,y){
        if(this._parent == null)return {x:0,y:0}
        return this._parent.localToGlobal(this.x + x,this.y + y)
    }

    globalToLocal(x,y){
        if(this._parent == null)return {x:0,y:0}
        var parent = this._parent.globalToLocal(x,y)
        return {x:parent.x - this.x,y:parent.y - this.y}
    }

    isInside(x,y){
        return x > 0 && x< this.width && y > 0 && y< this.height
    }
}