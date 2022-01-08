/** @param {NS} ns **/
const sFiles = ['_hack.js', '_grow.js', '_weak.js', 'fixem.js'];
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	for (const tar of asd.servers ? asd.servers.all ?? [] : []) {
		await ns.sleep(0);
		if (tar == 'home') {continue;} //never copy files back to home!
		for (const sFile of sFiles) {
			await ns.sleep(0);
			await ns.scp(sFile, 'home', tar);
		}
	}
}
