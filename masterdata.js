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
			sdat.freeRam = Math.max(0,sdat.maxRam - ns.getServerUsedRam(server)
				- ((server == 'home') ? nt.homeReserve : 0));

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
	asd=Math.asd; //if port's not empty, populate asd
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
		if (!(count % 50000) && asd.servers && Array.isArray(asd.servers.bak) && asd.servers.bak.length > 0) {
			if (Array.isArray(asd.sources) && asd.sources.includes('changeThis')) {
				// uncomment lines below if desired (increases size by 2.00 GB)
				// ns.tPrint('== Opening Backdoor on ' + asd.servers.bak[0]);
				// ns.installBackdoor(asd.servers.bak[0]);
			}
			else { ns.tprint('== Backdoors needed on ' + asd.servers.bak); }
		}
		count++;
		// this.ns.clearLog();
		// this.ns.print(count);
		await ns.sleep(1);
	} while (loop);
	ns.print('== datamaster complete ==');
}
