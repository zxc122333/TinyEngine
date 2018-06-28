import {
    Label,
    Node,
    Sprite,
    Touch,
    TouchManager,
    EventMixin,
    TouchEventMixin,
    ScrollList,
    Engine,
} from "./engine"
import { RankLayer } from "./rank/rankLayer";

var engine = new Engine()

engine.start()

var rankLayer = new RankLayer()
rankLayer.width = this.canvas.width
rankLayer.height = this.canvas.height
engine.canvas.addChild(rankLayer)

//touch all modules for build size
console.log(    
    Label,
    Node,
    Sprite,
    Touch,
    TouchManager,
    EventMixin,
    TouchEventMixin,
    ScrollList
)

setInterval(function(){
    label.text = label.text == "Hello World!" ? "" :"Hello World!"
},500)