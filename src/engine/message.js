import { EventMixin } from "./eventMixin";

export class MessageManager extends EventMixin{
    static addon(engine){
        engine.messageManager = engine.messageManager || new MessageManager(engine)
    }
    constructor(engine){
        this._engine = engine
        wx.onMessage(data => {
            this.emit("message",data)
        })
    }
}