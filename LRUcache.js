let cache1 = [,];
let cache2 = [,];  //buffer array 
function input(key, value){
    cache2 = [key, value];
    return cache2[0];
}
module.exports = input;
