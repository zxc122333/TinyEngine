import {
    Label,
    Node,
    Sprite,
    Touch,
    TouchManager,
    EventMixin,
    TouchEventMixin,
    ResourceLoader,
    ScrollList
} from "../engine"
import { getRankData } from "./fakeData";
import { RankNode } from "./rankNode";

export class RankLayer extends Node{
    constructor(init){
        super(init)
        
        {
            var tabs = new Node()
            tabs.x = 0
            tabs.width = this.width
            tabs.height = 100

            {
                let tab1Button = new Sprite()
                tab1Button.wait(ResourceLoader.instance.loadImgAsync("images/main_btn0.png"),false)
                tab1Button.patch9 = {x:25,y:16,w:10,h:5}
                tab1Button.width = this.width / 3
                tab1Button.height = 50
                tab1Button.x = 0
                tab1Button.y = 50
                tab1Button.mixin(TouchEventMixin)
                tab1Button.on("touchTap",this.switchTabGoldRank.bind(this))
                let label = new Label({text:"金币"})
                label.x = 10;
                label.y = 10;
                tab1Button.addChild(label)
                tabs.addChild(tab1Button)
            }
            {
                let tab2Button = new Sprite()
                tab2Button.wait(ResourceLoader.instance.loadImgAsync("images/main_btn0.png"),false)
                tab2Button.patch9 = {x:25,y:16,w:10,h:5}
                tab2Button.width = this.width / 3
                tab2Button.height = 50
                tab2Button.x = this.width / 3
                tab2Button.y = 50
                tab2Button.mixin(TouchEventMixin)
                tab2Button.on("touchTap",this.switchTabLevelRank.bind(this))
                let label = new Label({text:"等级"})
                label.x = 10;
                label.y = 10;
                tab2Button.addChild(label)
                tabs.addChild(tab2Button)
            }
            {
                let tab3Button = new Sprite()
                tab3Button.wait(ResourceLoader.instance.loadImgAsync("images/main_btn0.png"),false)
                tab3Button.patch9 = {x:25,y:16,w:10,h:5}
                tab3Button.width = this.width / 3
                tab3Button.height = 50
                tab3Button.x = 2* this.width / 3
                tab3Button.y = 50
                tab3Button.mixin(TouchEventMixin)
                tab3Button.on("touchTap",this.switchTabScoreRank.bind(this))
                let label = new Label({text:"战力"})
                label.x = 10;
                label.y = 10;
                tab3Button.addChild(label)
                tabs.addChild(tab3Button)
            }

            this.addChild(tabs)
        }

        var list = new ScrollList()
        list.width = this.width
        list.height = this.height - 100
        list.y = 100
        this.addChild(list)
        this.list = list
    }

    onEnter(){
        getRankData().then((data)=>{
            this.data = data
            this.switchTabGoldRank()
        })
    }

    onExit(){

    }
    switchTabGoldRank(){
        console.log("switchTabGoldRank")
        this.clear()
        if(!this.data)return
        for(var i=0;i<this.data.length;i++){
            var node = new RankNode({data:this.data[i],type:"gold"})
            this.list.addChild(node)
        }
        this.list.relocation()
    }
    switchTabLevelRank(){
        console.log("switchTabLevelRank")
        this.clear()
        for(var i=0;i<this.data.length;i++){
            var node = new RankNode({data:this.data[i],type:"rank"})
            this.list.addChild(node)
        }
        if(!this.data)return
    }
    switchTabScoreRank(){
        console.log("switchTabScoreRank")
        this.clear()
        for(var i=0;i<this.data.length;i++){
            var node = new RankNode({data:this.data[i],type:"score"})
            this.list.addChild(node)
        }
        if(!this.data)return
    }
    clear(){
        for(var i = this.list._children.length-1;i>=0;i--){
            var child = this.list._children[i]
            child.removeFromParent()
        }
    }
}