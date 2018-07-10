import {Node} from "./node"
export class ScrollView extends Node{
    constructor(init){
        super(init)
        this.maxY = 0
        this.scrollY = 0
        this.speed = 0
        this._last5move = []
        this._last5time = []
        this.brake=0.2
    }
    onEnter(){
        this.calculate()
    }
    onAddChild(){
        this.calculate()
    }
    onRemoveChild(){
        this.calculate()
    }
    calculate(){
        this.maxY = 0
        for(var i =0;i<this._children.length;i++){
            this.maxY = Math.max(this.maxY,this._children[i].y + this._children[i].height)
        }
        this.maxY = this.maxY - this.height
    }
    update(dt){
        if(this.speed==0){
            return
        }

        var dy = this.speed * dt

        if(this.scrollY + dy >= 0){
            dy = -this.scrollY
            this.speed = 0
        }
        if(this.scrollY + dy < -this.maxY + this.height){
            dy = -(this.scrollY + this.maxY - this.height)
            this.speed = 0
        }

        if(dy == 0){
            return
        }

        this.scrollY += dy
        
        for(var i = 0;i<this._children.length;i++){
            this._children[i].y += dy
        }

        if(this.onScroll){
            this.onScroll(dy)
        }

        if(this.speed > 0){
            this.speed-=dt*0.001
            if(this.speed<0)this.speed =0
        }else{
            this.speed+=dt*0.001
            if(this.speed>0)this.speed =0
        }

        if(this.speed<0.03 && this.speed>-0.03){
            this.speed = 0
        }
    }
    onTouchBegin(touch){
        console.log("onTouchBegin1",touch.current.x,touch.current.y)
        if(this.maxY <= this.height){
            return
        }
        var local = this.globalToLocal(touch.current.x,touch.current.y)
        if(!this.isInside(local.x,local.y)){
            return
        }
        console.log("onTouchBegin2")
        this.speed =0
        this._last5move = []
        return true
    }
    onTouchMove(touch){
        var dy = touch.delta.y

        if(this.scrollY + dy >= 0){
            dy = -this.scrollY
        }
        if(this.scrollY + dy < -this.maxY + this.height){
            dy = -(this.scrollY + this.maxY - this.height)
        }

        if(dy == 0){
            return
        }

        this.scrollY += dy
        
        for(var i = 0;i<this._children.length;i++){
            this._children[i].y += dy
        }
        if(touch.distance>20){
            touch.swallow = true
        }
        if(this.onScroll){
            this.onScroll(dy)
        }

        this._gatherTouchMove(dy,touch.interval)
        console.log(this.scrollY,this.maxY,dy)
    }
    onTouchEnd(touch){
        if(this.scrollY>= 0){
            this.speed =0
            return
        }
        if(this.scrollY <= -this.maxY){
            this.speed=0
            return
        }
        this._gatherTouchMove(touch.delta.y,touch.interval)
        var totalTime = 0
        var totalMovement = 0
        for(var i =0;i<this._last5move.length;i++){
            totalMovement+=this._last5move[i]
            totalTime+=this._last5time[i]
        }
        if(totalTime<=0||totalTime>500){
            this.speed=0
            return
        }
        
        this.speed = totalMovement * (1-this.brake)/totalTime
        console.log("speed",this.speed)
    }
    onTouchCancel(touch){

    }
    _gatherTouchMove(dy,dt){
        this._last5move.push(dy)
        this._last5time.push(dt)
        if(this._last5move.length>5){
            this._last5move.shift()
            this._last5time.shift()
        }
    }
    onEnter(){
        this.engine.touchManager.addLayer(10,this)
    }
    onExit(){
        this.engine.touchManager.removeLayer(this)
    }
    _render(ctx,a,b,c,d,e,f){
        var canvasObj = this.engine._getTempCanvas(this.width,this.height)
        canvasObj.context.globalCompositeOperation = "source-over"
        canvasObj.context.setTransform(1,0,0,1,0,0)
        canvasObj.context.clearRect(0,0,this.width,this.height)

        for(var i=0;i<this._children.length;i++){
            this._children[i]._render(canvasObj.context,1,0,0,1,0,0)
        }
        
        ctx.setTransform(a,b,c,d,this.x+e,this.y+f)
        ctx.drawImage(canvasObj.canvas,0,0,this.width,this.height)
        this.engine._backTempCanvas(canvasObj)
    }
}

