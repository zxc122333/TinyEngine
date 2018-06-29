import { EventMixin } from "./eventMixin";

export function TouchEventMixin(init){
    if(this.__mixinTouchEvent__){
        return
    }
    
    this.__mixinTouchEvent__ = true
    if(!this.__mixinEvent__){
        this.mixin(EventMixin)
    }

    this.touchLayer = 10
    if(init && init.$touchMixin && init.$touchMixin.layer != undefined){
        this.touchLayer = init.$touchEventMixin.layer
    }
    this.on("enter",()=>{
        this.engine.touchManager.addLayer(this.touchLayer,this)
    })

    this.on("exit",()=>{
        this.engine.touchManager.removeLayer(this)
    })
}

TouchEventMixin.prototype.onTouchBegin = function(touch){
    var local = this.globalToLocal(touch.current.x,touch.current.y)
    if(this.isInside(local.x,local.y)){
        this.emit("touchBegin",touch,local)
        return true
    }
}
TouchEventMixin.prototype.onTouchMove = function(touch){
    this.emit("touchMove",touch)
}
TouchEventMixin.prototype.onTouchEnd = function(touch){
    this.emit("touchEnd",touch)
}
TouchEventMixin.prototype.onTouchCancel = function(touch){
    this.emit("touchCancel",touch)
}
TouchEventMixin.prototype.onTouchTap = function(touch){
    this.emit("touchTap",touch)
}