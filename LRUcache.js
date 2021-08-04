let cache1 = [0,0];
let cache2 = [0,0];  //buffer array 
function LRUcache(key, value){
    cache1 = cache2;
    cache2 = [key, value];
    return cache2[0];
}
module.exports = LRUcache;
