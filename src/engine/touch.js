
export class Touch{
    constructor(id,x,y){
        this.id = id
        this.begin = {x, y}
        this.beginAt = Date.now()
        this.current = {x, y}
        this.currentAt = this.beginAt
        this.delta = {x:0,y:0}
        this.interval = 0
        this.inviter = []
        this.swallow = false
    }

    _moveTo(x,y){
        var last = this.current
        var lastAt = this.currentAt
        this.current = {x,y}
        this.currentAt = Date.now()
        this.delta = {
            x: this.current.x - last.x,
            y: this.current.y - last.y,
        }
        this.interval = this.currentAt - lastAt
    }

    get distance(){
        var dx = this.current.x - this.begin.x
        var dy = this.current.y - this.begin.y
        return Math.sqrt(dx*dx+dy*dy)
    }
}

export class TouchManager{
    constructor(engine){
        this.engine = engine
        this.touch = null
        this.handlers = {
            begin:this._onTouchBegin.bind(this),
            move: this._onTouchMove.bind(this),
            end:this._onTouchEnd.bind(this),
            cancel:this._onTouchCancel.bind(this)
        }
        this.layers = []
        this.layerNodes = {}
    }

    _addListener(){
        wx.onTouchStart(this.handlers.begin)
        wx.onTouchMove(this.handlers.move)
        wx.onTouchEnd(this.handlers.end)
        wx.onTouchCancel(this.handlers.cancel)
    }

    _removeListener(){
        wx.offTouchStart(this.handlers.begin)
        wx.offTouchMove(this.handlers.move)
        wx.offTouchEnd(this.handlers.end)
        wx.offTouchCancel(this.handlers.cancel)
    }

    _onTouchBegin(arg){
        if(this.touch != null){
            return
        }
        if(args.changedTouches.length <= 0){
            return
        }

        var raw = args.changedTouches[0]

        this.touch = new Touch(raw.identifier,raw.screenX,raw.screenY)

        for(var i = 0;i<this.layers.length;i++){
            var layer = this.layerNodes[layer]
            for(var j =0;j<layer.length;i++){
                var result = layer[j].onTouchBegin(touch)
                if(result === true){
                    if(this.touch.swallow){
                        for(var k = 0;k< this.touch.inviter.length;k++){
                            if(this.touch.inviter[k].onTouchCancel){
                                this.touch.inviter[k].onTouchCancel(this.touch)
                            }
                        }
                        this.touch.inviter = [layer[j]]
                        return
                    }else{
                        this.touch.inviter.push(layer[j])
                    }
                }
            }
        }
    }
    _onTouchMove(arg){
        if(this.touch == null){
            return
        }
        if(args.changedTouches.length <= 0){
            return
        }
        var raw = null
        for(var i =0;i<args.changedTouches.length;i++){
            if(args.changedTouches[i].identifier == this.touch.id){
                raw = args.changedTouches[i]
            }
        }
        if(raw == null){
            return
        }
        this.touch.swallow = false
        for(var k = 0;k< this.touch.inviter.length;k++){
            if(this.touch.inviter[k].onTouchMove){
                this.touch.inviter[k].onTouchMove(this.touch)
                if(this.touch.swallow){
                    for(var i = 0;i< this.touch.inviter.length;i++){
                        if(i == k){
                            continue
                        }
                        if(this.touch.inviter[i].onTouchCancel){
                            this.touch.inviter[i].onTouchCancel(this.touch)
                        }
                    }
                    this.touch.inviter = [this.touch.inviter[k]]
                    return
                }
            }
        }
    }
    _onTouchEnd(arg){
        if(this.touch == null){
            return
        }
        if(args.changedTouches.length <= 0){
            return
        }
        var raw = null
        for(var i =0;i<args.changedTouches.length;i++){
            if(args.changedTouches[i].identifier == this.touch.id){
                raw = args.changedTouches[i]
            }
        }
        if(raw == null){
            return
        }
        for(var k = 0;k< this.touch.inviter.length;k++){
            if(this.touch.inviter[k].onTouchEnd){
                this.touch.inviter[k].onTouchEnd(this.touch)
            }
        }
        this.touch = null
    }
    _onTouchCancel(arg){
        if(this.touch == null){
            return
        }
        if(args.changedTouches.length <= 0){
            return
        }
        var raw = null
        for(var i =0;i<args.changedTouches.length;i++){
            if(args.changedTouches[i].identifier == this.touch.id){
                raw = args.changedTouches[i]
            }
        }
        if(raw == null){
            return
        }
        for(var k = 0;k< this.touch.inviter.length;k++){
            if(this.touch.inviter[k].onTouchCancel){
                this.touch.inviter[k].onTouchCancel(this.touch)
            }
        }
        this.touch = null
    }
}