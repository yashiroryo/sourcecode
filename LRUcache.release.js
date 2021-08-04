let cache1 = [0, 0];
let cache2 = [0, 0];
class LRU{
    //insert data
    put(key, value){
        cache1 = cache2;
        cache2 = [key, value];
    }
    //get data
    get(key){
        if(cache2[0] == key){
            console.log(cache2[1]);
        }
        else if(cache1[0] == key){
            let cache3 = cache1;
            cache1 = cache2;
            cache2 = cache3;
            console.log(cache2[1]);
        }
        else{
            console.log("null");
        }
    }
}