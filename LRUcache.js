let cache1 = [,];
let cache2 = [,];  //buffer array 
function LRUcache(key, value){
    cache2 = [key, value];
    return cache2[0];
}
module.exports = LRUcache;
