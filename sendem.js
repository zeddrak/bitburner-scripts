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