//LRUcache program
let cache1 = [0, 0];	//キャッシュ用配列
let cache2 = [0, 0];	//2が一番最近にアクセスされたキャッシュ
//LRU クラス
class LRU{
    //putメソッド
    put(key, value){
    	//引数はcache2から代入
        cache1 = cache2;
        cache2 = [key, value];
    }
    //getメソッド
    get(key){
    	//keyが一番新しいキャッシュと一致する場合
        if(cache2[0] == key){
            //一番新しいキャッシュにアクセスしたので、順番に変更なし
            console.log(cache2[1]);
        }
        //keyが2番目のキャッシュと一致する場合
        else if(cache1[0] == key){
            //一番新しいキャッシュが更新される
            let cache3 = cache1;
            cache1 = cache2;
            cache2 = cache3;
            console.log(cache2[1]);
        }
        //キャッシュに該当なし(すでに上書きされた)
        else{
            console.log("null");
        }
    }
}
//test
const lru = new LRU();
lru.put("a", "dataA");
lru.put("b", "dataB");
lru.get("a");
lru.put("c", "dataC");
lru.get("b");
