var rankData = []

for(var i =0;i<100;i++){
    rankData.push({
        name:"玩家"+i,
        level: Math.floor(Math.random() * 99) + 1,
        gold: Math.floor(Math.random() * 100000),
        score: Math.floor(Math.random() * 100000),
    })
}

export function getRankData(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(rankData)
        },2000)
    })
}