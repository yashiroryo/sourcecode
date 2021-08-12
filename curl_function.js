//curlコマンドのクローン(commanderを使用しないバージョン)
//変数宣言*************************************************************
const args = process.argv;
const fetch = require('node-fetch');
const fs = require("fs");
let file_name = null;						  //出力するファイルの名前
//fetchメソッド用オプション
let method = 'GET';								//デフォルトはget
let param = null;
let header = false;
let output = false;    						//データ出力判定用(デフォルトは出力なし)
let cnt = 2;											//読み取りを開始するコマンドライン引数

//ファイルに出力する処理************************************************
function output_file(file_name, text){
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
  fetch(url, {method: method, body: param})
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
    	//ファイル出力のみ
    	if(output){
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
	//エラー処理部分//エラーの場合は終了
	//引数なし
	if(args[cnt] == null){
		console.log("option -o: requires parameter");
		return 0;
	}
	//引数不足
	if(args[cnt + 1] == null){
		console.log("no URL specified!");
		return 0;
	}
	//-vオプションの組み合わせ
	if(args[cnt + 2] == '-v'){
		view_header(args, cnt + 3);
	}
	//変数に引数を代入
	file_name = args[cnt];
	cnt++;
	url = args[cnt];
	output = true;
	request(url, method, param, header, output);
	cnt++;
}

//view-headerオプション処理部分*************************************
function view_header(args, cnt){
	//引数チェック
	if(args[cnt] == null){
		console.log("no URL specified");
		return 0;
	}
	//-oオプションとの組み合わせ
	if(args[cnt + 1] == '-o'){
		output_option(args, cnt + 2);
	}
	//変数に引数を代入
	url = args[cnt];
	header = true;
	request(url, method, param, header, output);
	cnt++;
}

//Xオプション処理部分***********************************************
function X_option(args, cnt){
	if(args[cnt] == null){
		console.log("option -X: requires parameter");
		return 0;
	}
	if(args[cnt + 1] == null){
		console.log("no URL specified!");
		return 0;
	}
	//-X + -dオプション
	else if(args[cnt + 1] == '-d'){
	  cnt += 2;
		data_option(args, cnt);
		return 0;
	}
	method = args[cnt];
	cnt++;
	url = args[cnt];
	request(url, method, param, header, output);
	cnt++;
}

//dataオプション処理部分********************************************
function data_option(args, cnt){
	if(args[cnt] == null){
		console.log("option -d: requires parameter");
		return 0;
	}
	if(args[cnt + 1] == null){
		console.log("no URL specified!");
		return 0;
	}
	//URLエンコード
	param = args[cnt];
	//=を分割してparamに格納
	param = param.split('=');
	key = param[0]; value = param[1];
	param = new URLSearchParams();
	param.append(key, value);
	cnt++;
	url = args[cnt];
	method = 'POST';
	request(url, method, param, header, output);
	cnt++;
}

//コマンドオプション判定部分****************************************
function command_option(args, cnt){
	if(args[cnt] == '-o'||args[cnt] == '--output'){
		cnt++;	//読み込む引数を1つずらす
		output_option(args, cnt);
	}
	else if(args[cnt] == '-v'||args[cnt] == '--view-header'){
		cnt++;
		view_header(args, cnt);
	}
	else if(args[cnt] == '-X'||args[cnt] == '--request'){
		cnt++;
		X_option(args, cnt);
	}
	else if(args[cnt] == '-d'||args[cnt] == '--data'){
		cnt++;
		data_option(args, cnt);
	}
	else if(args[cnt] == '-h'||args[cnt] == '--help'){
		console.log("-hオプション実装部分");
	}
	else{
		//エラー処理
		url = args[cnt];
		request(url, method, param, header, output);
		cnt++;
	}
}
command_option(args, cnt);


