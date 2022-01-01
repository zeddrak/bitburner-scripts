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