const args = process.argv;
let cnt = 2;
console.log(args[cnt]);
if(args[cnt] == '-e'||args[cnt] == '--example'){
	console.log("-e option");
}
