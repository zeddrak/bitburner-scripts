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
