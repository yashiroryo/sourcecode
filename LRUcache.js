let cache1 = ["A","dataA"];
let cache2 = ["C","dataC"];  //buffer array 
function LRUcache(key){
    if(cache2[0] == key){
        console.log(cache2[1]);
    }
    else if(cache1[0] == key){
        let cache3 = cache1;
        cache1 = cache2;
        cache2 = cache3;
        console.log(cache2[0]);
    }
    else{
        return null;
    }
}
module.exports = LRUcache;
