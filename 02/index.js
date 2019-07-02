const factory = require('./strategy-factory');
const readline = require('readline');

const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

rl.prompt();

rl.on('line',(value)=>factory(value));