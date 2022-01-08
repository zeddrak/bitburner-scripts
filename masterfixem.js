/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	//fill small servers with fixem scripts
	var script = 'fixem.js';
	var smls = []; try { smls = asd.servers.sml; } catch { return; }
	for (const sml of smls) {
		await ns.sleep(1);
		if (nt.canRun(sml, script)) { ns.exec(script, sml, nt.maxThreads(sml, script)); }
	}
}
