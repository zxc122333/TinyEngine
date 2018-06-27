import { EventMixin } from "./eventMixin";

export class TouchEventMixin{
    constructor(){
        if(this.__mixinTouchEvent__){
            return
        }
        
        this.__mixinTouchEvent__ = true
        if(!this.__mixinEvent__){
            this.mixin(EventMixin)
        }
    }
    listenTouch(engine,layerIndex){
        if(!engine.touchManager){
            throw new Error("use `TouchManager.addon(engine)` before listenTouch.")
        }
        engine.touchManager.addLayer(layerIndex,this)
    }
    onTouchBegin(touch){
        this.emit("touchBegin",touch)
    }
    onTouchMove(touch){
        this.emit("touchMove",touch)
    }
    onTouchEnd(touch){
        this.emit("touchEnd",touch)
    }
    onTouchCancel(touch){
        this.emit("touchCancel",touch)
    }
    onTouchTap(touch){
        this.emit("touchTap",touch)
    }
}