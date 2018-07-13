export class TinySDK{
    constructor(){
        this.openDataContext = wx.getOpenDataContext()
    }
    start(){
        this._sendMsg("start")
    }
    stop(){
        this._sendMsg("stop")
    }
    scale(x,y){
        this._sendMsg("scale",{x,y})
    }
    _sendMsg(type,data){
        this.openDataContext.postMessage({
            __tinyUtil__: true,
            type: type,
            data: data,
        })
    }
    sendMsg(type,data){
        this._sendMsg("user",{type,data})
    }
}