const args = process.argv;
let cnt = 2;
//ファイルに出力する処理
function output(){
}
//リクエスト処理部分****************************************************
function request(){
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
