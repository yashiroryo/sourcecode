//curlコマンドのクローン(commanderを使用しないバージョン)
//変数宣言*************************************************************
const args = process.argv;
let file_name = null;						  //出力するファイルの名前
//fetchメソッド用オプション
let method = 'GET';								//デフォルトはget
let param = null;
let header = false;
let output = false;    						//データ出力判定用(デフォルトは出力なし)
let cnt = 2;											//読み取りを開始するコマンドライン引数

//ファイルに出力する処理************************************************
function output(file_name, text){
	//書き込み
	fs.writeFile(file_name, text, (err) => {
		if(err)
			throw err;
		console.log("complete file output");
	});
}
//リクエスト処理部分****************************************************
function request(url, method, param, header, output){
	//fetchでリクエストを送信する
  fetch(url, {method: method, param: param})
    .then(res => {
      if (!res.ok) {
        // 200 系以外のレスポンスはエラーとして処理
        throw new Error(`${res.status} ${res.statusText}`);
      }
      //ヘッダーを表示する(初期値は表示しないに設定)
      if(header){
      	console.log(res.headers.raw());
      }
      return res.text();
    })
    //本文
    .then(text => {
    	//表示とファイルに出力
    	if(output && header){
    		output_file(file_name, text);
    		console.log(text);
    	}
    	//ファイル出力のみ
    	else if(output){
    		output_file(file_name, text);
    	}
    	//表示のみ
    	else{
    		console.log(text);
    	}
    	})
    // エラーはここでまとめて処理
    .catch(err => console.error(err));
}
//outputオプション処理部分******************************************
function output_option(args, cnt){
}
//view-headerオプション処理部分*************************************
function view-header(args, cnt){
}
//Xオプション処理部分***********************************************
function X-option(args, cnt){
}
//dataオプション処理部分********************************************
function data-option(args, cnt){
}
//コマンドオプション判定部分
function command_option(args, cnt){
	if(args[cnt] == '-o'||args[cnt] == '--output'){
		console.log("-oオプション実装部分");
	}
	else if(args[cnt] == '-v'||args[cnt] == '--view-header'){
		console.log("-vオプション実装部分");
	}
	else if(args[cnt] == '-X'||args[cnt] == '--request'){
		console.log("-Xオプション実装部分");
	}
	else if(args[cnt] == '-d'||args[cnt] == '--data'){
		console.log("-dオプション実装部分");
	}
	else if(args[cnt] == '-h'||args[cnt] == '--help'){
		console.log("-hオプション実装部分");
	}
	else{
		console.log("オプション無し実装部分");
	}
}
