/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	try {
		if (ns.isBusy()) {
			ns.installBackdoor(asd.servers.bak[0]);
			ns.tPrint('== Opening Backdoor on ' + asd.servers.bak[0]);
		}
		asd.mbd = true; //master back door succeeded (or the player was already busy)
	} catch { }
}
