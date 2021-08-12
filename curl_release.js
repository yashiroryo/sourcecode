//curlコマンドのクローン
const program = require('commander');
const fetch = require('node-fetch');
const fs = require("fs");
//fetchメソッド用オプション
let method = 'GET';
let param = null;
let header = false;
let output = false;    //データ出力判定用(デフォルトは出力なし)
let file_name = null; //ファイルの名前

//htmlファイルをファイルに出力する関数**************************
function output_file(file_name, text){
	//書き込み
	fs.writeFile(file_name, text, (err) => {
		if(err)
			throw err;
	});
}

//HTTPrequest処理関数*****************************************
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

//コマンドオプション解析部分************************************
program
	//オプション詳細
	.option('-o, --output', 'import html to files')
	.option('-v, --viewheader', 'view html file with header')
	.option('-X, --request', 'send request')
	.option('-d, --data', 'send POST request with data')
	//引数をパース
	.parse(process.argv);

	const options = program.opts();
	//オプション判定部分
	//-oオプション
	if(program.output && !program.viewheader){
		//引数なし検出(終了)
		if(program.args[0] == null|| program.args[1] == null){
		  if(program.args[0] == null&&program.args[1] == null){
		  	console.log("curl: option -o: requires parameter");
		  	return 0;
		  }
		  else if(program.args[1] == null){
		  	console.log("curl: no URL specified!");
		  	return 0;
		  }
		  return 0;
		}
		//引数から設定
		file_name = program.args[0];
		url = program.args[1];
		output = true;
		//HTTPリクエスト
		request(url, method, param, header, output);
	}
	//-vオプション
	else if(program.viewheader && !program.output){
		//引数チェック
		if(program.args[0] == null){
		  console.log("curl: no URL specified!");
		  return 0;
		}
		//引数から設定
		url = program.args[0];
		header = 'true';
		//HTTPリクエスト
	  request(url, method, param, header, output);
	}
	//-Xオプション
	else if(program.request){
		//引数チェック
	  if(program.args[0] == null||program.args[1] == null){
	  	if(program.args[0] == null&&program.args[1] == null){
		  	console.log("curl: option -X: requires parameter");
		  	return 0;
		  }
		  else if(program.args[1] == null){
		  	console.log("curl: no URL specified!");
		  	return 0;
		  }
		  return 0;
	 	}
	 	//メソッドを引数から取得
	  method = program.args[0];
	  url = program.args[1];
	  request(url, method, param, header, output);
	}
	//-dオプション
	else if(program.data){
		//引数チェック
		if(program.args[0] == null||program.args[1] == null){
			if(program.args[0] == null&&program.args[1] == null){
		  	console.log("curl: option -d: requires parameter");
		  	return 0;
		  }
		  else if(program.args[1] == null){
		  	console.log("curl: no URL specified!");
		  	return 0;
		  }
		  return 0;
		}
	  param = program.args[0];
	  url = program.args[1];
	  method = 'POST';
	  request(url, method, param, header, output);
	}
	//-o && -vオプション
	else if(program.output && program.viewheader){
		//未定
	}
	//-X && -dオプション
	if(program.request && program.data){
		//未定
	}
	//コマンドオプションなし
	else{
	  url = program.args[0];
	  //引数チェック
	  if(url == null){
	  	console.log("curl: try 'curl --help' or 'curl --manual' for more information");
	  	return 0;
	  }
	  //urlを取得したのでgetする
	  request(url, method, param, header, output);
	}
