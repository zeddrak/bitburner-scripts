/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd=Math.asd; //if port's not empty, populate asd

	ns.disableLog('sleep');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMoneyAvailable');
	ns.clearLog();

	while (true) {
		await ns.sleep(1);
		ns.clearLog();
		var tars; if (asd && asd.servers) {tars = asd.servers.tar;}
		var dats; if (asd && asd.servers) {dats = asd.servers.dat;}
		var player; if (asd) {player = asd.player;}

		if ( tars && dats && player) {
			ns.print('        SERVER NAME*  Defense  $ %      Max$     Cur$');
			for (var s = 0; s < tars.length; s++) {
				var tar = tars[s];
				var dat = {};
				var di = dats.indexOf(tar);
				if (di>0) { dat = dats[di+1]; }
				var sec = [dat.minDifficulty, dat.hackDifficulty, ns.getServerSecurityLevel(tar)];
				var mon = [dat.moneyMax, dat.moneyAvailable, ns.getServerMoneyAvailable(tar)]

				var secS = ns.nFormat(sec[0], '0').padStart(3)
				//					+ ' ' + ns.nFormat(sec[1], '0.0').padStart(5)
				//					+ ' ' + ns.nFormat(sec[2], '0.0').padStart(5);
				var monS = ('$' + ns.nFormat(mon[0], '0.0e+0')).padStart(9)
					//					+ ('  $' + ns.nFormat(mon[1], '0.0e+0')).padStart(9)
					+ ('  $' + ns.nFormat(mon[2], '0.0e+0')).padStart(9);
				var old = ' '; if (sec[1] != sec[2] || mon[1] != mon[2]) { old = '*'; }
				var secD = ns.nFormat(sec[2] - sec[0], '+0').padStart(4);
				var monP = ns.nFormat(mon[2] / mon[0], '%').padStart(5);
				ns.print(tar.padStart(20) + old + secS + secD + ' ' + monP + ' ' + monS);
			}
		}
	}
}
