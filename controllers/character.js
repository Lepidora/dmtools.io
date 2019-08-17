function getRolledPlayerStats() {
	
	let roll = function() {
		
		let rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)].sort().slice(1);
		
		console.log(rolls);
		
		return rolls.reduce((total, num) => total + num);
	}
	
	let str = roll();
	let con = roll();
	let dex = roll();
	let int = roll();
	let wis = roll();
	let cha = roll();
	
	return [str, con, dex, int, wis, cha];
}

function getBaseCommonerStats() {
	return [10, 10, 10, 10, 10, 10];
}

function modifyStats(profession) {
	
}

function rollDice(sides) {
	return Math.floor(Math.random() * sides + 1);
}

exports.getRolledPlayerStats = getRolledPlayerStats;
exports.getBaseCommonerStats = getBaseCommonerStats;