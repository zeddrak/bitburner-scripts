/** @param {NS} ns **/
import * as nt from "notns.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	ns.print("--Open Ports & Nuke 'em");
	const servers = asd.servers?asd.servers.non??[]:[];
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
			}
		}
	}
}
