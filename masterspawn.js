/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";


function freeRam(ns, server) {
	try {
		return asd.servers.dat[asd.servers.dat.indexOf(server) + 1].maxRam
			- ns.getServerUsedRam(server)
			- ((server == 'home') ? nt.homeReserve : 0);
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
					for (let i = 0; i<3 && hpids.length > 1; i++){
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
