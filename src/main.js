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
TouchManager.addon(engine)

engine.start()

var rankLayer = new RankLayer({
    width:engine.canvas.width,
    height:engine.canvas.height,
})
engine.canvas.addChild(rankLayer)

var label = new Label({text:"hello world!"})
label.x = 100
label.y = 100
engine.canvas.addChild(label)

//touch all modules for build size
// console.log(    
//     Label,
//     Node,
//     Sprite,
//     Touch,
//     TouchManager,
//     EventMixin,
//     TouchEventMixin,
//     ScrollList
// )

// setInterval(function(){
//     label.text = label.text == "Hello World!" ? "" :"Hello World!"
// },500)