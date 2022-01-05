_grow.js
/** @param {NS} ns **/
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.grow(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.grow(ns.args[0]); }
    }
}
_hack.js
/** @param {NS} ns **/
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.hack(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.hack(ns.args[0]); }
    }
}
_watchTargets.js
/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd=Math.asd; //if port's not empty, populate asd

	ns.disableLog('sleep');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMoneyAvailable');
	ns.clearLog();

	while (true) {
		await ns.sleep(1);
		ns.clearLog();
		var tars; if (asd && asd.servers) {tars = asd.servers.tar;}
		var dats; if (asd && asd.servers) {dats = asd.servers.dat;}
		var player; if (asd) {player = asd.player;}

		if ( tars && dats && player) {
			ns.print('        SERVER NAME*  Defense  $ %      Max$     Cur$');
			for (var s = 0; s < tars.length; s++) {
				var tar = tars[s];
				var dat = {};
				var di = dats.indexOf(tar);
				if (di>0) { dat = dats[di+1]; }
				var sec = [dat.minDifficulty, dat.hackDifficulty, ns.getServerSecurityLevel(tar)];
				var mon = [dat.moneyMax, dat.moneyAvailable, ns.getServerMoneyAvailable(tar)]

				var secS = ns.nFormat(sec[0], '0').padStart(3)
				//					+ ' ' + ns.nFormat(sec[1], '0.0').padStart(5)
				//					+ ' ' + ns.nFormat(sec[2], '0.0').padStart(5);
				var monS = ('$' + ns.nFormat(mon[0], '0.0e+0')).padStart(9)
					//					+ ('  $' + ns.nFormat(mon[1], '0.0e+0')).padStart(9)
					+ ('  $' + ns.nFormat(mon[2], '0.0e+0')).padStart(9);
				var old = ' '; if (sec[1] != sec[2] || mon[1] != mon[2]) { old = '*'; }
				var secD = ns.nFormat(sec[2] - sec[0], '+0').padStart(4);
				var monP = ns.nFormat(mon[2] / mon[0], '%').padStart(5);
				ns.print(tar.padStart(20) + old + secS + secD + ' ' + monP + ' ' + monS);
			}
		}
	}
}
_weak.js
/** @param {NS} ns **/
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.weaken(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.weaken(ns.args[0]); }
    }
}
00_bitnode.js
/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	
	try { asd.BitNodeMultipliers = ns.getBitNodeMultipliers(); }
	catch {
		const bnm = {
			AgilityLevelMultiplier:1, // 	number 	Influences how quickly the player's agility level (not exp) scales
			AugmentationMoneyCost:1, // 	number 	Influences the base cost to purchase an augmentation.
			AugmentationRepCost:1, // 	number 	Influences the base rep the player must have with a faction to purchase an augmentation.
			BladeburnerRank:1, // 	number 	Influences how quickly the player can gain rank within Bladeburner.
			BladeburnerSkillCost:1, // 	number 	Influences the cost of skill levels from Bladeburner.
			CharismaLevelMultiplier:1, // 	number 	Influences how quickly the player's charisma level (not exp) scales
			ClassGymExpGain:1, // 	number 	Influences the experience gained for each ability when a player completes a class.
			CodingContractMoney:1, // 	number 	Influences the amount of money gained from completing Coding Contracts
			CompanyWorkExpGain:1, // 	number 	Influences the experience gained for each ability when the player completes working their job.
			CompanyWorkMoney:1, // 	number 	Influences how much money the player earns when completing working their job.
			CorporationValuation:1, // 	number 	Influences the valuation of corporations created by the player.
			CrimeExpGain:1, // 	number 	Influences the base experience gained for each ability when the player commits a crime.
			CrimeMoney:1, // 	number 	Influences the base money gained when the player commits a crime.
			DaedalusAugsRequirement:1, // 	number 	Influences how many Augmentations you need in order to get invited to the Daedalus faction
			DefenseLevelMultiplier:1, // 	number 	Influences how quickly the player's defense level (not exp) scales
			DexterityLevelMultiplier:1, // 	number 	Influences how quickly the player's dexterity level (not exp) scales
			FactionPassiveRepGain:1, // 	number 	Influences how much rep the player gains in each faction simply by being a member.
			FactionWorkExpGain:1, // 	number 	Influences the experience gained for each ability when the player completes work for a Faction.
			FactionWorkRepGain:1, // 	number 	Influences how much rep the player gains when performing work for a faction.
			FourSigmaMarketDataApiCost:1, // 	number 	Influences how much it costs to unlock the stock market's 4S Market Data API
			FourSigmaMarketDataCost:1, // 	number 	Influences how much it costs to unlock the stock market's 4S Market Data (NOT API)
			HackExpGain:1, // 	number 	Influences the experienced gained when hacking a server.
			HackingLevelMultiplier:1, // 	number 	Influences how quickly the player's hacking level (not experience) scales
			HacknetNodeMoney:1, // 	number 	Influences how much money is produced by Hacknet Nodes and the hash rate of Hacknet Servers (unlocked in BitNode-9)
			HomeComputerRamCost:1, // 	number 	Influences how much money it costs to upgrade your home computer's RAM
			InfiltrationMoney:1, // 	number 	Influences how much money is gained when the player infiltrates a company.
			InfiltrationRep:1, // 	number 	Influences how much rep the player can gain from factions when selling stolen documents and secrets
			ManualHackMoney:1, // 	number 	Influences how much money can be stolen from a server when the player performs a hack against it through the Terminal.
			PurchasedServerCost:1, // 	number 	Influence how much it costs to purchase a server
			PurchasedServerLimit:1, // 	number 	Influences the maximum number of purchased servers you can have
			PurchasedServerMaxRam:1, // 	number 	Influences the maximum allowed RAM for a purchased server
			RepToDonateToFaction:1, // 	number 	Influences the minimum favor the player must have with a faction before they can donate to gain rep.
			ScriptHackMoney:1, // 	number 	Influences how much money can be stolen from a server when a script performs a hack against it.
			ServerGrowthRate:1, // 	number 	Influences the growth percentage per cycle against a server.
			ServerMaxMoney:1, // 	number 	Influences the maxmimum money that a server can grow to.
			ServerStartingMoney:1, // 	number 	Influences the initial money that a server starts with.
			ServerStartingSecurity:1, // 	number 	Influences the initial security level (hackDifficulty) of a server.
			ServerWeakenRate:1, // 	number 	Influences the weaken amount per invocation against a server.
			StrengthLevelMultiplier:1, // 	number 	Influences how quickly the player's strength level (not exp) scales		
		}
		bnm = null;
		asd.BitNodeMultipliers = bnm;
	}
}
fixem.js
/** @param {NS} ns **/
let defT = 'joesguns';
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd=Math.asd; //if port's not empty, populate asd

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	let count = 1;
	while (true) {
		await ns.sleep(5);
		let tars = []; if (asd && asd.servers) { tars = asd.servers.hal; }
		let dats = []; if (asd && asd.servers) { dats = asd.servers.dat; }
		if (Array.isArray(tars) && tars.length > 0) {
			const tar = tars[Math.floor(Math.random() * tars.length)];
			const di = dats.indexOf(tar) + 1;
			if (di > 0) {
				const dat = dats[di];
				ns.print(tar);
				if (dat.hackDifficulty > dat.minDifficulty) { count = 0; await ns.weaken(tar); }
				else if (dat.moneyAvailable < dat.moneyMax) { count = 0; await ns.grow(tar); }
				else if (!(count % 10)) { await ns.grow(defT); }
			}
		}
		count++;
	}
}
masterconfig.js
/** @param {NS} ns **/
//constants and helper functions for Drak's Masterhacker serries of scripts

export const bestThresh = 1.10; //How much swapping targets has to be worth to bother
export const MaxAmt = 0.999; // max amount to steal per hack (decimal%) //lower helps maintain stability
export const MaxProcess = 4000; //Maximum allowed concurrent processes
export const BN = 1.10; //buffer threads extra grow and weaken threads to help keep stability
//const ProcPerbT = 10000; //how many processes before increasing bT
export const MinbT = 20;//MINIMUM buffer time betwwen calls in milliseconds (time between each hack, grow, weaken, landing) to ensure sequence is kept
// lower buffer = more hack grow pairs = more money (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money
export const RamUse = 0.99 // Amount of your total ram to allow profiles to build from
export const MaxTargets = 1; //Maximum number of servers to atatck - currently only works for one, do not change


/*
// vestigual main
export async function main(ns) {

}
*/
masterdata.js
/** @param {NS} ns **/
/*=====
Sciprt for updating a global database freely accessable to all scripts through port 20
=====*/

/*---------- some custom data ----------
asd.servers.dat[Name,Server] -- paired server objects for every server (like ['home',obj,'noodles',obj, etc])
								Use +=2 to itterate this list, indexOf('server')+1, etc.
dat.Server.ls -- list of files on the server (same as ls(server))
dat.Server.ps -- list of scripts running on the server (same as ps(server))
dat.Server.ht -- time (ms) req to hack this server
dat.Server.gt -- time (ms) req to grow this server
dat.Server.wt -- time (ms) req to weaken this server
dat.Server.hA -- portion (decimal%) hack Amount PER THREAD

-- Quick reference lists
asd.servers.all -- a flat list of all servers in network = ['home'] + pur + non
asd.servers.pur -- a list of all purchased servers (same as getPurchasedServers() w/o the 2.25 gb!)
asd.servers.non -- a list of all servers besides home and purchased (the servers in the city network)
asd.servers.hal -- has access list - rooted non servers (ie, excludes home and pur); can be targeted by weaken,grow
asd.servers.res -- useful resource - has root access and has memory available for programs > smlRam of home; can use to run scripts on
asd.servers.sml -- small resource - has root access and has memory available for programs <= smlRam of home; can use to run scripts on
asd.servers.bak -- servers you could backdoor (rooted and reqSkill <= playerSkill); need to be backdoored
asd.servers.tar -- targets list - hack targets (rooted, have max$ > 0, & reqSkill <= playerSkill);
				   can be targeted by hack, backdoor (may already be backdoored)
//asd.servers.was -- targets list - weak a$$ servers (target servers that take less than 60 sec to weaken)
---------- some custom data ----------*/
import * as nt from "notns.js";

const scriptRam = 1.75; //hack is 1.7, but meh for now
const smlRam = 0.1; //portion of home ram below which the server is not used for main hacking scripts
//const wasTime = 60000; //target servers whose weaken time drop below this are considered WeakA$$Servers
function serverGone(ns, server) { //version of server exists that also updates the lists, used like... if(serverGone(server)) {//abort...};
	if (ns.serverExists(server)) { return false; } //if it exists, return false (not gone)

	const lists = [asd.servers.dat, asd.servers.all, asd.servers.pur, asd.servers.non,
	asd.servers.res, asd.servers.sml, asd.servers.hal, asd.servers.bak, asd.servers.tar];
	//update asd.servers if found in one of the lists
	for (var l = 0; l < lists.length; l++) {
		var list = lists[l];
		if (Array.isArray(list)) {
			var di = list.indexOf(server);
			if (di != -1) {
				list.splice(di, 1);
				if (l == 0) { list.splice(di, 1); } //do it twice for the DAT list to remove the paired object
			}
		}
	}
	count = 0;
	return true; //server gone
}

function buildAll(ns) {
	ns.print('--rebuilding ALL');
	//(safe) forward only network scan
	const servers = ['home'];
	for (const server of servers) {
		servers.push.apply(servers, (ns.scan(server).slice(server == 'home' ? 0 : 1))); //add the server's forward only children; home has no parent to skip
	}
	asd.servers.all = servers;
}

function buildOthers(ns) {
	if (count % 1000 == 0) { ns.print('--rebuilding OTHERS... (x1000)'); }
	const servers = asd.servers.all;
	let player = ns.getPlayer();
	let smallRam = 0;
	let totRam = 0;

	const dat = []; const pur = []; const non = [];
	const hal = []; const rsd = []; const sml = [];
	const bak = []; const tar = []; const was = [];
	const hacklvl = asd.player.hacking;
	for (const server of servers) {
		if (!serverGone(ns, server)) {
			const sdat = ns.getServer(server);
			//sdat.ls = this.ns.ls(server);
			//sdat.ps = this.ns.ps(server);
			//ToDo: add all process data?
			sdat.freeRam = Math.max(0, sdat.maxRam - ns.getServerUsedRam(server)
				- ((server == 'home') ? (Math.min((sdat.maxRam * 0.1), nt.homeReserve)) : 0));

			if (server == 'home') {
				smallRam = smlRam * sdat.maxRam;
				sdat.coreMult = nt.coreMult(sdat.cpuCores);
				asd.homeCoreMult = nt.coreMult(sdat.cpuCores);
				totRam += Math.max(0, (sdat.maxRam - nt.homeReserve) * asd.homeCoreMult);
			}
			else {
				sdat.coreMult = nt.coreMult(sdat.cpuCores);
				totRam += sdat.maxRam;
				if (sdat.hasAdminRights && sdat.maxRam >= scriptRam) {
					if (sdat.maxRam > smallRam) { rsd.push(sdat); }
					else { sml.push(server); }
				}
				if (sdat.purchasedByPlayer) { pur.push(server); }
				else {
					non.push(server);
					sdat.wT = nt.getWTime(sdat, player);
					sdat.gT = nt.getGTime(sdat, player);
					sdat.hT = nt.getHTime(sdat, player);
					sdat.hA = nt.hAnalyze(sdat, player);
					sdat.hC = nt.hAnalyzeChance(sdat, player);
					if (sdat.hasAdminRights) {
						hal.push(server);
						if (sdat.requiredHackingSkill <= hacklvl) {
							if (!sdat.backdoorInstalled) { bak.push(server); }
							if (sdat.moneyMax > 0) { tar.push(server); }
						}
					}
				}
			}
			dat.push(server, sdat);
		}
	}
	rsd.sort((a, b) => (b.maxRam - a.maxRam));
	const res = ['home'];
	for (const r of rsd) {
		if (!(r == asd.deadserver)) {
			res.push(r.hostname);
		}
	}
	res.push('home');

	asd.servers.dat = dat;
	asd.servers.pur = pur;
	asd.servers.non = non;
	asd.servers.hal = hal;
	asd.servers.res = res;
	asd.servers.sml = sml;
	asd.servers.bak = bak;
	asd.servers.tar = tar;
	asd.totRam = totRam;
}

// old port technique, if ever needed for some reason
//	if (!ns.getPortHandle(20).data) { ns.getPortHandle(20).data = asd; } //if port's empty, initialize it
//	asd = ns.getPortHandle(20).data; //if port's not empty, populate asd

let count = 0;
export const homeReserve = 100; //amt of ram to keep free at home

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	if (!asd.servers) { asd.servers = {}; }
	if (!asd.totRam) { asd.totRam = 0; }

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('scan');
	ns.disableLog('getServerUsedRam');

	let loop = false;
	if (ns.args.includes('loop')) { loop = true; }

	count = 0;
	do {
		asd.player = ns.getPlayer();
		//		asd.sources = ns.getOwnedSourceFiles()
		if (!(count % 1000)) { buildAll(ns); }
		buildOthers(ns);
		// uncomment line below if desired (increases size by 5.00 GB)
		//if (!(count % 5000)) { asd.sources = ns.getOwnedSourceFiles(); }
		if (loop && !(count % 50000) && asd.servers && Array.isArray(asd.servers.bak) && asd.servers.bak.length > 0) {
			if (Array.isArray(asd.sources) && asd.sources.includes('changeThis')) {
				// uncomment lines below if desired (increases size by 2.00 GB)
				// ns.tPrint('== Opening Backdoor on ' + asd.servers.bak[0]);
				// ns.installBackdoor(asd.servers.bak[0]);
			}
			else { ns.tprint(('== Backdoors needed on ' + asd.servers.bak).replaceAll(',', ' ')); }
		}
		count++;
		// this.ns.clearLog();
		// this.ns.print(count);
		await ns.sleep(1);
	} while (loop);
	ns.print('== datamaster complete ==');
}
masternuke.js
/** @param {NS} ns **/
import * as nt from "notns.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	ns.print("--Open Ports & Nuke 'em");
	const servers = asd.servers.non??[];
	for (const server of servers) {
		if (!(server == 'home' || server.startsWith('pserv'))) {
			const dat = ns.getServer(server);
			if (dat.openPortCount < 5) {
				if (!dat.sshPortOpen && ns.fileExists("BruteSSH.exe", "home")) { await ns.brutessh(server); }
				if (!dat.ftpPortOpen && ns.fileExists("FTPCrack.exe", "home")) { await ns.ftpcrack(server); }
				if (!dat.smtpPortOpen && ns.fileExists("relaySMTP.exe", "home")) { await ns.relaysmtp(server); }
				if (!dat.httpPortOpen && ns.fileExists("HTTPWorm.exe", "home")) { await ns.httpworm(server); }
				if (!dat.sqlPortOpen && ns.fileExists("SQLInject.exe", "home")) { await ns.sqlinject(server); }
			}
			if (!dat.hasAdminRights && dat.openPortCount >= dat.numOpenPortsRequired) {
				ns.print('--NUKING ' + server);
				await ns.nuke(server);
				for (let i = 1; i<nt.sFiles.length; i+=2) {
					await ns.scp(nt.sFiles[i],'home',server);
				}
			}
		}
	}
}
masterspawn.js
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";


function freeRam(ns, server) {
	try {
		return asd.servers.dat[asd.servers.dat.indexOf(server) + 1].maxRam
			- ns.getServerUsedRam(server)
			- Math.max(0,((server == 'home') ?
			Math.min(0.1*asd.servers.dat[asd.servers.dat.indexOf(server) + 1].maxRam,nt.homeReserve) : 0));
	}
	catch { return 0; }
}

function launchAttack(ns, type, tar, threads = 1) {
	const sfi = (type == 'h') ? 3 : (type == 'g') ? 5 : 1; //default to w
	const script = nt.sFiles[sfi];
	const size = nt.sFiles[sfi + 1];
	for (let i = ((type == 'g') ? 0 : 1); i < ress.length && threads > 0; i++) { //sart at home for grows; largest non-home server for others.
		const res = ress[i];
		const maxth = Math.max(0, Math.floor(freeRam(ns, res) / size))
		if (maxth >= 1) {
			//adjust threads needed if server has more cores
			const coreMult = ((res == 'home') && (type == 'w' || type == 'g')) ? asd.homeCoreMult : 1.0;
			const th = Math.min(Math.max(1, Math.ceil(threads / coreMult)), maxth); //threads to assign to this attack
			const tixBool = (type == 'h' && asd.tixShort) || (type == 'g' && asd.tixLong); //manipulating the market?
			const pid = ns.exec(script, res, th, tar, Math.random(), th, tixBool);
			if (pid > 0) {
				threads -= Math.floor(th * coreMult);
				if (type == 'h') { hpids.push(pid); }
			}
		}
	}
}

let ress = [];
let hpids = [];

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	asd.tixShort = asd.tixShort ?? false;
	asd.tixLong = asd.tixShort ?? false;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMoneyAvailable');
	//	ns.disableLog('exec');
	ns.disableLog('getServerSecurityLevel');
	ns.clearLog();

	while (true) {
		await ns.sleep(0);

		let totCost = 0; //add to this each time an active profile is added; up to totRam
		//		let totProc = 0; //add to this each time an active profile is added; up to MaxProcess
		for (let i = 0; i < asd.bests.length && i < mc.MaxTargets && totCost < asd.totRam; i++) { //ToDo: add totProc check
			await ns.sleep(1);

			try { ress = asd.servers.res; } catch {}

			totCost += asd.bests[i].cost;
			const tar = asd.bests[i].tar;

			const dat = asd.servers.dat[asd.servers.dat.indexOf(tar) + 1];
			const hT = dat.hT; // length of a hack
			const gT = dat.gT; // length of a grow
			const wT = dat.wT; // length of a weaken

			let wL = Date.now() + 100; // weaken launch time
			let gL = wL + wT - gT - 2 * asd.bests[i].cL - 10; //grow launch time
			let hL = gL + gT - hT + 4 * asd.bests[i].cL - 10; //hack launch time
			let tL = Date.now(); //test server launch time

			let curTar = asd.bests[i].tar;
			while (asd.bests[i].tar == curTar) { //will need to be removed if multiple targets are to be enabld
				await ns.sleep(0);

				const hgSec = asd.bests[i].hS + asd.bests[i].gS 
				const secTol = dat.minDifficulty + Math.max(1,hgSec); //don't allow sec to rise by more than 1
				const monTol = (1.0 - asd.bests[i].amt) * 0.90 * dat.moneyMax; //don't allow more than 1 hack to hit

				const cL = asd.bests[i].cL;

				//clean up old hPids
				if (hpids.length - asd.bests[i].hP > 2) {
					hpids.slice(0, Math.max(0, hpids.length - asd.bests[i].hP - 2));
				}
				//collission detection (and prevention)
				//ToDo: Figure out if there's a way to not kill hacks when waiting for grows and weakens to land
				if (Date.now() > tL && (((ns.getServerSecurityLevel(tar) - secTol) > 0) || ((ns.getServerMoneyAvailable(tar) - monTol) < 0))) {
					for (let i = 0; i<5 && hpids.length > 1; i++){
						while (hpids.length > 0 && !ns.kill(hpids.shift())) { await ns.sleep(0) } // kill until a hack is actually killed (or no hacks remain)
					}
					tL = Date.now() + cL;
				}
				try { ress = asd.servers.res; } catch { continue; }
				if (Date.now() > hL) {
					launchAttack(ns, 'h', tar, asd.bests[i].hN);
					hL = Date.now() + cL;
				}
				if (Date.now() > gL) {
					launchAttack(ns, 'g', tar, asd.bests[i].gN);
					gL = Date.now() + cL;
				}
				if (Date.now() > wL) {
					launchAttack(ns, 'w', tar, asd.bests[i].wN);
					wL = Date.now() + cL;
				}
			}
		}
	}
}
masterstrat.js
/** @param {NS} ns **/

/*----------
All require root access on target;

hack: time depends on hacking and security. requires enough skill. security +0.002 (base)
grow: time depends on hacking and security. No skill req. security +0.004 (base)
weaken: time depends on hacking and security. security -0.05 (base, effected by cores)

== TOOLS ==
W -Sec 1 ns.weakenAnalyze(threads, **cores?) - returns amt weakened by this number of threads
G +Sec 1 ns.growthAnalyzeSecurity(threads)
G ?Thr 1 ns.growthAnalyze(host, growthMultiplier, **cores?) - returns number of threads needed == don't care for 1 core, low threads
H +Sec 1 ns.hackAnalyzeSecurity(threads)
H -$%  1 ns.hackAnalyze(host)
H Chnc 1 ns.hackAnalyzeChance(host) - Chance of success (only matters for valuation)
W Time 0.05 ns.getWeakenTime(host) - Time in ms to complete
G Time 0.05 ns.getGrowTime(host) - Time in ms to complete
H Time 0.05 ns.getHackTime(host) - Time in ms to complete

CORES only affect: Weaken Magnitude (makes weaken more Powerful) and Grow Magnitude (makes Grow more powerful)
They can be safely ignored, at least in the beginning... (they technically just reduce the number of grow/weaken threads needed per hack thread)

core multiplier = 1 + (cores - 1) / 16

----------*/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

//  tar is the target server's name (ex 'n00dles') as a string
//  hN is the desired number of Hack threads to simulate for
//  tarDat is a server object (ns.getServer()) for the target server, and is optional.
//    If not provided, the idealized values will be used instead (from MasterData)
//  bT is a parameter in case you have other tasks that may require you to temporarily hack at a slower rate
//    The global constant MinbT should be set instead for normal operation
//  cores should be used to increase totRam and calculate actual launched threads at time of launch instead
//    but is provided for here for sutuations where all or most processes get run on home - for instance
function estBestScore(tar, hN, tardat = {}, bT = mc.MinbT, cores = 1) { //tar = target server: string, hN = number of hack threads to model: integer > 0
	const ret = { tar: tar, value: 0, score: 0, cost: 0, hN: hN, bT: bT };
	if (tardat == {}) try { tardat = asd.servers.dat[asd.servers.dat.indexof(tar) + 1]; } catch { return ret; }
	if (tardat == {}) { return ret; } //can't get dat, abort

	//determine hack amt, chamce, and thread count numbers for hack, etc. (hN, gN, wN)
	ret.hA = tardat.hA; //hack Amount PER THREAD
	ret.amt = ret.hA * ret.hN; //amt hacked (as portion of currentMoney) -- if Hacking/Growing properly, then of MaxMoney
	ret.hS = nt.hAnalyzeSecurity(ret.hN); //amount of security generated by each hack
	const postHackSec = Math.min(100, tardat.minDifficulty + ret.hS); //security level after hack hits (max 100)
	ret.gN = Math.max(1, Math.ceil(mc.BN * nt.gAnalyzeLost(tardat, asd.player, ret.amt, postHackSec))); //number of Grow threads needed to offset each hack
	ret.gS = nt.gAnalyzeSecurity(ret.gN); //amount of security generated by the Grow threads
	const postGrowSec = Math.min(100, tardat.minDifficulty + ret.gS); //security level after hack hits
	ret.hC = 0.5 * (nt.hAnalyzeChance(tardat, asd.player) + nt.hAnalyzeChance(tardat, asd.player, postGrowSec));  // chance for a successful hack (at avg of minSec and minSec+growSec) - basically, assume hack lands first about half the time
	ret.maxSI = 100 - tardat.minDifficulty; // Caps weaken threads (max security is 100, so max security needing weaken is 100-minSec)
	ret.wA = nt.wAnalyze(1, cores); //amount of security offset by each weaken thread
	ret.wN = Math.max(1, Math.ceil(Math.min(ret.maxSI, (2 * mc.BN * (ret.hS + ret.gS))) / ret.wA)); // number of weaken threads needed to offset each HackGrow pair

	//determine process counts
	ret.hT = tardat.hT; // time required to finish a minSec Hack
	ret.gT = tardat.gT; // time required to finish a minSec Grow
	ret.wT = tardat.wT; // time required to finish a minSec Weaken
	ret.bT = Math.ceil(Math.max(bT, (ret.hT * 8.2 / 3.0 / mc.MaxProcess))); // Buffer Time between attacks
	ret.cL = 3.0 * ret.bT; // length of a cycle (hgw)
	ret.hP = Math.ceil(ret.hT / ret.cL); //number of Hack processes continuously running
	ret.gP = Math.ceil(1.0 * ret.gT / ret.cL); //number of Grow processes continuously running
	ret.wP = Math.ceil(1.0 * ret.wT / ret.cL); //number of Weaken processes continuously running
	ret.totP = ret.hP + ret.gP + ret.wP; //total number of processes to run this profile

	//put it all together
	ret.cost = nt.sFiles[4] * ret.hN * ret.hP + nt.sFiles[6] * ret.gN * ret.gP + nt.sFiles[2] * ret.wN * ret.wP; //cost in GB
	ret.value = ret.amt * tardat.moneyMax * ret.hC / ret.cL; // $ per millisecond
	ret.score = ret.value / ret.cost; // $ / ms / GB
	return ret;
}

async function fixem(ns) {
	//fill small servers with fixem scripts
	var script = nt.sFiles[7]; //fixem
	var smls = []; try { smls = asd.servers.sml; } catch { return; }
	for (const sml of smls) {
		await ns.sleep(1);
		if (nt.canRun(sml, script)) {
			const th = nt.maxThreads(sml, script); //threads to assign to this attack
			//var uid = Math.random();
			ns.exec(script, sml, th);
		}
	}
}

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	if (asd && !Array.isArray(asd.bests)) { asd.bests = []; }

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMaxMoney');
	ns.disableLog('exec');
	ns.disableLog('getServerMinSecurityLevel');
	ns.clearLog();

	let loop = false;
	if (ns.args.includes('loop')) { loop = true; }

	let count = 0;
	do {
		//copy scripts
		ns.exec('sendem.js', 'home');
		await fixem(ns);

		await ns.sleep(50);
		//update data
		let tars = []; try { tars = asd.servers.tar; } catch { continue; }
		let dats = []; try { dats = asd.servers.dat; } catch { continue; }
		let bests = []; if (!ns.args.includes('clear')) { try { bests = asd.bests; } catch { continue; } }

		for (const tar of tars) {
			await ns.sleep(1);
			let tardat = {};
			const di = dats.indexOf(tar) + 1;
			if (di > 0) { tardat = dats[di]; }
			else { continue; }

			let hN = 1;
			let ret = { tar: tar, value: 0, score: 0, cost: 0, hN: 1, bT: mc.MinbT };

			const maxCost = mc.RamUse * asd.totRam;
			let bi = bests.findIndex(a => a.tar == tar);
			if (bi == -1) { bi = bests.length; bests.push(ret); } // add the new target to the profiles list
			else if (!((maxCost - bests[bi].cost > 0) && (mc.MaxAmt - bests[bi].amt > 0))) { bests[bi] = ret; } //check that profile is still valid
			do {
				await ns.sleep(0);

				//check for a better target
				ret = estBestScore(tar, hN, tardat);
				while (hN == 1 && (ret.cost / maxCost > 1.0)) { //hN 1 profile to expensive, lengrhen cL to reduce cost
					await ns.sleep(0);
					ret = estBestScore(tar, hN, tardat, Math.ceil(ret.bT * ret.cost / maxCost));
				}
				if (ret.score > 0 && maxCost - ret.cost > 0 && (hN == 1 || mc.MaxAmt - ret.amt > 0) && ret.value - bests[bi].value > 0) { //new best target
					bests[bi] = ret;
				}
				if (count % 10 == 9) { hN++; } else { //high detail pass every 10th
					if (ret.amt < 0.01) { hN += hN < 10 ? 1 : hN < 100 ? 10 : Math.ceil(0.0001 / tardat.hA); } //step by 0.01%
					else { hN += Math.ceil(0.02 / tardat.hA); } //step by 0.2%
				}
			} while ((ret.score > 0) && (maxCost - ret.cost > 0) && (mc.MaxAmt - ret.amt > 0))
			//updated best profile for server, re-sort and update global to new order (and profile)
		}
		bests.sort((a, b) => (b.value - a.value > 0) ? 1 : (b.value == a.value) ? ((b.cost - a.cost > 0) ? -1 : 1) : -1);
		asd.bests = bests;
		count++;
	} while (loop);
	ns.print('== MasterStrat complete ==');
}
notns.js
/** @param {NS} ns **/

export const sFiles = [2.0, '_weak.js', 1.75, '_hack.js', 1.70, '_grow.js', 1.75, 'fixem.js', 1.95
	, 'masterpserv.js', 11.35, 'masterdata.js', 4.45, 'masternuke.js', 4.6
	, 'masterstrat.js', 2.9, 'masterspawn.js', 3.65, 'masterhacknet.js', 5.7];
export const homeReserve = 100; //amt of ram to keep free at home

//use any ns function without mem cost
// to do so, hide the function name
function func(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

// other helper functions
export function scriptRam(script = sFiles[1]) { return sFiles[sFiles.indexOf(script) + 1]; }
export function canRun(server, script = sFiles[1]) { return freeRam(server) >= scriptRam(script); }
export function maxThreads(server, script = sFiles[1]) { return Math.floor(freeRam(server) / scriptRam(script)); }
export function maxRam(server) {
	try {
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { return Math.asd.servers.dat[di].maxRam; }
	} catch { }
	return 0;
}
export function freeRam(server) {
	try {
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { return Math.max(0, Math.asd.servers.dat[di].freeRam); }
	} catch { }
	return 0;
}
export function eatRam(server, cost) {
	try {
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { Math.asd.servers.dat[di].freeRam -= cost; }
	} catch { }
}
export function updateRam(server, amt) {
	try {
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { Math.asd.servers.dat[di].freeRam = amt; }
	} catch { }
}

// === no cost formulas ===

//returns the grow ratio for a given threads count
// ToDo
export function gAnalyzeAmt() { }

export function getHTime(server, player, difficulty = -1) { //target, server or server name
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

export function getGTime(target, player, difficulty = -1) {
	const growTimeMultiplier = 3.2; // Relative to hacking time. 16/5 = 3.2
	return growTimeMultiplier * getHTime(target, player, difficulty);
}

export function getWTime(target, player, difficulty = -1) {
	const weakenTimeMultiplier = 4; // Relative to hacking time
	return weakenTimeMultiplier * getHTime(target, player, difficulty);
}

export function hAnalyzeChance(server, player, difficulty = -1) {
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
export function hAnalyze(server, player, difficulty = -1) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const balanceFactor = 240;

	const difficultyMult = (100 - difficulty) / 100;
	const skillMult = (player.hacking - (server.requiredHackingSkill - 1)) / player.hacking * (Math.asd.BitNodeMultipliers?(Math.asd.BitNodeMultipliers.ScriptHackMoney??1.0):1.0);
	const percentMoneyHacked = (difficultyMult * skillMult * player.hacking_money_mult) / balanceFactor;
	if (percentMoneyHacked < 0) { return 0.0; }
	if (percentMoneyHacked > 1) { return 1.0; }

	return percentMoneyHacked;
}

// returns actual dollars stolen by ONE hack thread
//useMax = true: gets value based on server's MaxMoney
//useMax = false: gets value based on server's AvailableMoney
export function hAnalyzeValue(server, player, difficulty = -1, useMax = true) {
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
export function gAnalyze(server, player, growth, difficulty = -1, cores = 1, capGrowMult = false) {
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
	const threadMultiplier = serverGrowthPercentage * player.hacking_grow_mult * coreMultiplier * (Math.asd.BitNodeMultipliers?(Math.asd.BitNodeMultipliers.ServerGrowthRate??1):1); //total of all grow thread multipliers

	const cycles = Math.log(growthMultiplier) / (Math.log(exponentialBase)) / threadMultiplier;
	return cycles;
}

export function gAnalyzeLost(server, player, hackAmt, difficulty = -1.0, cores = 1, capGrowMult = false) {
	const growth = 1 / (1 - Math.min(0.9999,hackAmt));
	return gAnalyze(server, player, growth, difficulty, cores, capGrowMult);
}

// === end formulas ===


/*
Vestigual main...
export async function main(ns) {

}
*/
sendem.js
/** @param {NS} ns **/
const sFiles = ['_hack.js','_grow.js','_weak.js','fixem.js'];
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd=Math.asd; //if port's not empty, populate asd

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	var tars = []; if (asd && asd.servers && Array.isArray(asd.servers.all)) {tars=asd.servers.all;}
	for (var i=1;i<tars.length;i++) {
		var tar = tars[i];
		for (var j=0;j<sFiles.length;j++) {
			await ns.scp(sFiles[j],'home',tar);
		}
	}
}
watchbests.js
/** @param {NS} ns **/

let asd = {};
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	ns.disableLog('sleep');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMoneyAvailable');
	ns.clearLog();

	while (true) {
		await ns.sleep(1);
		ns.clearLog();
		let tars = []; if (asd && Array.isArray(asd.bests)) { tars = asd.bests; }
		ns.print('  #         SERVER NAME     $/ms  $/ms/GB   cost       hN   hAmt cL(ms) totProcs');
		for (let s = 0; s < tars.length; s++) {
			const tar = tars[s];
			var outS = ns.nFormat(s, '0').padStart(3)
				+ tar.tar.padStart(20)
				+ ns.nFormat(tar.value, '0.00e+0').padStart(9)
				+ ns.nFormat(tar.score, '0.00e+0').padStart(9)
				+ ns.nFormat(tar.cost / asd.totRam, '0.0%').padStart(7)
				+ ns.nFormat(tar.hN, '0.00e+0').padStart(9)
				+ ns.nFormat(tar.amt, '0.0%').padStart(7)
				+ ns.nFormat(tar.cL, '0.0').padStart(7)
				+ ns.nFormat(tar.totP, '0,000').padStart(9)
				;
			ns.print(outS);
		}
	}
}
