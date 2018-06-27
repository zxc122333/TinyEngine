import {Engine,Label,Sprite} from "./engine"

var engine = new Engine()

engine.start()

var label = new Label()
label.text = "Hello World!"
label.x = 50
label.y = 50
engine.canvas.addChild(label)

var sprite = new Sprite()
sprite.x = 200
sprite.y = 200
sprite.wait(engine.loader.loadImgAsync("images/enemy.png"),true)
engine.canvas.addChild(sprite)

setInterval(function(){
    label.text = label.text == "Hello World!" ? "" :"Hello World!"
},500)