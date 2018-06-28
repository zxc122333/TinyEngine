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
                tab1Button.height = 100
                tab1Button.x = 0
                tab1Button.mixin(TouchEventMixin)
                tab1Button.on("touchTap",this.switchTabGoldRank.bind(this))
                let label = new Label({text:"金币"})
                tab1Button.addChild(label)
                tabs.addChild(tab1Button)
            }
            {
                let tab2Button = new Sprite()
                tab2Button.wait(ResourceLoader.instance.loadImgAsync("images/main_btn0.png"),false)
                tab2Button.patch9 = {x:25,y:16,w:10,h:5}
                tab2Button.width = this.width / 3
                tab2Button.height = 100
                tab1Button.x = this.width / 3
                tab2Button.mixin(TouchEventMixin)
                tab2Button.on("touchTap",this.switchTabLevelRank.bind(this))
                let label = new Label({text:"等级"})
                tab2Button.addChild(label)
                tabs.addChild(tab2Button)
            }
            {
                let tab3Button = new Sprite()
                tab3Button.wait(ResourceLoader.instance.loadImgAsync("images/main_btn0.png"),false)
                tab3Button.patch9 = {x:25,y:16,w:10,h:5}
                tab3Button.width = this.width / 3
                tab3Button.height = 100
                tab1Button.x = 2* this.width / 3
                tab3Button.mixin(TouchEventMixin)
                tab3Button.on("touchTap",this.switchTabScoreRank.bind(this))
                let label = new Label({text:"战力"})
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
    }

    onEnter(){
        this.switchTabGoldRank()
    }

    onExit(){

    }
    switchTabGoldRank(){

    }
    switchTabLevelRank(){

    }
    switchTabScoreRank(){

    }
}