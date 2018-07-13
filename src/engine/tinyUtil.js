import { MessageManager } from "./message";
import { EventMixin } from "./eventMixin";

export class TinyUtil extends EventMixin{
    static addon(engine){
        if(!engine.messageManager){
            MessageManager.addon(engine)
        }
        engine.tineUtil = engine.tineUtil || new TinyUtil(engine)
    }
    constructor(engine){
        this._engine = engine
        engine.messageManager.on("message",this._onMessagge.bind(this))
    }
    _onMessagge(msg){
        if(!msg || !msg.__tinyUtil__){
            this.emit("illegal",msg)
            return
        }
        switch(msg.type){
            case "start":
                this._engine.start()
                break
            case "stop":
                this._engine.stop()
                break
            case "scale":
                this._engine.scale(msg.data.x,msg.data.y)
            case "user":
                this.emit("msg",msg.data)
                this.emit(data.type,data.data)
        }
    }
}