/** @param {NS} ns **/
import * as mc from "masterconfig.js";

// UNTESTED - USE CAREFULLY (might trigger static ram warning)
//use any ns function without mem cost
// to do so, hide the function name (ex: 'get' + 'server', 'ns', 'home')
function func(functionName, context, args = '') {
	var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	return context[func].apply(context, args);
}

// other helper functions
export function gServer(server) {
	try{
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { return Math.asd.servers.dat[di]; }
	} catch {}
	return null;
}
export function scriptCost(script) { return Math.asd.hScripts[Math.asd.hScripts.indexOf(script) + 1]; }
export function canRun(server, script) { return availRam(server) >= scriptCost(script); }
export function maxThreads(server, script) { return Math.floor(availRam(server) / scriptCost(script)); }
export function maxRam(server) { return gServer(server).maxRam??0; }
export function availRam(server) { return gServer(server).freeRam??0; }
export function homeReserve() { //amt of ram to keep free at home
	try { return Math.min(mc.HomeReserveMax, Math.max(mc.HomeReserveMin, mc.HomeReservePortion * maxRam('home'))); }
	catch { }
	return 10;
}
export function eatRam(server, cost) { //to free up ram, eat a negative amount
	try { gServer(server).freeRam -= cost; } catch { }
}
export function updateRam(server, amt) {
	try { gServer(server).freeRam = amt; } catch { }
}

// === no cost formulas ===

//returns the grow ratio for a given threads count
// ToDo
export function gAnalyzeAmt() { }

export function getHTime(server, player = Math.asd.player, difficulty = -1) { //target, server or server name
	if (difficulty <= 0) { difficulty = server.minDifficulty; }
	const difficultyMult = server.requiredHackingSkill * difficulty;

	const baseDiff = 500;
	const baseSkill = 50;
	const diffFactor = 2.5;
	const skillFactor = (diffFactor * difficultyMult + baseDiff) / (player.hacking + baseSkill);

	const hackTimeMultiplier = 5;
	const hackingTime = (hackTimeMultiplier * skillFactor) /
		(player.hacking_speed_mult * calculateIntelligenceMult(player.intelligence, 1));
	return hackingTime * 1000;
}

export function getGTime(target, player = Math.asd.player, difficulty = -1) {
	const growTimeMultiplier = 3.2; // Relative to hacking time. 16/5 = 3.2
	return growTimeMultiplier * getHTime(target, player, difficulty);
}

export function getWTime(target, player = Math.asd.player, difficulty = -1) {
	const weakenTimeMultiplier = 4; // Relative to hacking time
	return weakenTimeMultiplier * getHTime(target, player, difficulty);
}

export function hAnalyzeChance(server, player = Math.asd.player, difficulty = -1) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const hackFactor = 1.75;
	const difficultyMult = (100 - difficulty) / 100;
	const skillMult = hackFactor * player.hacking;
	const skillChance = (skillMult - server.requiredHackingSkill) / skillMult;
	const chance = skillChance * difficultyMult * player.hacking_chance_mult
		* calculateIntelligenceMult(player.intelligence, 1);
	if (chance > 1) { return 1; }
	if (chance < 0) { return 0; }

	return chance;
}

// returns decimal percentage stolen by ONE hack thread
export function hAnalyze(server, player = Math.asd.player, difficulty = -1) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const balanceFactor = 240;

	const difficultyMult = (100 - difficulty) / 100;
	const skillMult = (player.hacking - (server.requiredHackingSkill - 1)
	)
		/ player.hacking;
	const percentMoneyHacked = (difficultyMult * skillMult * player.hacking_money_mult * ((Math.asd && Math.asd.BitNodeMultipliers) ? (Math.asd.BitNodeMultipliers.ScriptHackMoney ?? 1.0) : 1.0)) / balanceFactor;
	if (percentMoneyHacked < 0) { return 0.0; }
	if (percentMoneyHacked > 1) { return 1.0; }

	return percentMoneyHacked;
}

// returns actual dollars stolen by ONE hack thread
//useMax = true: gets value based on server's MaxMoney
//useMax = false: gets value based on server's AvailableMoney
export function hAnalyzeValue(server, player = Math.asd.player, difficulty = -1, useMax = true) {
	const hAmt = hAnalyze(server, player, difficulty);
	const money = useMax ? server.moneyMax : server.moneyAvailable;
	return hAmt * money;
}

// returns amt of security reduced by a weaken with x threads
export function wAnalyze(threads, cores) {
	const CONSTANTSServerWeakenAmount = 0.05;
	return CONSTANTSServerWeakenAmount * threads * coreMult(cores);
}

// returns amt of security increased by a grow with x threads
export function gAnalyzeSecurity(threads) {
	const CONSTANTSServerFortifyAmount = 0.002;
	return 2 * CONSTANTSServerFortifyAmount * threads;
}

// returns amt of security reduced by a hack with x threads
export function hAnalyzeSecurity(threads) {
	const CONSTANTSServerFortifyAmount = 0.002;
	return CONSTANTSServerFortifyAmount * threads;
}

// helper function for getting multiplier to Weaken and Grow effectiveness
export function coreMult(cores) { return (1.0 + (cores - 1.0) / 16.0); }

// helper function for getting multiplier to hack time and chance
export function calculateIntelligenceMult(intelligence, weight = 1) {
	return 1 + (weight * Math.pow(intelligence, 0.8)) / 600;
}

/*
gAnalyze (and gAnalyzeLost) are reverse engineered from
	function calculateServerGrowth(server: Server, threads: number, p: IPlayer, cores = 1): number
	(and related functions/constants)

which grows a server with the following formula
GM: Growth Multiplier (avail money * GM = new money)
B: base = Math.min(CONSTANTS.ServerMaxGrowthRate, (1 + (CONSTANTS.ServerBaseGrowthRate - 1) / server.hackDifficulty)
  (known for a given server at a given security)
TM: Thread Multiplier = (server.serverGrowth / 100) * p.hacking_grow_mult * (1 + (cores - 1) / 16) * BitNodeMultipliers.ServerGrowthRate
  (known for a given serverGrowth AND given Player Hack Skill AND given Core Count AND a given BitNodeMultiplier)

GM = Base ^ ( threads * TM)
Threads * TM = log (base Base) of GM // definition of log
Threads = log (base Base) of GM / TM // isolate threads (value we want)
Threads = log (GM / TM) / log (Base) // Log change of base rule (from log base "Base" to log base 10)
*/
//for those with bitnode stuff, you can use the following line if desired
//BitNodeMultipliersServerGrowthRate = ns.getBitNodeMultipliers().BitNodeMultipliers.ServerGrowthRate;
//cores is the # of cores of the ATTACKING (not target) server (where grow() is being run)
//capGrowMult false (default) = return threads for provided growth
//capGrowMult true = return threads for provided growth OR needed for growth to max money on provided server
//  whichever is less
export function gAnalyze(server, player = Math.asd.player, growth, difficulty = -1, cores = 1, capGrowMult = false) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const fullGrow = Math.max(1.0, (server.moneyMax / server.moneyAvailable)); // grow multiplier needed to Max Money - must be >= 1
	const growthMultiplier = capGrowMult ? Math.min(growth, fullGrow) : growth; //if capMult, then cap growth to maxMoney

	const CONSTANTSServerBaseGrowthRate = 1.03;
	const CONSTANTSServerMaxGrowthRate = 1.0035;
	const adjGrowthRate = (1 + (CONSTANTSServerBaseGrowthRate - 1) / difficulty); // adj exponential base for security
	const exponentialBase = Math.min(adjGrowthRate, CONSTANTSServerMaxGrowthRate) //cap growth rate

	const serverGrowthPercentage = server.serverGrowth / 100.0;
	const coreMultiplier = coreMult(cores);
	const threadMultiplier = serverGrowthPercentage * player.hacking_grow_mult * coreMultiplier * (Math.asd.BitNodeMultipliers ? (Math.asd.BitNodeMultipliers.ServerGrowthRate ?? 1) : 1); //total of all grow thread multipliers

	const cycles = Math.log(growthMultiplier) / (Math.log(exponentialBase)) / threadMultiplier;
	return cycles;
}

export function gAnalyzeLost(server, player = Math.asd.player, hackAmt, difficulty = -1.0, cores = 1, capGrowMult = false) {
	const growth = 1 / (1 - Math.min(0.9999, hackAmt));
	return gAnalyze(server, player, growth, difficulty, cores, capGrowMult);
}

// === end formulas ===


/*
Vestigual main...
export async function main(ns) {

}
*/
