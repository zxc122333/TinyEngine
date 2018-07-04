import { ScrollView } from "./scrollView";
export class ScrollList extends ScrollView{
    constructor(init){
        super(init)

        this.createNode = null
        this.nodeHeight = 0
        this.data = []
    }
    onEnter(){
        ScrollView.prototype.onEnter.call(this)
        if(this.createNode == null){
            throw Error("ScrollList.createNode is null")
        }
        if(this.nodeHeight == 0){
            throw Error("ScrollList.nodeHeight is 0")
        }
    }
    onScroll(dt){
        var minY = this.height
        var minNode = 0
        var maxY = 0
        var maxNode = 0
        for(var i =0;i<this._children.length;i++){
            if(minY > this._children[i].y){
                minY = this._children[i].y
                minNode = this._children[i]
            }
            if(maxY < this._children[i].y + this.nodeHeight){
                maxY = this._children[i].y + this.nodeHeight
                maxNode = this._children[i]
            }
        }
        if(minY>0&&minNode._scrollListIndex>0){
            maxNode._scrollListIndex = minNode._scrollListIndex-1
            maxNode.setData(this.data[minNode._scrollListIndex-1])
            maxNode.y = minY - this.nodeHeight
        }
        if(maxY < this.height && this.data.length > maxNode._scrollListIndex+1 ){
            minNode._scrollListIndex = maxNode._scrollListIndex+1
            minNode.setData(this.data[maxNode._scrollListIndex+1])
            minNode.y = maxY
        }
    }
    setData(data){
        this.data = data
        this.rebuild()
    }

    rebuild(){
        this.removeAllChildren()
        var height = 0
        var index = 0
        var maxNode = Math.ceil(this.height / this.nodeHeight)+1
        var nodeCount = 0
        while(true){
            if(nodeCount >= maxNode){
                break
            }
            if(index >= this.data.length){
                break
            }
            var node = this.createNode()
            node.y = height
            height += this.nodeHeight
            node.setData && node.setData(this.data[nodeCount])
            node._scrollListIndex = nodeCount
            this.addChild(node)
            nodeCount++
        }
        this.scrollY = 0
        this.maxY = this.nodeHeight * this.data.length
    }
}