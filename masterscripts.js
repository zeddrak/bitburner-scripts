/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	const scripts = [2.0]; // defaults to 2.0GB if script not found, may want to revise this...
	for (const script of ns.ls("home",".js")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	asd.hScripts = scripts;
}
