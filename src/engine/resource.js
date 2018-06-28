var instance = null

export class ResourceLoader{
    static get instance(){
        if(!instance){
            instance = new ResourceLoader()
        }
        return instance
    }

    constructor(){
        this._cache = {}
        this._loading = {}
    }
    loadImgAuto(src){
        if(this._cache[src]){
            return this._cache[src]
        }
        var image = wx.createImage()
        image.src = src
        this._cache[src] = image
        return image
    }
    loadImgAsync(src){
        if(this._cache[src]){
            return new Promise(resolve=>resolve(this._cache[src]))
        }
        if(this._loading[src]){
            return this._loading[src]
        }
        var image = wx.createImage()
        image.src = src
        var p = new Promise((resolve)=>{
            image.onload = ()=>{
                delete this._loading[src]
                this._cache[src] = image
                resolve(image)
            }
        })
        this._loading[src] = p
        return p
    }
}