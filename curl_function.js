const args = process.argv;
let cnt = 2;

//コマンドオプション判定部分
function command_option(args){
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
}
