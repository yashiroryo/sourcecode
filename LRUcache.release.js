let cache1 = [0, 0];
let cache2 = [0, 0];
class LRU{
    //insert data
    put(key, value){
        cache1 = cache2;
        cache2 = [key, value];
    }
    //get data
    get(){

    }
}