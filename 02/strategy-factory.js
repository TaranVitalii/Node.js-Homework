const plus = require('./plus-strategy');
const subtraction = require('./subtraction-Strategy')
const multiplication = require('./multiplication-strategy');
const division =require('./division-strategy');



function factoryStrategy(value){
	if(value.indexOf('+')!=-1){
		let statement = value.split('+');
		let a = +statement[0];
		let b = +statement[1];
		return new plus(a,b);
	}else if(value.indexOf('-')!=-1){
		let statement = value.split('-');
		let a = +statement[0];
		let b = +statement[1];
		return new subtraction(a,b)
	}else if(value.indexOf('*')!=-1){
		let statement = value.split('*');
		let a = +statement[0];
		let b = +statement[1];
		return new multiplication(a,b)
	}else if(value.indexOf('/')!=-1){
		let statement = value.split('/');
		let a = +statement[0];
		let b = +statement[1];
		return new division(a,b)
	}
}

module.exports = factoryStrategy;