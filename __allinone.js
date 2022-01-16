00_getdoc.js  (26.60)
/** @param {NS} ns **/
//exploit to get and save a reference to the document object without incurring a RAM cost
//run once at the beginning of your session, then use Math.doc for free ever after
export async function main(ns) { try { Math.doc = document; } catch {} }
00_getwin.js  (26.60)
/** @param {NS} ns **/
//exploit to get and save a reference to the window object without incurring a RAM cost
//run once at the beginning of your session, then use Math.win for free ever after
export async function main(ns) { try { Math.win = window; } catch {} }
00_sourcefiles.js  (7.10)
/** @param {NS} ns **/

//create a database of your earned source files and their level in a convenient array format
// asd.sources[0] holds your current bitnode number, the rest hold your level with that sourcecode (source -1 is not recorded)
// run once at the beginning of a bitnode run (or after starting the game client)
let asd={};
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	asd.sources = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]; //initialize the sources databank
	for (const source of ns.getOwnedSourceFiles()) {
		asd.sources[source.n] = source.lvl; //update the relevant source levels
	}
	const bn = ns.getPlayer().bitNodeN;
	asd.bitnode = bn;
	asd.sources[0] = bn;
}
02_gangdata.js  (9.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	let loop = false;
	if (ns.args.includes('loop')) { loop = true; }

	try {
		asd.gang = ns.gang.getGangInformation();
		if (!nt.hasGang() && !ns.gang.createGang(mc.PreferedGangFaction)) { return; }
		do {
			while (ns.gang.recruitMember(Math.random())) { ns.sleep(1); }
			asd.gang = ns.gang.getGangInformation();
			asd.gang.members = ns.gang.getMemberNames();

			const memberInfos = [];
			for (const member of asd.gang.members) {
				memberInfos.push(ns.gang.getMemberInformation(member));
			}
			asd.gang.memberInfos = memberInfos;
			await ns.sleep(20);
		} while (loop)
	} catch { }
}
02_gangequip.js  (5.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database
	const gang = asd.gang;

	try {
		for (const member of gang.members) {
			for (const equip of nt.GangEquips) {
				await ns.sleep(1);
				ns.gang.purchaseEquipment(member, equip.name);
			}
		}
	} catch {}
}
02_ganginit.js  (1.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	/*//code for populating notns arrays should they be changed
	const SourceDats = [
	{
	  desc: "This gang member is currently idle",
	  isCombat: true,
	  isHacking: true,
	  name: "Unassigned",
	  params: { hackWeight: 100 }, // This is just to get by the weight check in the GangMemberTask constructor
	},
	{
	  desc: "Assign this gang member to create and distribute ransomware<br><br>Earns money - Slightly increases respect - Slightly increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Ransomware",
	  params: {
		baseRespect: 0.00005,
		baseWanted: 0.0001,
		baseMoney: 3,
		hackWeight: 100,
		difficulty: 1,
	  },
	},
	{
	  desc: "Assign this gang member to attempt phishing scams and attacks<br><br>Earns money - Slightly increases respect - Slightly increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Phishing",
	  params: {
		baseRespect: 0.00008,
		baseWanted: 0.003,
		baseMoney: 7.5,
		hackWeight: 85,
		chaWeight: 15,
		difficulty: 3.5,
	  },
	},
	{
	  desc: "Assign this gang member to attempt identity theft<br><br>Earns money - Increases respect - Increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Identity Theft",
	  params: {
		baseRespect: 0.0001,
		baseWanted: 0.075,
		baseMoney: 18,
		hackWeight: 80,
		chaWeight: 20,
		difficulty: 5,
	  },
	},
	{
	  desc: "Assign this gang member to carry out DDoS attacks<br><br>Increases respect - Increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "DDoS Attacks",
	  params: {
		baseRespect: 0.0004,
		baseWanted: 0.2,
		hackWeight: 100,
		difficulty: 8,
	  },
	},
	{
	  desc: "Assign this gang member to create and distribute malicious viruses<br><br>Increases respect - Increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Plant Virus",
	  params: {
		baseRespect: 0.0006,
		baseWanted: 0.4,
		hackWeight: 100,
		difficulty: 12,
	  },
	},
	{
	  desc: "Assign this gang member to commit financial fraud and digital counterfeiting<br><br>Earns money - Slightly increases respect - Slightly increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Fraud & Counterfeiting",
	  params: {
		baseRespect: 0.0004,
		baseWanted: 0.3,
		baseMoney: 45,
		hackWeight: 80,
		chaWeight: 20,
		difficulty: 20,
	  },
	},
	{
	  desc: "Assign this gang member to launder money<br><br>Earns money - Increases respect - Increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Money Laundering",
	  params: {
		baseRespect: 0.001,
		baseWanted: 1.25,
		baseMoney: 360,
		hackWeight: 75,
		chaWeight: 25,
		difficulty: 25,
	  },
	},
	{
	  desc: "Assign this gang member to commit acts of cyberterrorism<br><br>Greatly increases respect - Greatly increases wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Cyberterrorism",
	  params: {
		baseRespect: 0.01,
		baseWanted: 6,
		hackWeight: 80,
		chaWeight: 20,
		difficulty: 36,
	  },
	},
	{
	  desc: "Assign this gang member to be an ethical hacker for corporations<br><br>Earns money - Lowers wanted level",
	  isCombat: false,
	  isHacking: true,
	  name: "Ethical Hacking",
	  params: {
		baseWanted: -0.001,
		baseMoney: 3,
		hackWeight: 90,
		chaWeight: 10,
		difficulty: 1,
	  },
	},
	{
	  desc: "Assign this gang member to mug random people on the streets<br><br>Earns money - Slightly increases respect - Very slightly increases wanted level",
	  isCombat: true,
	  isHacking: false,
	  name: "Mug People",
	  params: {
		baseRespect: 0.00005,
		baseWanted: 0.00005,
		baseMoney: 3.6,
		strWeight: 25,
		defWeight: 25,
		dexWeight: 25,
		agiWeight: 10,
		chaWeight: 15,
		difficulty: 1,
	  },
	},
	{
	  desc: "Assign this gang member to sell drugs<br><br>Earns money - Slightly increases respect - Slightly increases wanted level - Scales slightly with territory",
	  isCombat: true,
	  isHacking: false,
	  name: "Deal Drugs",
	  params: {
		baseRespect: 0.00006,
		baseWanted: 0.002,
		baseMoney: 15,
		agiWeight: 20,
		dexWeight: 20,
		chaWeight: 60,
		difficulty: 3.5,
		territory: {
		  money: 1.2,
		  respect: 1,
		  wanted: 1.15,
		},
	  },
	},
	{
	  desc: "Assign this gang member to extort civilians in your territory<br><br>Earns money - Slightly increases respect - Increases wanted - Scales heavily with territory",
	  isCombat: true,
	  isHacking: false,
	  name: "Strongarm Civilians",
	  params: {
		baseRespect: 0.00004,
		baseWanted: 0.02,
		baseMoney: 7.5,
		hackWeight: 10,
		strWeight: 25,
		defWeight: 25,
		dexWeight: 20,
		agiWeight: 10,
		chaWeight: 10,
		difficulty: 5,
		territory: {
		  money: 1.6,
		  respect: 1.1,
		  wanted: 1.5,
		},
	  },
	},
	{
	  desc: "Assign this gang member to run cons<br><br>Earns money - Increases respect - Increases wanted level",
	  isCombat: true,
	  isHacking: false,
	  name: "Run a Con",
	  params: {
		baseRespect: 0.00012,
		baseWanted: 0.05,
		baseMoney: 45,
		strWeight: 5,
		defWeight: 5,
		agiWeight: 25,
		dexWeight: 25,
		chaWeight: 40,
		difficulty: 14,
	  },
	},
	{
	  desc: "Assign this gang member to commit armed robbery on stores, banks and armored cars<br><br>Earns money - Increases respect - Increases wanted level",
	  isCombat: true,
	  isHacking: false,
	  name: "Armed Robbery",
	  params: {
		baseRespect: 0.00014,
		baseWanted: 0.1,
		baseMoney: 114,
		hackWeight: 20,
		strWeight: 15,
		defWeight: 15,
		agiWeight: 10,
		dexWeight: 20,
		chaWeight: 20,
		difficulty: 20,
	  },
	},
	{
	  desc: "Assign this gang member to traffick illegal arms<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory",
	  isCombat: true,
	  isHacking: false,
	  name: "Traffick Illegal Arms",
	  params: {
		baseRespect: 0.0002,
		baseWanted: 0.24,
		baseMoney: 174,
		hackWeight: 15,
		strWeight: 20,
		defWeight: 20,
		dexWeight: 20,
		chaWeight: 25,
		difficulty: 32,
		territory: {
		  money: 1.4,
		  respect: 1.3,
		  wanted: 1.25,
		},
	  },
	},
	{
	  desc: "Assign this gang member to threaten and black mail high-profile targets<br><br>Earns money - Slightly increases respect - Slightly increases wanted level",
	  isCombat: true,
	  isHacking: false,
	  name: "Threaten & Blackmail",
	  params: {
		baseRespect: 0.0002,
		baseWanted: 0.125,
		baseMoney: 72,
		hackWeight: 25,
		strWeight: 25,
		dexWeight: 25,
		chaWeight: 25,
		difficulty: 28,
	  },
	},
	{
	  desc: "Assign this gang member to engage in human trafficking operations<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory",
	  isCombat: true,
	  isHacking: false,
	  name: "Human Trafficking",
	  params: {
		baseRespect: 0.004,
		baseWanted: 1.25,
		baseMoney: 360,
		hackWeight: 30,
		strWeight: 5,
		defWeight: 5,
		dexWeight: 30,
		chaWeight: 30,
		difficulty: 36,
		territory: {
		  money: 1.5,
		  respect: 1.5,
		  wanted: 1.6,
		},
	  },
	},
	{
	  desc: "Assign this gang member to commit acts of terrorism<br><br>Greatly increases respect - Greatly increases wanted level - Scales heavily with territory",
	  isCombat: true,
	  isHacking: false,
	  name: "Terrorism",
	  params: {
		baseRespect: 0.01,
		baseWanted: 6,
		hackWeight: 20,
		strWeight: 20,
		defWeight: 20,
		dexWeight: 20,
		chaWeight: 20,
		difficulty: 36,
		territory: {
		  money: 1,
		  respect: 2,
		  wanted: 2,
		},
	  },
	},
	{
	  desc: "Assign this gang member to be a vigilante and protect the city from criminals<br><br>Decreases wanted level",
	  isCombat: true,
	  isHacking: true,
	  name: "Vigilante Justice",
	  params: {
		baseWanted: -0.001,
		hackWeight: 20,
		strWeight: 20,
		defWeight: 20,
		dexWeight: 20,
		agiWeight: 20,
		difficulty: 1,
		territory: {
		  money: 1,
		  respect: 1,
		  wanted: 0.9, // Gets harder with more territory
		},
	  },
	},
	{
	  desc: "Assign this gang member to increase their combat stats (str, def, dex, agi)",
	  isCombat: true,
	  isHacking: true,
	  name: "Train Combat",
	  params: {
		strWeight: 25,
		defWeight: 25,
		dexWeight: 25,
		agiWeight: 25,
		difficulty: 100,
	  },
	},
	{
	  desc: "Assign this gang member to train their hacking skills",
	  isCombat: true,
	  isHacking: true,
	  name: "Train Hacking",
	  params: { hackWeight: 100, difficulty: 45 },
	},
	{
	  desc: "Assign this gang member to train their charisma",
	  isCombat: true,
	  isHacking: true,
	  name: "Train Charisma",
	  params: { chaWeight: 100, difficulty: 8 },
	},
	{
	  desc: "Assign this gang member to engage in territorial warfare with other gangs. Members assigned to this task will help increase your gang's territory and will defend your territory from being taken.",
	  isCombat: true,
	  isHacking: true,
	  name: "Territory Warfare",
	  params: {
		hackWeight: 15,
		strWeight: 20,
		defWeight: 20,
		dexWeight: 20,
		agiWeight: 20,
		chaWeight: 5,
		difficulty: 5,
	  },
	},
  ];
  
	let gangTasks = [];
	let gangCTasks = [];
	let gangHTasks = [];
	let gangTaskInfo = [];
	let gangCTaskInfo = [];
	let gangHTaskInfo = [];
  
	for (const dat of SourceDats) {
	  gangTasks.push(dat.name); gangTaskInfo.push(dat);
	  if (dat.isCombat) {gangCTasks.push(dat.name);gangCTaskInfo.push(dat);}
	  if (dat.isHacking) {gangHTasks.push(dat.name);gangHTaskInfo.push(dat);}
	}
	ns.print(gangTasks);
	ns.print(gangCTasks);
	ns.print(gangHTasks);
	ns.print(gangTaskInfo);
	ns.print(gangCTaskInfo);
	ns.print(gangHTaskInfo);
  
	let gangEquipment = [];
	for (const item of ns.gang.getEquipmentNames()) {
	  let equip = {};
	  equip.name = item;
	  equip.type = ns.gang.getEquipmentType(item);
	  equip.stats = ns.gang.getEquipmentStats(item);
	  gangEquipment.push(equip);
	}
	ns.print(gangEquipment);
	*/
}
02_gangtasks.js  (3.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

/*
export const GangTasks = ["Unassigned","Mug People","Deal Drugs","Strongarm Civilians","Run a Con","Armed Robbery","Traffick Illegal Arms","Threaten & Blackmail","Human Trafficking","Terrorism","Vigilante Justice","Train Combat","Train Hacking","Train Charisma","Territory Warfare"];
export const GangEquips = [{"name":"Baseball Bat","type":"Weapon","stats":{"str":1.04,"def":1.04}},{"name":"Katana","type":"Weapon","stats":{"str":1.08,"def":1.08,"dex":1.08}},{"name":"Glock 18C","type":"Weapon","stats":{"str":1.1,"def":1.1,"dex":1.1,"agi":1.1}},{"name":"P90C","type":"Weapon","stats":{"str":1.12,"def":1.1,"agi":1.1}},{"name":"Steyr AUG","type":"Weapon","stats":{"str":1.2,"def":1.15}},{"name":"AK-47","type":"Weapon","stats":{"str":1.25,"def":1.2}},{"name":"M15A10 Assault Rifle","type":"Weapon","stats":{"str":1.3,"def":1.25}},{"name":"AWM Sniper Rifle","type":"Weapon","stats":{"str":1.3,"dex":1.25,"agi":1.3}},{"name":"Bulletproof Vest","type":"Armor","stats":{"def":1.04}},{"name":"Full Body Armor","type":"Armor","stats":{"def":1.08}},{"name":"Liquid Body Armor","type":"Armor","stats":{"def":1.15,"agi":1.15}},{"name":"Graphene Plating Armor","type":"Armor","stats":{"def":1.2}},{"name":"Ford Flex V20","type":"Vehicle","stats":{"agi":1.04,"cha":1.04}},{"name":"ATX1070 Superbike","type":"Vehicle","stats":{"agi":1.08,"cha":1.08}},{"name":"Mercedes-Benz S9001","type":"Vehicle","stats":{"agi":1.12,"cha":1.12}},{"name":"White Ferrari","type":"Vehicle","stats":{"agi":1.16,"cha":1.16}},{"name":"NUKE Rootkit","type":"Rootkit","stats":{"hack":1.05}},{"name":"Soulstealer Rootkit","type":"Rootkit","stats":{"hack":1.1}},{"name":"Demon Rootkit","type":"Rootkit","stats":{"hack":1.15}},{"name":"Hmap Node","type":"Rootkit","stats":{"hack":1.12}},{"name":"Jack the Ripper","type":"Rootkit","stats":{"hack":1.15}},{"name":"Bionic Arms","type":"Augmentation","stats":{"str":1.3,"dex":1.3}},{"name":"Bionic Legs","type":"Augmentation","stats":{"agi":1.6}},{"name":"Bionic Spine","type":"Augmentation","stats":{"str":1.15,"def":1.15,"dex":1.15,"agi":1.15}},{"name":"BrachiBlades","type":"Augmentation","stats":{"str":1.4,"def":1.4}},{"name":"Nanofiber Weave","type":"Augmentation","stats":{"str":1.2,"def":1.2}},{"name":"Synthetic Heart","type":"Augmentation","stats":{"str":1.5,"agi":1.5}},{"name":"Synfibril Muscle","type":"Augmentation","stats":{"str":1.3,"def":1.3}},{"name":"BitWire","type":"Augmentation","stats":{"hack":1.05}},{"name":"Neuralstimulator","type":"Augmentation","stats":{"hack":1.15}},{"name":"DataJack","type":"Augmentation","stats":{"hack":1.1}},{"name":"Graphene Bone Lacings","type":"Augmentation","stats":{"str":1.7,"def":1.7}}];
*/

const powerInterval = 17 * 1000; //power updates every ~20 seconds
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	let powerTime = Date.now() + powerInterval;
	while (true) {
		const gang = asd.gang;
		const gangRep = asd.factionReps[asd.factionReps.indexOf(gang.faction) + 1];
		if (gang.territory < 1.0 && Date.now() > powerTime) { //asign to Teritory Power and await update
			for (const member of gang.members) {
				ns.gang.setMemberTask(member, 'Territory Warfare');
			}
			const oldPower = gang.power;
			while (oldPower == asd.gang.power) { await ns.sleep(100); } //wait for power to update
			powerTime = Date.now() + powerInterval;
		}
		let totalWanted = 0;
		let minStats = Number.POSITIVE_INFINITY;
		let minMember = '';
		const jobs = [];
		for (const member of gang.memberInfos) {
			const totStats = nt.gangMemberTotalStats(member);
			if (totStats < minStats) {
				minStats = totStats;
				minMember = member.name;
			}
			let maxRespect = 0;
			let maxRTask = null;
			for (const task of nt.GangCTaskInfo) {
				let taskRespect = (gangRep > 2000000) ? nt.calcMoneyGain(member, task, gang) : nt.calcRespectGain(member, task, gang);
				if (taskRespect - maxRespect > 0) {
					maxRespect = taskRespect;
					maxRTask = task;
				}
			}
			const wantedAmt = nt.calcWantedLevelGain(member, maxRTask, gang);;
			jobs.push(member.name);
			jobs.push({ name: member.name, job: maxRTask.name, wanted: wantedAmt, taskInfo: maxRTask });
			totalWanted += wantedAmt;
			ns.gang.setMemberTask(member.name, maxRTask.name);
		}
		//assign weakest to train
		ns.gang.setMemberTask(minMember, 'Train Combat');
		totalWanted -= jobs[jobs.indexOf(minMember) + 1].wanted;

		//assign Vigilante Justice
		const justiceMembers = [];
		while (totalWanted > 0) {
			await ns.sleep(1);
			let minJustice = Number.NEGATIVE_INFINITY;
			let minJMember = '';
			const justiceName = 'Vigilante Justice';
			const justiceTask = nt.gangGetTask(justiceName);
			for (const member of gang.memberInfos) {
				if (minMember == member.name || justiceMembers.includes(member.name)) continue;
				const justiceAmt = nt.calcWantedLevelGain(member, justiceTask, gang);
				if (justiceAmt > minJustice) {
					minJustice = justiceAmt;
					minJMember = member.name;
				}
			}
			if (minJMember == '') { break; }
			justiceMembers.push(minJMember);
			totalWanted -= jobs[jobs.indexOf(minJMember) + 1].wanted;
			totalWanted += minJustice;
			ns.gang.setMemberTask(minJMember, 'Vigilante Justice');
			//TODO remove their wanted contribution
		}
		await ns.sleep(500);
	}
}
02_gangwarfare.js  (3.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	if (asd.gang.territory >= 1.0) { ns.gang.setTerritoryWarfare(false); }
}
04_augments.js  (81.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

// shows a list of all remaining (not installed or already purchased) augments available from your current factions.
//  the list is conveniently sorted by cost (start at the top and work down)
// add 'all' to the arguments list to not limit it to current factions (all unowned augments will be shown)
// optionally can pass a faction or list of factions to search (like run 04_augmnets.js "The Syndicate" "Slum Snakes")
// REQUIRES Singularity access (BN 4) to autamatically exclude owned augments, will still run without
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.clearLog();

	const showAll = ns.args.includes('all');

	//try {
		let searchFactions = [];
		for (const arg of ns.args) { if (nt.factionList.includes(arg)) { searchFactions.push(arg); } }
		if (searchFactions.length == 0 && asd.player) { searchFactions = asd.player.factions; }

		let ownedAugs = [];
		if (nt.hasSingularity()) { ownedAugs = ns.getOwnedAugmentations(true); }
		else {ownedAugs = asd.ownedAugs; }

		for (const aug of nt.gNeededAugmentations(ownedAugs)) {
			await ns.sleep(0);
			let infac = false;
			for (const fac of aug.factions) {
				await ns.sleep(0);
				if (searchFactions.includes(fac)) { infac = true; }
			}
			if (showAll || infac) {
				ns.print((aug.name + '').padEnd(55, '.') + ' '
					+ ns.nFormat(aug.price, '0.0e+0').padEnd(7) + ' '
					+ ns.nFormat(aug.rep, '0,0').padStart(9) + ' '
					+ aug.factions
				);
			}
		}
	//}
	//catch { };

	// generator for notns constant (in case the list ever changes)
	/*
		for (const faction of nt.factionList) {
			await ns.sleep(0);
			ns.print(',{faction: '+faction+', augments: '+ns.getAugmentationsFromFaction(faction)+'}');
		}
	*/
	// generator for augmentList and augmentDetails notns constants
	/*
		let augList = [];
		let augDetails = [];
		for (const faction of nt.augmentsByFaction) {
			await ns.sleep(0);
			for (const augment of faction.augments) {
				if (!augList.includes(augment)) {
					await ns.sleep(0);
					augList.push(augment);
	
					let factions = [];
					for (const fac of nt.augmentsByFaction) {
						if (fac.augments.includes(augment)) {
							factions.push(fac.faction);
						}
					}
	
					let obj = {};
					obj.name = augment;
					obj.price = ns.getAugmentationPrice(augment);
					obj.rep = ns.getAugmentationRepReq(augment);
					obj.stats = ns.getAugmentationStats(augment);
					obj.prereqs = ns.getAugmentationPrereq(augment);
					obj.factions = factions;
					augDetails.push(obj);
				}
			}
		}
		//sort by price descending
		augDetails.sort((a,b) => (b.price - a.price));
		//rebuild auglist in same order
		augList = [];
		for (const aug of augDetails) {
			augList.push(aug.name);
		}
		ns.print(augList);
		ns.print(augDetails);
	//	let augDets = '';
	//	for (const aug of augDetails){
	//		augDets += ',{name: ' + aug.name
	//		+ ', price: ' + aug.price
	//		+ ', rep: ' + aug.rep
	//		+ ', stats: ' + aug.stats
	//		+ ', prereqs: ' + aug.prereqs
	//		+ '}';
	//	}
	//	augDets = '['+augDets.substring(1)+']';
	//	ns.print(augDets)
	*/

}
04_bdoor.js  (65.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

// attempts to automatically backdoor an appropriate target if you have access to Singularity (BN 4)
// otherwise periodically (every 5 minutes by default) provides a list of appropriate targets
// REQUIRES Singularity access (BN 4) to autamatically install backdoors for you, will still notify without
// DEPENDS ON masterdata.js database updates
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	try {
		for (const bak of asd.servers.bak) { //for each server in the backdoor needed list
			await ns.sleep(1); //don't hang the game
			ns.connect('home');
			ns.tprint('== Opening Backdoor on ' + bak);
			let paths = nt.connectPath(bak);
			for (const path of paths) {
				ns.connect(path); //connect to the target
				await ns.sleep(1);
			}
			await ns.installBackdoor(); //install the backdoor
			ns.connect('home');
			paths = nt.connectPath(asd.bests[0].tar);
			for (const path of paths) {
				ns.connect(path); //connect to the target
				await ns.sleep(1);
			}
		}
		asd.noticeTime = Date.now() + mc.NoticeInterval; //update notice time
	} catch { //output a list to the terminal every 5 minutes
		if ((!asd.noticeTime) || (Date.now() - asd.noticeTime > 0)) {
			ns.tprint(('== Backdoors needed on ' + asd.servers.bak).replaceAll(',', ' ')); //make list copy paste-able to connect
			asd.noticeTime = Date.now() + mc.NoticeInterval; //wait 5 minutes before repeating
		}
	}
}
04_buyall.js  (33.60)
/** @param {NS} ns **/
export async function main(ns) {
	try {
		ns.purchaseProgram('BruteSSH.exe');
		ns.purchaseProgram('FTPCrack.exe');
		ns.purchaseProgram('relaySMTP.exe');
		ns.purchaseProgram('HTTPWorm.exe');
		ns.purchaseProgram('SQLInject.exe');
		//ns.purchaseProgram('ServerProfiler.exe');
		//ns.purchaseProgram('Deepscanv1.exe');
		//ns.purchaseProgram('Deepscanv2.exe');
		//ns.purchaseProgram('Autolink.exe');
		//ns.purchaseProgram('Formulas.exe');
	} catch {}
}
04_buytor.js  (33.60)
/** @param {NS} ns **/
export async function main(ns) {
	try {ns.purchaseTor();} catch {};
}
04_crime.js  (89.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

/* REFERENCE INFO
CONSTANTS.IntelligenceCrimeBaseExpGain = 0.05 (xpRate / 20)
and manual hack xp is divided by 200, so all values have been multiplied accordingly
(ie, divide the values listed by 00 to get actual Intelligence Xp/sec, but the relative values are directly comperable)
xp/s crime
1.25  RobStore: new Crime("Rob Store", CONSTANTS.CrimeRobStore, 60e3, 400e3, 1 / 5, 0.5, {
60    intelligence_exp: 7.5 * CONSTANTS.IntelligenceCrimeBaseExpGain,
1.67  Larceny: new Crime("Larceny", CONSTANTS.CrimeLarceny, 90e3, 800e3, 1 / 3, 1.5, {
90    intelligence_exp: 15 * CONSTANTS.IntelligenceCrimeBaseExpGain,
2.00  BondForgery: new Crime("Bond Forgery", CONSTANTS.CrimeBondForgery, 300e3, 4.5e6, 1 / 2, 0.1, {
300    intelligence_exp: 60 * CONSTANTS.IntelligenceCrimeBaseExpGain,
2.00  GrandTheftAuto: new Crime("Grand Theft Auto", CONSTANTS.CrimeGrandTheftAuto, 80e3, 1.6e6, 8, 5, {
80    intelligence_exp: 16 * CONSTANTS.IntelligenceCrimeBaseExpGain,
2.17  Kidnap: new Crime("Kidnap", CONSTANTS.CrimeKidnap, 120e3, 3.6e6, 5, 6, {
120    intelligence_exp: 26 * CONSTANTS.IntelligenceCrimeBaseExpGain,
2.17  Assassination: new Crime("Assassination", CONSTANTS.CrimeAssassination, 300e3, 12e6, 8, 10, {
300    intelligence_exp: 65 * CONSTANTS.IntelligenceCrimeBaseExpGain,
2.17  Heist: new Crime("Heist", CONSTANTS.CrimeHeist, 600e3, 120e6, 18, 15, {
600    intelligence_exp: 130 * CONSTANTS.IntelligenceCrimeBaseExpGain,

Manual hack = hackXp / manualHackTime
*/

// attempts to automatically commit a number of crimes equal to the first parameter
// REQUIRES Singularity access (BN 4) to operate
// WARNING! WARNING! locks up interface, so argument is set too high, IT MUST BE MANUALLY ENDED!
// So make sure to start with --tail (AND DON'T CLOSE THE WINDOW) so you can click kill when you're ready to stop or pass in a reasonable parameter

const crimeList = ['Kidnap', 'Assassination', 'Heist']; //list of most profitable crimes (in terms of intelligence xp/sec)
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	ns.disableLog('sleep');
	ns.clearLog();

	let rounds = 30; //default to 30 crimes if no parameter is passed in
	let crime = '';
	if (ns.args.includes('Homicide') || ns.args.includes('kill')) { crime = 'Homocide'; }
	if (parseInt(ns.args[0], 10) > 0) { rounds = parseInt(ns.args[0], 10); }

	//homicide for body count for faction reqs, failures don't matter, still get xp
	while (crime == 'Homocide' && ns.heart.break() > -100 && rounds > 0) {
		await ns.sleep(0);
		rounds--;
		ns.commitCrime('Homicide');
		while (ns.isBusy()) { await ns.sleep(100); } //wait for crime to complete
	}
	//if (crime == 'Homocide') { return; } //don't run high crimes if only for kill count

	//best crimes for intelligence xp/s
	while (rounds > 0) { //High Crimes for intelligence Xp
		await ns.sleep(0);
		rounds--;
		ns.commitCrime(crimeList[Math.floor(Math.random() * crimeList.length)]);
		while (ns.isBusy()) { await ns.sleep(100); } //wait for crime to complete
	}
}
04_factionrep.js  (17.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database
	asd.factionReps = asd.factionReps??[0];

	try {
		const factionReps = [0]
		for (const fac of asd.player.factions) {
			factionReps.push(fac);
			factionReps.push(ns.getFactionRep(fac));
		}
		asd.factionReps = factionReps;
	} catch {}
}
04_factions.js  (81.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.clearLog();

	let ownedAugs = [];
	if (nt.hasSingularity()) { ownedAugs = ns.getOwnedAugmentations(true); }
	else {ownedAugs = asd.ownedAugs; }

	for (const fac of nt.gNeededFactions(ownedAugs)) { ns.print(fac); }
}
04_homecpu.js  (49.60)
/** @param {NS} ns **/
// attempts to upgrade your home server's CPU
// run periodically to ensure your home computer stays upgaded
// REQUIRES Singularity access (BN 4) to function
export async function main(ns) {
	try { if (ns.upgradeHomeCores()) { ns.tprint('== upgraded home CPU =='); } }
	catch { }
}
04_homeram.js  (49.60)
/** @param {NS} ns **/
// attempts to upgrade your home server's RAM
// run periodically to ensure your home computer stays upgaded
// REQUIRES Singularity access (BN 4) to function
export async function main(ns) {
	try { if (ns.upgradeHomeRam()) { ns.tprint('== upgraded home RAM =='); } }
	catch { }
}
04_manualhack.js  (33.60)
/** @param {NS} ns **/

// just tries to manually hack whichever server you're currently conencted to (including home)
//  intended to automate Intelligence xp gains
// REQUIRES Singularity access (BN 4) to function
export async function main(ns) {
	ns.disableLog("sleep");

	try { while (true) { await ns.sleep(0); await ns.manualHack(); } }
	catch { }
}
04_ownedaugs.js  (81.60)
/** @param {NS} ns **/

// updates a list of your installed augments
// run once at the beginning of a run
// REQUIRES Singularity access (BN 4) to function properly
export async function main(ns) {
	try { Math.asd.ownedAugs = ns.getOwnedAugmentations(false); } catch { }
}
05_bitnode.js  (5.60)
/** @param {NS} ns **/

// updates all scripts data bitnode multipliers, to save RAM
// run once at the beginning of a run (or after restarting the game)
// REQUIRES Source 5 to get the multipliers, otherwise just sets them to BN1 defaults

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	try { asd.BitNodeMultipliers = ns.getBitNodeMultipliers(); }
	catch {
		const bnm = {
			HackingLevelMultiplier: 1,
			StrengthLevelMultiplier: 1,
			DefenseLevelMultiplier: 1,
			DexterityLevelMultiplier: 1,
			AgilityLevelMultiplier: 1,
			CharismaLevelMultiplier: 1,
			ServerGrowthRate: 1,
			ServerMaxMoney: 1,
			ServerStartingMoney: 1,
			ServerStartingSecurity: 1,
			ServerWeakenRate: 1,
			HomeComputerRamCost: 1,
			PurchasedServerCost: 1,
			PurchasedServerSoftcap: 1,
			PurchasedServerLimit: 1,
			PurchasedServerMaxRam: 1,
			CompanyWorkMoney: 1,
			CrimeMoney: 1,
			HacknetNodeMoney: 1,
			ManualHackMoney: 1,
			ScriptHackMoney: 1,
			ScriptHackMoneyGain: 1,
			CodingContractMoney: 1,
			ClassGymExpGain: 1,
			CompanyWorkExpGain: 1,
			CrimeExpGain: 1,
			FactionWorkExpGain: 1,
			HackExpGain: 1,
			FactionPassiveRepGain: 1,
			FactionWorkRepGain: 1,
			RepToDonateToFaction: 1,
			AugmentationMoneyCost: 1,
			AugmentationRepCost: 1,
			InfiltrationMoney: 1,
			InfiltrationRep: 1,
			FourSigmaMarketDataCost: 1,
			FourSigmaMarketDataApiCost: 1,
			CorporationValuation: 1,
			CorporationSoftCap: 1,
			BladeburnerRank: 1,
			BladeburnerSkillCost: 1,
			GangSoftcap: 1,
			DaedalusAugsRequirement: 1,
			StaneksGiftPowerMultiplier: 1,
			StaneksGiftExtraSize: 0,
			WorldDaemonDifficulty: 1
		}
		//bnm = null;
		asd.BitNodeMultipliers = bnm;
	}
	ns.clearLog();
	for (const pair in asd.BitNodeMultipliers) {
		ns.print(pair + ": " + asd.BitNodeMultipliers[pair]);
	}
}
MSperWeaken.js  (3.00)
/** @param {NS} ns **/
const sFiles = [2.0, '_weak.ns', 1.75, '_hack.ns', 1.70, '_grow.ns', 1.75, 'fixem.ns', 1.95];
const homeReserve = 100; //amt of ram to keep free at home

const MaxTargets = 1; //Maximum number of targets servers to atatck

function scriptRam(script = '_weak.ns') { return sFiles[sFiles.indexOf(script) + 1]; }
function freeRam(server) {
	return ss.getServerMaxRam(server) - ss.getServerUsedRam(server)
		- ((server == 'home') ? homeReserve : 0);
}
function canRun(server, script = '_weak.ns') { return freeRam(server) >= scriptRam(script); }
function maxThreads(server, script = '_weak.ns') { return Math.floor(freeRam(server) / scriptRam(script)); }

function launchAttack(ns, type, tar, threads = 1, start = 0) {
	var sFi = 1; //w
	if (type == 'h') { sFi = 3; }
	if (type == 'g') { sFi = 5; }
	var script = sFiles[sFi];

	var ress = []; if (Array.isArray(asd.ress)) { ress = asd.ress; }
	//	if (type == 'g') { ress.sort((a, b) => (b.cpuCores - a.cpuCores > 0) ? 1 : (a.cpuCores == b.cpuCores) ? ((a.maxRam - b.maxRam < 0) ? 1 : -1) : -1) }
	//	else { ress.sort((a, b) => (a.cpuCores - b.cpuCores > 0) ? 1 : (a.cpuCores == b.cpuCores) ? ((a.maxRam - b.maxRam < 0) ? 1 : -1) : -1) }

	for (var i = 0; i < ress.length && parseInt(threads) >= 1; i++) {
		var res = ress[i];
		var resn = res.hostname;
		//ss.print(resn);
		if (canRun(resn, script)) {
			//adjust threads needed if server has more cores
			var coreMult = 1;
			if ((type == 'w' || type == 'g') && res.cpuCores > 1) { coreMult = 1 + (res.cpuCores - 1) / 16; }
			var th = Math.max(1, Math.min(Math.ceil(threads / coreMult), maxThreads(resn, script))); //threads to assign to this attack
			var uid = Math.random();
			ns.exec(script, resn, th, tar, uid);
			threads -= Math.max(1,parseInt(Math.floor(th * coreMult)));
		}
	}
}

let ss;
let asd = {}; //all script data
export async function main(ns) {
	if (!ns.getPortHandle(20).data) { ns.getPortHandle(20).data = asd; } //if port's empty, initialize it
	asd = ns.getPortHandle(20).data; //if port's not empty, populate asd
	ss = ns;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMaxMoney');
	ns.disableLog('exec');
	ns.disableLog('getServerMinSecurityLevel');
	ns.clearLog();

	var count = 0;
	var start = Date.now();
	while (true) {
		launchAttack(ns, 'w', 'lexo-corp', 1);
//		launchAttack(ns, 'w', 'lexo-corp', 1);
//		launchAttack(ns, 'w', 'lexo-corp', 1);
//		launchAttack(ns, 'w', 'lexo-corp', 1);
//		launchAttack(ns, 'w', 'lexo-corp', 1);
		count++;
		if (!(count%1000)) {
			ns.print((Date.now()-start)/count);
		}
		await ns.sleep(1);
	}
}
_grow.js  (1.75)
/** @param {NS} ns **/

// GROW slave script
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.grow(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.grow(ns.args[0]); }
    }
}
_hack.js  (1.70)
/** @param {NS} ns **/

// HACK slave script
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.hack(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.hack(ns.args[0]); }
    }
}
_watchTargets.js  (1.80)
/** @param {NS} ns **/

//used to watch all scripts database target data

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

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
_weak.js  (1.75)
/** @param {NS} ns **/

// WEAKEN slave script
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.weaken(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.weaken(ns.args[0]); }
    }
}
all41.js  (1.90)
/** @param {NS} ns **/

//used to create the allinone.txt file with all my scripts in it.
export async function main(ns) {
//    const sList = ["_grow.js","_hack.js","_watchTargets.js","_weak.js"
//		,"00_bitnode.js","00_sourcefiles.js","04_bdoor.js","fixem.js","masterconfig.js"
//		,"masterdata.js","masterfixem.js","masternuke.js","masterscripts.js","masterspawn.js","masterstrat.js"
//		,"notns.js","sendem.js","watchbests.js"];
    const sList = ns.ls('home','.js'); //grab all of the home server's .js files
	const outFile = 'allinone.txt';
	await ns.write(outFile, '', 'w');

	for (const s of sList) {
		await ns.sleep(0);
		const dat = ns.read(s);
		const name = s + '  (' + ns.nFormat(ns.getScriptRam(s),'0.00') + ')';
		await ns.write(outFile, name, 'a');
		await ns.write(outFile, '\n', 'a');
		await ns.write(outFile, dat, 'a');
		await ns.write(outFile, '\n', 'a');
	}
}
cctsolver.js  (22.00)
/** @param {NS} ns **/

/* REFERENCE INFO
attempt(answer, filename, host, true) : fail = '', otherwise description of reward
getContractType(filename, host) : string
getData(filename, host) : any (depends on contract type)
getDescription(filename, host) : string
getNumTriesRemaining(filename, host) : number
*/

//gathers and solves all contracts on the network
// make sure to call with --tail if you want to see the results.

function showCcts(ccts) {
	for (var i = 0; i < ccts.length; i += 2) {
		ss.asleep(1);
		showCct(ccts[i], ccts[i + 1])
	}
}

function showCct(cct, server) {
	ss.print('---------');
	ss.print('Cct: ' + cct + ' @ ' + server + ' Type: ' + ss.codingcontract.getContractType(cct, server));
	ss.print(ss.codingcontract.getData(cct, server));
	ss.print('---------');
}

function gatherCcts() {
	ss.tprint('--searching all servers');
	const contracts = [];
	const servers = ['home'];
	for (const server of servers) {
		ss.asleep(1);
		servers.push.apply(servers, (ss.scan(server).slice(server == 'home' ? 0 : 1))); //add the server's forward only children; home has no parent to skip
		for (const cct of ss.ls(server, '.cct')) {
			ss.asleep(1);
			contracts.push(cct);
			contracts.push(server);
		}
	}
	return contracts;
}

async function solveCcts(ccts) {
	for (var i = 0; i < ccts.length; i += 2) { ss.asleep(1); solveCct(ccts[i], ccts[i + 1]); }
}

async function solveCct(cct, server) {
	//	const tries = ss.codingcontract.getNumTriesRemaining(cct, server);
	//	if (tries < 3) { ss.print('==Tries Low== (' + tries + ') ' + cct + ' @ ' + server); return; }
	const type = ss.codingcontract.getContractType(cct, server);
	const data = ss.codingcontract.getData(cct, server);

	let sol = null;
	switch (type) {
		case 'Unique Paths in a Grid I':
			sol = solveGridI(data[0], data[1]);
			break;
		case 'Unique Paths in a Grid II':
			sol = solveGridII(data);
			break;
		case 'Merge Overlapping Intervals':
			sol = overlappingintervals(data);
			break;
		case 'Find Largest Prime Factor':
			sol = largestPrimeFactor(data);
			break;
		case 'Total Ways to Sum':
			sol = waysToSum(data);
			break;
		case 'Subarray with Maximum Sum':
			sol = maxSubarraySum(data);
			break;
		case 'Spiralize Matrix':
			sol = spiralMatrix(data);
			break;
		case 'Array Jumping Game':
			sol = arrayJump(data);
			break;
		case 'Generate IP Addresses':
			sol = ipAddresses(data);
			break;
		case 'Algorithmic Stock Trader I':
			sol = astI(data);
			break;
		case 'Algorithmic Stock Trader II':
			sol = astII(data);
			break;
		case 'Algorithmic Stock Trader III':
			sol = astIII(data);
			break;
		case 'Algorithmic Stock Trader IV':
			sol = astIV(data);
			break;
		case 'Minimum Path Sum in a Triangle':
			sol = triangleSum(data);
			break;
		case 'Sanitize Parentheses in Expression':
			sol = paren(data);
			break;
		case 'Find All Valid Math Expressions':
			sol = validMath(data);
			break;

	}
	if (sol !== null) {
		const res = ss.codingcontract.attempt(sol, cct, server, true);
		if (res = '') {
			ss.tprint('===== FAILED!! =====');
			ss.print('===== FAILED!! =====');
			showCct(cct, server);
			ss.print(sol);
		} else {
			ss.tprint(res);
		}
	}
}

function helper(res, path, num, target, pos, evaluated, multed) {
	if (pos === num.length) {
		if (target === evaluated) {
			res.push(path);
		}
		return;
	}

	for (let i = pos; i < num.length; ++i) {
		ss.asleep(1);
		if (i != pos && num[pos] == "0") {
			break;
		}
		const cur = parseInt(num.substring(pos, i + 1));

		if (pos === 0) {
			helper(res, path + cur, num, target, i + 1, cur, cur);
		} else {
			helper(res, path + "+" + cur, num, target, i + 1, evaluated + cur, cur);
			helper(res, path + "-" + cur, num, target, i + 1, evaluated - cur, -cur);
			helper(res, path + "*" + cur, num, target, i + 1, evaluated - multed + multed * cur, multed * cur);
		}
	}
}

function validMath(data) {
	const num = data[0];
	const target = data[1];

	if (num == null || num.length === 0) { return ""; }

	const result = [];
	helper(result, "", num, target, 0, 0, 0);
	return result.toString();
}

function triangleSum(data) {
	const n = data.length;
	const dp = data[n - 1].slice();
	for (let i = n - 2; i > -1; --i) {
		for (let j = 0; j < data[i].length; ++j) {
			ss.asleep(1);
			dp[j] = Math.min(dp[j], dp[j + 1]) + data[i][j];
		}
	}
	return dp[0];
}

function astIV(data) {
	const k = data[0];
	const prices = data[1];

	const len = prices.length;
	if (len < 2) { return 0; }
	if (k > len / 2) {
		let res = 0;
		for (let i = 1; i < len; ++i) {
			ss.asleep(1);
			res += Math.max(prices[i] - prices[i - 1], 0);
		}
		return res;
	}
	const hold = [];
	const rele = [];
	hold.length = k + 1;
	rele.length = k + 1;
	for (let i = 0; i <= k; ++i) {
		ss.asleep(1);
		hold[i] = Number.MIN_SAFE_INTEGER;
		rele[i] = 0;
	}
	let cur;
	for (let i = 0; i < len; ++i) {
		cur = prices[i];
		for (let j = k; j > 0; --j) {
			ss.asleep(1);
			rele[j] = Math.max(rele[j], hold[j] + cur);
			hold[j] = Math.max(hold[j], rele[j - 1] - cur);
		}
	}
	return rele[k];
}

function astIII(data) {
	let hold1 = Number.MIN_SAFE_INTEGER;
	let hold2 = Number.MIN_SAFE_INTEGER;
	let release1 = 0;
	let release2 = 0;
	for (const price of data) {
		ss.asleep(1);
		release2 = Math.max(release2, hold2 + price);
		hold2 = Math.max(hold2, release1 - price);
		release1 = Math.max(release1, hold1 + price);
		hold1 = Math.max(hold1, price * -1);
	}
	return release2.toString();
}

function astII(data) {
	let profit = 0;
	for (let p = 1; p < data.length; ++p) {
		ss.asleep(1);
		profit += Math.max(data[p] - data[p - 1], 0);
	}
	return profit.toString();
}

function astI(data) {
	let curVal = 0;
	let bestVal = 0;
	for (let i = 1; i < data.length; ++i) {
		ss.asleep(1);
		curVal = Math.max(0, (curVal += data[i] - data[i - 1]));
		bestVal = Math.max(curVal, bestVal);
	}
	return bestVal;
}

function ipAddresses(data) {
	const ret = [];
	for (let a = 1; a <= 3; ++a) {
		for (let b = 1; b <= 3; ++b) {
			for (let c = 1; c <= 3; ++c) {
				for (let d = 1; d <= 3; ++d) {
					if (a + b + c + d === data.length) {
						ss.asleep(1);
						const A = parseInt(data.substring(0, a), 10);
						const B = parseInt(data.substring(a, a + b), 10);
						const C = parseInt(data.substring(a + b, a + b + c), 10);
						const D = parseInt(data.substring(a + b + c, a + b + c + d), 10);
						if (A <= 255 && B <= 255 && C <= 255 && D <= 255) {
							const ip = [A.toString(), ".", B.toString(), ".", C.toString(), ".", D.toString()].join("");
							if (ip.length === data.length + 3) { ret.push(ip); }
						}
					}
				}
			}
		}
	}
	return ret;
}

function arrayJump(data) {
	const n = data.length;
	let i = 0;
	for (let d = 0; i < n && i <= d; ++i) {
		ss.asleep(1);
		d = Math.max(i + data[i], d);
	}

	if (i == n) { return '1'; }
	return '0';
}

function solveGridI(n, m) {
	const currentRow = [];
	currentRow.length = n;

	for (let i = 0; i < n; i++) {
		ss.asleep(1);
		currentRow[i] = 1;
	}
	for (let row = 1; row < m; row++) {
		for (let i = 1; i < n; i++) {
			ss.asleep(1);
			currentRow[i] += currentRow[i - 1];
		}
	}

	return currentRow[n - 1];

	/* the game engine does not handle recurssion well at all
		if (m == 1 || n == 1)
			return 1;
		return solveGridI(m - 1, n) + solveGridI(m, n - 1);
	*/
}

function solveGridII(data) {
	const obstacleGrid = [];
	obstacleGrid.length = data.length;
	for (let i = 0; i < obstacleGrid.length; ++i) {
		ss.asleep(1);
		obstacleGrid[i] = data[i].slice();
	}

	for (let i = 0; i < obstacleGrid.length; i++) {
		for (let j = 0; j < obstacleGrid[0].length; j++) {
			ss.asleep(1);
			if (obstacleGrid[i][j] == 1) {
				obstacleGrid[i][j] = 0;
			} else if (i == 0 && j == 0) {
				obstacleGrid[0][0] = 1;
			} else {
				obstacleGrid[i][j] = (i > 0 ? obstacleGrid[i - 1][j] : 0) + (j > 0 ? obstacleGrid[i][j - 1] : 0);
			}
		}
	}

	return obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1];
}

function overlappingintervals(data) {
	//sort
	data.sort((a, b) => (a[0] - b[0] > 0) ? 1 : (a[0] == b[0]) ? ((a[1] - b[1] > 0) ? 1 : -1) : -1);
	//merge
	for (var i = 0; i < data.length - 1; i++) {
		ss.asleep(1);
		var dat0 = data[i];
		var dat1 = data[i + 1];
		if (dat0[1] - dat1[0] >= 0) {
			if (dat1[1] - dat0[1] > 0) {
				dat0[1] = dat1[1];
			}
			data.splice(i + 1, 1);
			i--;
		}
	}
	return data;
}

function largestPrimeFactor(data) {
	let n = parseInt(data, 10);
	let f = 2; //start testing with factor 2
	for (f; (f - 1) < Math.floor(Math.sqrt(n)); f++) { //increase factor until too big
		ss.asleep(1);
		while (n % f === 0) { ss.asleep(1); n = Math.round(n / f); } // reduce n by cur factor as many times as possible
	}
	return n === 1 ? f - 1 : n; //if n==1, then last factor was lpf, otherwise there are no factors left in n, and n is fully reduced and lpf
}

function waysToSum(data) {
	const sums = [1];
	sums.length = data + 1;
	sums.fill(0, 1);
	for (let i = 1; i < data; ++i) {
		for (let j = i; j <= data; ++j) {
			ss.asleep(1);
			sums[j] += sums[j - i];
		}
	}
	return sums[data];
}

function maxSubarraySum(data) {
	const subs = data;
	for (let i = 1; i < subs.length; i++) {
		ss.asleep(1);
		subs[i] = Math.max(subs[i], subs[i] + subs[i - 1]);
	}
	return Math.max(...subs);
}

function dfs(pair, index, left, right, s, solution, res) {
	if (s.length === index) {
		if (left === 0 && right === 0 && pair === 0) {
			for (let i = 0; i < res.length; i++) {
				ss.asleep(1);
				if (res[i] === solution) {
					return;
				}
			}
			res.push(solution);
		}
		return;
	}

	if (s[index] === "(") {
		if (left > 0) {
			dfs(pair, index + 1, left - 1, right, s, solution, res);
		}
		dfs(pair + 1, index + 1, left, right, s, solution + s[index], res);
	} else if (s[index] === ")") {
		if (right > 0) dfs(pair, index + 1, left, right - 1, s, solution, res);
		if (pair > 0) dfs(pair - 1, index + 1, left, right, s, solution + s[index], res);
	} else {
		dfs(pair, index + 1, left, right, s, solution + s[index], res);
	}
}

function paren(data) {
	let left = 0;
	let right = 0;
	const res = [];

	for (let i = 0; i < data.length; ++i) {
		ss.asleep(1);
		if (data[i] === "(") { ++left; }
		else if (data[i] === ")") { left > 0 ? --left : ++right; }
	}

	dfs(0, 0, left, right, data, "", res);
	return res;
}

function spiralMatrix(data) {
	const spiral = [];
	const m = data.length;
	const n = data[0].length;
	let u = 0;
	let d = m - 1;
	let l = 0;
	let r = n - 1;
	let k = 0;
	const start = Date.now();
	while (true) {
		if (Date.now() > start + 5000) {return;} //5 second rule (abort if taking too long)
		ss.asleep(1);
		// Up
		for (let col = l; col <= r; col++) {
			ss.asleep(1);
			spiral[k] = data[u][col];
			++k;
		}
		if (++u > d) { break; }

		// Right
		for (let row = u; row <= d; row++) {
			ss.asleep(1);
			spiral[k] = data[row][r];
			++k;
		}
		if (--r < l) { break; }

		// Down
		for (let col = r; col >= l; col--) {
			ss.asleep(1);
			spiral[k] = data[d][col];
			++k;
		}
		if (--d < u) { break; }

		// Left
		for (let row = d; row >= u; row--) {
			ss.asleep(1);
			spiral[k] = data[row][l];
			++k;
		}
		if (++l > r) { break; }
	}
	return spiral;
}

let ss; //global reference to ns for functions to use
export async function main(ns) {
	ss = ns;

	ns.disableLog('disableLog');
	ns.disableLog('scan');
	ns.disableLog('sleep');
	ns.disableLog('asleep');
	ns.clearLog();

	const ccts = gatherCcts();
	showCcts(ccts);
	solveCcts(ccts);
}
connect.js  (1.80)
/** @param {NS} ns **/
export async function main(ns) {
    let target = ns.args[0];
    let paths = { "home": "" };
    let queue = Object.keys(paths);
    let name;
    let output;
    let pathToTarget;
    while ((name = queue.shift())) {
        let path = paths[name];
        let scanRes = ns.scan(name);
        for (let newSv of scanRes) {
            if (paths[newSv] === undefined) {
                queue.push(newSv);
                paths[newSv] = `${path},${newSv}`;
                if (newSv == target)
                    pathToTarget = paths[newSv].substr(1).split(",");
            }
        }
    }
    output = "home; ";

    pathToTarget.forEach(server=> output += " connect " + server + ";");

    const terminalInput = Math.doc.getElementById("terminal-input");
    terminalInput.value=output;
    const handler = Object.keys(terminalInput)[1];
    terminalInput[handler].onChange({target:terminalInput});
    terminalInput[handler].onKeyDown({keyCode:13,preventDefault:()=>null});
}
doall.js  (3.60)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

// master script - runs all the other scripts
// run at the beginning of a run to make everything start happening automatically

function scriptRunning(ns, script, server = 'home') { return ns.scriptRunning(script, server); }

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("asleep");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("getServerUsedRam");
	ns.disableLog("getScriptRam");
	ns.clearLog();

	asd.noticeTime = asd.noticeTime ?? (Date.now() + mc.NoticeInterval);
	asd.ram = 4;
	asd.gang = {};

	try { ns.run('05_bitnode.js'); } catch { return; }
	try { ns.run('00_sourcefiles.js'); } catch { return; }
	try { ns.run('00_getwin.js'); } catch { return; }
	try { ns.run('00_getdoc.js'); } catch { return; }
	try { ns.run('04_ownedaugs.js'); } catch { return; }
	await ns.sleep(50);
	try { ns.run('karma.js'); } catch { }

	if (!scriptRunning(ns, 'masterscripts.js')) { //gather home server's script data
		ns.run('masterscripts.js');; while (scriptRunning(ns, 'masterscripts.js')) { await ns.asleep(50); }
		await ns.sleep(100);
	}
	if (!scriptRunning(ns, 'masterdata.js')) {
		ns.run('masterdata.js'); while (scriptRunning(ns, 'masterdata.js')) { await ns.asleep(50); }
		await ns.sleep(100);
	}
	if (!scriptRunning(ns, 'sendem.js')) {
		ns.run('sendem.js'); await ns.sleep(100);
	}
	if (!scriptRunning(ns, 'masterstrat.js')) {
		ns.run('masterstrat.js', 1, 'clear'); while (scriptRunning(ns, 'masterstrat.js')) { await ns.asleep(50); }
		await ns.sleep(100);
	}

	while (true) {
		await ns.sleep(500);
		if (nt.hasSource(4) && !scriptRunning(ns, '04_buytor.js') && nt.canRun('home', '04_buytor.js', true)) {
			ns.run('04_buytor.js');
			await ns.sleep(100);
		}
		if (nt.hasSource(4) && !scriptRunning(ns, '04_buyall.js') && nt.canRun('home', '04_buyall.js', true)) {
			ns.run('04_buyall.js');
			await ns.sleep(100);
		}
		//4.60GB - upgrades home ram
		if (nt.hasSource(4) && !scriptRunning(ns, '04_homeram.js') && nt.canRun('home', '04_homeram.js', true)) {
			ns.run('04_homeram.js');
			await ns.sleep(100);
		}
		//4.60GB - upgrades home cpu
		if (nt.hasSource(4) && !scriptRunning(ns, '04_homecpu.js') && nt.canRun('home', '04_homecpu.js', true)) {
			ns.run('04_homecpu.js');
			await ns.sleep(100);
		}
		//1.90GB - updates the scripts and sizes on home
		if (!scriptRunning(ns, 'masterscripts.js') && nt.canRun('home', 'masterscripts.js', true)) {
			ns.run('masterscripts.js'); await ns.sleep(500);
		}
		//9.10GB - Manages player servers
		if (!scriptRunning(ns, 'masterpserv.js') && nt.canRun('home', 'masterpserv.js', true)) {
			ns.run('masterpserv.js'); await ns.sleep(500);
		}
		//4.40GB - Manages and updates all servers database
		if (!scriptRunning(ns, 'masterdata.js') && nt.canRun('home', 'masterdata.js', true)) {
			if (nt.homeReserve() > (16 + nt.scriptCost('masterdata.js'))) {
				ns.run('masterdata.js', 1, 'loop');
			}
			else { ns.run('masterdata.js'); while (scriptRunning(ns, 'masterdata.js')) { await ns.sleep(100); } }
			await ns.sleep(500);
		}
		//2.20GB - sends scripts files to all servers
		if (!scriptRunning(ns, 'sendem.js') && nt.canRun('home', 'sendem.js', true)) {
			ns.run('sendem.js'); await ns.sleep(500);
		}
		//2.60GB - populates the factionRep list
		if (nt.hasSource(4) && !scriptRunning(ns, '04_factionrep.js') && nt.canRun('home', '04_factionrep.js', true)) {
			ns.run('04_factionrep.js');
			await ns.sleep(100);
		}
		//2.90GB - fills small servers with fixem scripts
		if (!scriptRunning(ns, 'masterfixem.js') && nt.canRun('home', 'masterfixem.js', true) && (asd.servers.sml.length > 0)) {
			ns.run('masterfixem.js'); await ns.sleep(500);
		}
		//4.00GB - Opens ports and Nukes
		if (!scriptRunning(ns, 'masternuke.js') && nt.canRun('home', 'masternuke.js', true) && !(asd.servers.non.length == asd.servers.hal.length)) {
			ns.run('masternuke.js');
			await ns.sleep(500);
		}
		//5.6GB - backdoors a system
		if (!scriptRunning(ns, '04_bdoor.js') && Array.isArray(asd.servers.bak) && asd.servers.bak.length > 0) {
			if (nt.hasSource(4) && nt.canRun('home', '04_bdoor.js', true)) {
				ns.run('04_bdoor.js');
				await ns.sleep(500);
			} else if (Date.now() - asd.noticeTime > 0) {
				ns.tprint(('== Backdoors needed on ' + asd.servers.bak).replaceAll(',', ' '));
				asd.noticeTime = Date.now() + mc.NoticeInterval;
			}
		}
		//1.60GB - Analyzes and determines best targets
		if (!scriptRunning(ns, 'masterstrat.js') && nt.canRun('home', 'masterstrat.js', true)) {
			if (nt.homeReserve() > (16 + nt.scriptCost('masterdata.js') + nt.scriptCost('masterstrat.js'))
				&& scriptRunning(ns, 'masterdata.js')) {
				ns.run('masterstrat.js', 1, 'loop');
			}
			else { ns.run('masterstrat.js'); while (scriptRunning(ns, 'masterstrat.js')) { await ns.sleep(100); } }
			await ns.sleep(500);
		}
		//3.95GB - spawns attack scripts
		if (!scriptRunning(ns, 'masterspawn.js') && nt.canRun('home', 'masterspawn.js', true)) {
			ns.run('masterspawn.js'); await ns.sleep(500);
		}
		//5.7GB - buys and upgrades hacknet servers		
		if (!scriptRunning(ns, 'masterhacknet.js') && nt.canRun('home', 'masterhacknet.js', true)) {
			if (nt.availRam('home') > (32 + nt.scriptCost('masterhacknet.js')) && scriptRunning(ns, 'masterspawn.js')) {
				ns.run('masterhacknet.js', 1, 'loop');
			}
			else { ns.run('masterhacknet.js'); await ns.sleep(500); }
			await ns.sleep(500);
		}
		//8.60GB - gathers gang related data to asd.gang
		if (!scriptRunning(ns, '02_gangdata.js') && nt.canRun('home', '02_gangdata.js', true)) {
			if (nt.availRam('home') > (32 + nt.scriptCost('02_gangdata.js')) && scriptRunning(ns, 'masterhacknet.js')) {
				ns.run('02_gangdata.js', 1, 'loop');
			}
			ns.run('02_gangdata.js'); await ns.sleep(500);
		}
		//5.60GB - equips gang members
		if (!scriptRunning(ns, '02_gangequip.js') && nt.canRun('home', '02_gangequip.js', true)) {
			ns.run('02_gangequip.js'); await ns.sleep(500);
		}
		//3.60GB - manages gang member tasks
		if (!scriptRunning(ns, '02_gangtasks.js') && nt.canRun('home', '02_gangtasks.js', true)) {
			ns.run('02_gangtasks.js'); await ns.sleep(500);
		}
		//3.60GB - manages gang warfate
		if (!scriptRunning(ns, '02_gangwarfare.js') && nt.canRun('home', '02_gangwarfare.js', true)) {
			ns.run('02_gangwarfare.js'); await ns.sleep(500);
		}
	}
}
evalhackmodes.js  (2.90)
/** @param {NS} ns **/
// !!! NOT CURRENT !!! - kept for reference

/*----------
All require root access on target;

hack: time depends on hacking and security. requires enough skill. security +0.002 (base)
grow: time depends on hacking and security. No skill req. security +0.004 (base)
weaken: time depends on hacking and security. security -0.05 (base, effected by cores)

== TOOLS ==
W -Sec 1 ns.weakenAnalyze(threads, **cores?) - returns amt weakened by this number of threads
G +Sec 1 ns.growthAnalyzeSecurity(threads)
G ?Thr 1 ns.growthAnalyze(host, growthMultiplier, **cores?) - returns number of threads needed == don't care for 1 core, low threads
H +Sec 1 ns.hackAnalyzeSecurity(threads)
H -$%  1 ns.hackAnalyze(host)
H Chnc 1 ns.hackAnalyzeChance(host) - Chance of success (only matters for valuation)
W Time 0.05 ns.getWeakenTime(host) - Time in ms to complete
G Time 0.05 ns.getGrowTime(host) - Time in ms to complete
H Time 0.05 ns.getHackTime(host) - Time in ms to complete

CORES only affect: Weaken Magnitude (makes weaken more Powerful) and Grow Magnitude (makes Grow more powerful)
They can be safely ignored, at least in the beginning... (they technically just reduce the number of grow/weaken threads needed per hack thread)

core multiplier = 1 + (cores - 1) / 16

----------*/
import * as nt from "notns.js";

const bestThresh = 1.10; //How much swapping targets has to be worth to bother

const MaxAmt = 0.9999; // max amount to steal per hack (decimal%) //lower helps maintain stability
const MaxProcess = 120000; //Maximum allowed concurrent processes
const BN = 1.05; //buffer threads extra grow and weaken threads to help keep stability
const MinbT = 10;//MINIMUM buffer time betwwen calls in milliseconds (time between each hack, grow, weaken, landing) to ensure sequence is kept
// lower buffer = more hack grow pairs = more money (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money

// For all three estimation functions below:
//  tar is the target server's name (ex 'n00dles') as a string
//  hN is the desired number of Hack threads to simulate for
//  tarDat is a server object (ns.getServer()) for the target server, and is optional.
//    If not provided, the idealized values will be used instead (from MasterData)
//  bT is a parameter in case you have other tasks that may require you to temporarily hack at a slower rate
//    The global constant MinbT should be set instead for normal operation
//  cores should be used to increase totRam and calculate actual launched threads at time of launch instead
//    but is provided for here for sutuations where all or most processes get run on home - for instance
function estHGWScore(tar, hN, tardat = {}, bT = MinbT, cores = 1) { //tar = target server: string, hN = number of hack threads to model: integer > 0
	const ret = { score: 0, tar: tar, hN: hN };
	if (tardat == {}) try { tardat = asd.servers.dat[asd.servers.dat.indexof(tar) + 1]; } catch { return ret; }
	if (tardat == {}) { return ret; } //can't get dat, abort

	ret.hA = tardat.hA; //hack Amount PER THREAD
	ret.amt = ret.hA * ret.hN; //amt hacked (as portion of currentMoney) -- if Hacking/Growing properly, then of MaxMoney
	ret.hT = tardat.hT; // time required to finish a minSec Hack
	ret.gT = tardat.gT; // time required to finish a minSec Grow
	ret.wT = tardat.wT; // time required to finish a minSec Weaken
	ret.bT = Math.max(bT, (ret.hT * 8.2 / 3.0 / MaxProcess)); // Buffer Time between attacks
	ret.cL = 3 * ret.bT; // length of a cycle (hgw)
	ret.hP = Math.ceil(ret.hT / ret.cL); //number of Hack processes continuously running
	ret.gP = Math.ceil(ret.gT / ret.cL); //number of Grow processes continuously running
	ret.wP = Math.ceil(ret.wT / ret.cL); //number of Weaken processes continuously running
	ret.totP = ret.hP + ret.gP + ret.wP; //total number of processes to run this profile
	ret.maxSI = 100 - tardat.minDifficulty; // Caps weaken threads (max security is 100, so max security needing weaken is 100-minSec)
	ret.hS = nt.hAnalyzeSecurity(ret.hN); //amount of security generated by each hack
	const postHackSec = Math.min(100, tardat.minDifficulty + ret.hS); //security level after hack hits (max 100)
	ret.gN = Math.max(1, Math.ceil(BN * nt.gAnalyzeLost(tardat, asd.player, ret.amt, postHackSec))); //number of Grow threads needed to offset each hack
	ret.gS = nt.gAnalyzeSecurity(ret.gN); //amount of security generated by the Grow threads
	ret.wA = nt.wAnalyze(1, cores); //amount of security offset by each weaken thread
	ret.wN = Math.max(1, Math.ceil(Math.min(ret.maxSI, (BN * (ret.hS + ret.gS))) / ret.wA)); // number of weaken threads needed to offset each HackGrow pair
	ret.hC = tardat.hC; // chance for a successful hack (at minSec)

	ret.value = ret.amt * tardat.moneyMax * ret.hC / ret.cL; // $ per millisecond
	ret.cost = nt.sFiles[4] * ret.hN * ret.hP + nt.sFiles[6] * ret.gN * ret.gP + nt.sFiles[2] * ret.wN * ret.wP; //cost in GB
	ret.score = ret.value / ret.cost; // $ / ms / GB
	return ret;
}

function estGHWScore(tar, hN, tardat = {}, bT = MinbT, cores = 1) { //tar = target server: string, hN = number of hack threads to model: integer > 0
	const ret = { score: 0, tar: tar, hN: hN };
	if (tardat == {}) try { tardat = asd.servers.dat[asd.servers.dat.indexof(tar) + 1]; } catch { return ret; }
	if (tardat == {}) { return ret; } //can't get dat, abort

	ret.hA = tardat.hA; //hack Amount PER THREAD
	ret.amt = ret.hA * ret.hN; //amt hacked (as portion of currentMoney) -- if Hacking/Growing properly, then of MaxMoney
	ret.hT = tardat.hT; // time required to finish a minSec Hack
	ret.gT = tardat.gT; // time required to finish a minSec Grow
	ret.wT = tardat.wT; // time required to finish a minSec Weaken
	ret.bT = Math.max(bT, (ret.hT * 8.2 / 3.0 / MaxProcess));
	ret.cL = 3 * ret.bT; // length of a cycle (hgw)
	ret.hP = Math.ceil(ret.hT / ret.cL); //number of Hack processes continuously running
	ret.gP = Math.ceil(ret.gT / ret.cL); //number of Grow processes continuously running
	ret.wP = Math.ceil(ret.wT / ret.cL); //number of Weaken processes continuously running
	ret.totP = ret.hP + ret.gP + ret.wP; //total number of processes to run this profile
	ret.maxSI = 100 - tardat.minDifficulty; // Caps weaken threads (max security is 100, so max security needing weaken is 100-minSec)
	ret.hS = nt.hAnalyzeSecurity(ret.hN); //amount of security generated by each hack
	ret.gN = Math.max(1, Math.ceil(BN * nt.gAnalyzeLost(tardat, asd.player, ret.amt))); //number of Grow threads needed to offset each hack
	ret.gS = nt.gAnalyzeSecurity(ret.gN); //amount of security generated by the Grow threads
	ret.wA = nt.wAnalyze(1, cores); //amount of security offset by each weaken thread
	ret.wN = Math.max(1, Math.ceil(Math.min(ret.maxSI, (BN * (ret.hS + ret.gS))) / ret.wA)); // number of weaken threads needed to offset each HackGrow pair
	const postGrowSec = Math.min(100, tardat.minDifficulty + ret.gS); //security level after hack hits
	ret.hC = nt.hAnalyzeChance(tardat, asd.player, postGrowSec); // chance for a successful hack (at minsec+growsec)

	ret.value = ret.amt * tardat.moneyMax * ret.hC / ret.cL; // $ per millisecond
	ret.cost = nt.sFiles[4] * ret.hN * ret.hP + nt.sFiles[6] * ret.gN * ret.gP + nt.sFiles[2] * ret.wN * ret.wP; //cost in GB
	ret.score = ret.value / ret.cost; // $ / ms / GB
	return ret;
}

function estHWGWScore(tar, hN, tardat = {}, bT = MinbT, cores = 1) { //tar = target server: string, hN = number of hack threads to model: integer > 0
	const ret = { score: 0, tar: tar, hN: hN };
	if (tardat == {}) try { tardat = asd.servers.dat[asd.servers.dat.indexof(tar) + 1]; } catch { return ret; }
	if (tardat == {}) { return ret; } //can't get dat, abort

	ret.hA = tardat.hA; //hack Amount PER THREAD
	ret.amt = ret.hA * ret.hN; //amt hacked (as portion of currentMoney) -- if Hacking/Growing properly, then of MaxMoney
	ret.hT = tardat.hT; // time required to finish a minSec Hack
	ret.gT = tardat.gT; // time required to finish a minSec Grow
	ret.wT = tardat.wT; // time required to finish a minSec Weaken
	ret.bT = Math.max(bT, (ret.hT * 3.05 / MaxProcess));  // 3.05 = 12.2 / 4.0
	ret.cL = 4 * ret.bT; // length of a cycle (hgw)
	ret.hP = Math.ceil(ret.hT / ret.cL); //number of Hack processes continuously running
	ret.gP = Math.ceil(ret.gT / ret.cL); //number of Grow processes continuously running
	ret.whP = Math.ceil(ret.wT / ret.cL); //number of WeakenHack processes continuously running
	ret.wgP = Math.ceil(ret.wT / ret.cL); //number of WeakenGrow processes continuously running
	ret.totP = ret.hP + ret.gP + ret.whP + ret.wgP; //total number of processes to run this profile
	ret.maxSI = 100 - tardat.minDifficulty; // Caps weaken threads (max security is 100, so max security needing weaken is 100-minSec)
	ret.hS = Math.min(ret.maxSI, nt.hAnalyzeSecurity(ret.hN)); //amount of security generated by each hack
	ret.gN = Math.max(1, Math.ceil(BN * nt.gAnalyzeLost(tardat, asd.player, ret.amt))); //number of Grow threads needed to offset each hack
	ret.gS = Math.min(ret.maxSI, nt.gAnalyzeSecurity(ret.gN)); //amount of security generated by the Grow threads
	ret.wA = nt.wAnalyze(1, cores); //amount of security offset by each weaken thread
	ret.whN = Math.max(1, Math.ceil(BN * ret.hS / ret.wA)); // number of weaken threads needed to offset each Hack
	ret.wgN = Math.max(1, Math.ceil(BN * ret.gS / ret.wA)); // number of weaken threads needed to offset each Grow
	ret.hC = tardat.hC; // chance for a successful hack (at minSec)

	ret.value = ret.amt * tardat.moneyMax * ret.hC / ret.cL; // $ per millisecond
	ret.cost = nt.sFiles[4] * ret.hN * ret.hP + nt.sFiles[6] * ret.gN * ret.gP + nt.sFiles[2] * (ret.whN * ret.whP + ret.wgN * ret.wgP); //cost in GB
	ret.score = ret.value / ret.cost; // $ / ms / GB
	//	ss.print(ret);
	return ret;
}

async function fixem(ns) {
	//fill small servers with fixem scripts
	var script = nt.sFiles[7]; //fixem
	var smls = []; try { smls = asd.servers.sml; } catch { return; }
	for (const sml of smls) {
		await ns.sleep(0);
		if (nt.canRun(sml, script)) {
			const th = nt.maxThreads(sml, script); //threads to assign to this attack
			//var uid = Math.random();
			ns.exec(script, sml, th);
		}
	}
}
//let ss;
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	if (asd && !Array.isArray(asd.hmTargets)) { asd.hmTargets = []; }
	/*if (asd && !Array.isArray(asd.bests))*/ { asd.bests = []; }
	//ss=ns;
	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMaxMoney');
	ns.disableLog('exec');
	ns.disableLog('getServerMinSecurityLevel');
	ns.clearLog();

	let tars = [];
	let dats = [];
	let bests = [];

	let count = 0;
	while (true) {
		await ns.sleep(1);
		//update data
		tars = []; try { tars = asd.servers.tar; } catch { continue; }
		dats = []; try { dats = asd.servers.dat; } catch { continue; }

		//copy scripts
		ns.exec('sendem.js', 'home');
		await fixem(ns);

		for (const tar of tars) {
			await ns.sleep(1);
			let tardat = {};
			const di = dats.indexOf(tar) + 1;
			if (di > 0) { tardat = dats[di] };

			let ret = { value: 0, score: 0 };

			for (const mode of ['hgw', 'ghw', 'hwgw']) {
				await ns.sleep(0);
				let hN = 1;
				ret = { value: 0, score: 0 };
				do {
					await ns.sleep(0);
					//todo figure out how to do indexOf for a property in an array of objects
					let bi = -1; for (let j = 0; (bi == -1) && (j < bests.length); j++) { if (bests[j].tar == tar && bests[j].mode == mode) { bi = j; } } //index of by object property
					if (bi == -1) { bi = bests.length; bests.push(ret); } // add the new target to the profiles list
					//check for a better target
					if (mode == 'hgw') { ret = estHGWScore(tar, hN, tardat); }
					else if (mode == 'ghw') { ret = estGHWScore(tar, hN, tardat); }
					else if (mode == 'hwgw') { ret = estHWGWScore(tar, hN, tardat); }
					ret.mode = mode;
					//					ns.print(ret.value);
					//					ns.print(bests[bi].value);
					//					await ns.prompt('ready?');
					if (ret.score > 0 && ret.cost <= asd.totRam && (ret.value - bests[bi].value) > 0) {
						bests[bi] = ret;
						if (bests.length > 0) {
							bests.sort((a, b) => (b.value - a.value > 0) ? 1 : (b.value == a.value) ? ((b.cost - a.cost > 0) ? -1 : 1) : -1);
							asd.bests = bests;
							await ns.sleep(0);
						}
					} //new best target
					//					if (ret.amt < 0.01) { hN += hN < 10 ? 1 : hN < 100 ? 10 : Math.ceil(0.001 / tardat.hA); } //step by 0.1%
					//					else { hN += Math.ceil(0.1 / tardat.hA); } //step by 1%
					hN++;
				} while (ret.score > 0 && ret.cost <= asd.totRam && ret.amt <= MaxAmt)
			}
		}
		count++;
	}
	//	ns.print('== MasterStrat complete ==');

}
exploits.js  (1.60)
/** @param {NS} ns **/
export async function main(ns) {
	//ns.exploit();
	//ns.bypass(Math.doc); //Make sure to run 00_doc.js first
	//Number.prototype.toExponential_backup = Number.prototype.toExponential; //back it up
	//Number.prototype.toExponential = function() { return ""; }
	//await ns.sleep(60*60*1000); 
	//Number.prototype.toExponential_backup = Number.prototype.toExponential;
	// ????? - these don't work, probably need to use debugger to accomplish
	//Math.doc.getElementById('unclickable').setFocus;
	//Math.doc.getElementById('unclickable').click();
	//ns.alterReality();
}
fixem.js  (2.00)
/** @param {NS} ns **/

// fixem finds and then weakens or grows suboptimal targets to better prep future hackmaster targets
//   and make a little xp on the side (can also hack these servers if thread count is passed in as an argument and isn't too large)
// parameters: threads, uid - both are optional, but if threads must be passed in to enable hacking
// requres data from masterdata.js

let defT = 'joesguns'; // if nothing else to do, grow joesguns for xp
export async function main(ns) {
	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	const canHack = (ns.args.length > 1 && ns.args[0] < 513 ); //threads parameter passed in and less than +1 sec per hack
	let count = 0;
	while (true) {
		await ns.sleep(5); // longer sleep to prevent this script from taxing the process load
		const asd = Math.asd;
		if (!asd) { continue; } //don't have access to all scripts database, wait and try again...
		count++; // prevent eternal search loop, as count increases a wider net of targets is searched, until eventually a default action is taken
		const tars = (asd.servers) ? (count < 15 ? asd.servers.tar : asd.servers.hal) : []; //prefer useful targets over not yet unlocked ones
		if (tars.length > 0) {
			const tar = (count < 5 && asd.bests && asd.bests.length > 6) // if a bests list exists and has at least 5 targets
				? asd.bests[1+Math.floor(Math.random() * 5)].tar //then pick one of the top 5 runner ups at random (prep potential next targets)
				: tars[Math.floor(Math.random() * tars.length)]; //else pick a random target
			const di = asd.servers ? asd.servers.dat.indexOf(tar) + 1 : 0; //find the "free" server data for our target from our database
			if (di > 0) {
				const dat = asd.servers.dat[di]; //server data (to check for increased security or submax money)
				if (dat.hackDifficulty > dat.minDifficulty) { count = 0; await ns.weaken(tar); } //launch attack, reset count
				else if (dat.moneyAvailable < dat.moneyMax) { count = 0; await ns.grow(tar); } //launch attack, reset count
				else if (canHack && count == 14) { count = 0; await ns.hack(tar); } // no targets to fix? Give us a little tickle...
				else if (count > 19) { await ns.grow(defT); } // default attack after 20 failures to find a target in need of fixin
				//else do nothing, continue on, and wait 5ms then try another target
			}
		}
	}
}
getlit.js  (2.50)
/** @param {NS} ns **/

//copies any .lit or .msg files in the network to your home server

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.clearLog();

	for (const server of asd.servers.non) {
		await ns.sleep(0);
		for (const sls of ns.ls(server,'.msg')) {
			await ns.sleep(0);
			if (!ns.fileExists(sls,'home')) {
				await ns.scp(sls,server,'home');
			}
		}
		for (const sls of ns.ls(server,'.lit')) {
			await ns.sleep(0);
			if (!ns.fileExists(sls,'home')) {
				await ns.scp(sls,server,'home');
			}
		}
	}
}
infiltrate.js  (1.60)
/** @param {NS} ns **/

//NOT YET FUNCTIONAL!
export async function main(ns) {
    const doc = Math.doc;
    //const terminalInput = Math.doc.getElementById("terminal-input");
    let cityButton;
    let targetButton;
    let infiltrateButton;

    for (let button of doc.getElementsByTagName('p')) {
        await ns.sleep(0);
        if (button.innerHTML.includes('City')) {
            cityButton = button; break;
        }
    }
    cityButton.click();
    await ns.sleep(100);

    for (let button of doc.getElementsByTagName('span')) {
        await ns.sleep(0);
        if (button.getAttribute('aria-label')=="Noodle Bar") {
            targetButton = button; break;
        }
    }
    targetButton.click()
    await ns.sleep(100);

    for (let button of doc.getElementsByTagName('button')) {
        await ns.sleep(0);
        if (button.innerHTML.includes('Infiltrate Company')) {
            infiltrateButton = button; break;
        }
    }
    infiltrateButton.click();
    await ns.sleep(100);
}
ka.js  (2.10)
/** @param {NS} ns **/

//kills all scripts not running on the home server
//USES the masterdata.js server database
let asd = {}; //all scripts database
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	for (const server of asd.servers.all) {
		await ns.sleep(0);
		if (server != 'home') { ns.killall(server); }
	}
	ns.tprint('--KillAllAll Complete');
}
karma.js  (1.70)
/** @param {NS} ns **/

//displays (and updates) the extra readout data
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.disableLog('asleep');
	ns.clearLog();

	while (true) {
		await ns.sleep(1);

		let info0 = '';
		try {
			const best = asd.bests[0];

			info0 = ''
				+ '$/s'
				+ '<br />karma'
				+ '<br/>' + best.tar
				+ '<br/> Sec'
				+ '<br/> Money'
				+ '<br/> Ram'
				+ '<br/> RealbT'
				;
			Math.doc.getElementById('overview-extra-hook-0').innerHTML = info0;
		} catch { }
		let info1 = '';
		try {
			const best = asd.bests[0];
			const dat = asd.servers.dat[asd.servers.dat.indexOf(best.tar) + 1];
			const secdiff = dat.hackDifficulty - dat.minDifficulty;
			const moneylvl = dat.moneyAvailable / dat.moneyMax;

			info1 = ''
				+ ns.nFormat(ns.getScriptIncome()[1], '0.00e+0')
				+ '<br />' + ns.nFormat(ns.heart.break(), '+0.0a')
				+ '<br/>' + ns.nFormat(best.amt, '0%') + ' ' + ns.nFormat(best.cL, '0')
				+ '<br/>' + ns.nFormat(dat.minDifficulty, '0') + ' ' + ns.nFormat(secdiff, '+0')
				+ '<br/>' + ns.nFormat(moneylvl, '%')
				+ '<br/>' + ns.nFormat(best.cost / asd.totRam, '0%')
				+ '<br/>' + ns.nFormat(asd.realbT, '0.000');
				;
			Math.doc.getElementById('overview-extra-hook-1').innerHTML = info1;
		} catch { }
	}
}
mastercalibrate.js  (1.60)
/** @param {NS} ns **/
export async function main(ns) {

}
masterconfig.js  (1.60)
/** @param {NS} ns **/
//configuration constants for Drak's Masterhacker serries of scripts
export const HomeReserveMax = 100; //max amt of ram to keep free at home
export const HomeReserveMin = 10; //min amt of ram to keep free at home
export const HomeReservePortion = 0.10; //decimal% of home's ram to reserve, bounded by above
// MasterScripts will generally attempt to reserve a HomeReservePortion of home's ram for processing scripts, bounced by the above

export const SmlRam = 0.10; //portion of home ram below which a server is not used for the main hacking scripts
export const NoticeInterval = 5 * 60 * 1000; //amount of time between notices (currently only backdoor notices)

export const BestThresh = 1.10; //How much better a new target has to be before swapping (to reduce profit loss to overfrequent target swapping)
// ^NOT YET IMPLEMENTED
export const MaxAmt = 0.99; // max amount to steal per hack (decimal%) - can generally leave this alone, can raise to 1.0 if desired for stocks or the like
export const MaxProcess = 8000; //Maximum allowed concurrent processes - raising this is like a game of chicken with a cliff...
// as long as it's low enough, everything's fine... Raise it a little too much though and your game will become unstabe, take longer to recover after autosaves, and just generally make lag spikes worse - MUCH worse
// Try to find a level that doesn't tax your game too much, but also doesn't completely nerf your income.
// Recommended ranges are 4000-10000; but is heavily hardware and environment dependant, so feel free to go outside these ranges as long as things feel comfortable for you
export const BN = 1.10; //buffer threads extra grow and weaken threads to help keep stability
export const MinbT = 6; //MINIMUM bufferTime (time between each attack - like h bT g bT w) in milliseconds;
// lower MinbT means that attacks will try to land closer together, which leaves more room in the cycle for low security launches which keeps the order more stable
// but too low and the engine's randomnesss makes them land out of order - resulting in more aborted hacks and reducing profit
// Raise MinbT (and mincL as appropriate) and or lower MaxProcess if you're getting too many collissions and losing alot of profit to killed hacks
// Recommended range is 6-10, higher is perfectly fine if desired but can reduce profits during later installs, below 6 is pushing the limits of JavaScript itself and mot recommended
export const MincL = 12;//MINIMUM cycle Length (time between the START of complete hgw cycles, or time between hacks) in milliseconds - at least 2x MinbT, make longer for a generally more stable game and rotation
// lower cL = more hacks per second (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money
// try to find the sweat spot for your computer and environment
export const RamUse = 0.90 // Amount of your total ram to allow profiles to build from, actual usage will vary
// don't just set this to 100%, as processes launched during high sec stick around a little longer;
// so using all your memory can make it impossible to launch new attacks on time which can be more disruptive than just not launching them in the first place
export const AdaptSpeed = 0.0001; //How quickly the "realbT" adjusts to current lag spikes. Accceptable range is (0-1].
// Has no impact on actual rotation or attacks, just the callibration tracker display.
// Set higher to make the realbT "average" across less attacks and get a more "instantaneous" look at the current attack launch timers,
// set lower to get a longer "rolling average" and smooth out the peaks and valleys.
// GENERALLY the occassional lag spike has very little lasting impact on the rotation, and so instant isn't all that useful to track
// but set this too low and it becomes impossible to see spikes at all, and you might not set MinbT high enough
export const MaxTargets = 1; //Maximum number of servers to atatck - currently only works for one, do not change
// ^ NOT YET IMPLEMENTED

//==========
//== Gang ==
//==========
export const PreferedGangFaction = 'Slum Snakes'; 

/*
// vestigial main
export async function main(ns) {

}
*/
masterdata.js  (4.40)
/** @param {NS} ns **/
/*=====
Updates server and player data to the all scripts database
Should be run periorically to keep data up to date
accepts a 'loop' argument to go into continuous running mode
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
import * as mc from "masterconfig.js";

function serverGone(ns, server) { //version of server exists that also updates the lists, used like... if(serverGone(server)) {//abort...};
	if (ns.serverExists(server)) { return false; } //if it exists, return false (not gone)

	const lists = [asd.servers.dat, asd.servers.all, asd.servers.pur, asd.servers.non,
	asd.servers.res, asd.servers.sml, asd.servers.hal, asd.servers.bak, asd.servers.tar];
	//update asd.servers if found in one of the lists
	for (var l = 0; l < lists.length; l++) {
		ns.asleep(0);
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
		ns.asleep(0);
		servers.push.apply(servers, (ns.scan(server).slice(server == 'home' ? 0 : 1))); //add the server's forward only children; home has no parent to skip
	}
	asd.servers.all = servers;
}

function buildOthers(ns) {
	if (!count % 1000) { ns.print('--rebuilding OTHERS... (x1000)'); }
	const servers = asd.servers.all;
	let player = ns.getPlayer();
	let smallRam = 0;
	let totRam = 0;

	const dat = []; const pur = []; const non = [];
	const hal = []; const rsd = []; const sml = [];
	const bak = []; const tar = []; const was = [];
	const hacklvl = player.hacking;
	for (const server of servers) {
		ns.asleep(0);
		if (!serverGone(ns, server)) {
			const sdat = ns.getServer(server);
//			sdat.LS = ns.ls(server);
//			sdat.PS = ns.ps(server);
			//ToDo: add all process data?
			sdat.freeRam = Math.max(0, sdat.maxRam - sdat.ramUsed
				- ((server == 'home') ? nt.homeReserve() : 0));

			if (server == 'home') {
				smallRam = mc.SmlRam * sdat.maxRam;
				asd.homeCoreMult = nt.coreMult(sdat.cpuCores);
				sdat.coreMult = asd.homeCoreMult;
				sdat.parent = null;
				totRam += Math.max(0, (sdat.maxRam - nt.homeReserve()) * asd.homeCoreMult);
			}
			else {
				sdat.coreMult = nt.coreMult(sdat.cpuCores);
				totRam += sdat.maxRam;
				sdat.parent = ns.scan(server)[0];
				if (sdat.hasAdminRights && sdat.maxRam >= 1.60) {
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
		ns.asleep(0);
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

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database
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
		await ns.sleep(1);
		asd.player = ns.getPlayer(); //update player data continuously
		if (!(count % 1000)) { buildAll(ns); } //rebuild all servers list every second or so
		buildOthers(ns); // rebuild all server data and lists continuously
		if (!(count % 1000)) { count = 0; } //prevent count from becoming a large int or some other js malarky
		count++;
	} while (loop);
	ns.print('== datamaster complete ==');
}
masterfixem.js  (2.90)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

//spawns fixem scripts on all the small servers
// (and one manual hack script if we have Singularity access (BN 4))
//USES the masterdata.js servers database

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd

	//fill small servers with fixem scripts
	const smls = asd.servers ? asd.servers.sml : [];

	let script = '04_manualhack.js'; //manual hack everywhere!
	if (nt.hasSource(4)) {
		for (const sml of smls) {
			await ns.sleep(1);
			if (nt.canRun(sml, script)) { ns.exec(script, sml, 1); }
		}
	}

	script = 'fixem.js';
	for (const sml of smls) {
		await ns.sleep(1);
		const th = nt.maxThreads(sml, script);
		if (th > 0) { ns.exec(script, sml, th, th, Math.random()); }
	}
}
masterhacknet.js  (5.70)
/** @param {NS} ns **/
export async function main(ns) {
	const Invest = 0.01; //decimal percentage of money to invest in hacknet
	ns.disableLog("disableLog");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	let loop = false;
	if (ns.args.includes('loop')) { loop = true; }

	do {
		//purchase new nodes
		while (ns.hacknet.getPurchaseNodeCost() < (Invest * ns.getServerMoneyAvailable("home"))) {
			await ns.sleep(0);
			const res = ns.hacknet.purchaseNode();
			ns.tprint("Purchased hacknet Node " + res);
		}

		//upgrade existing nodes
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			await ns.sleep(0);
			while (ns.hacknet.getLevelUpgradeCost(i, 10) < (Invest * ns.getServerMoneyAvailable("home"))) {
				await ns.sleep(0);
				ns.hacknet.upgradeLevel(i, 10);
			}
			while (ns.hacknet.getRamUpgradeCost(i, 2) < (Invest * ns.getServerMoneyAvailable("home"))) {
				await ns.sleep(0);
				ns.hacknet.upgradeRam(i, 2);
			}
			while (ns.hacknet.getCoreUpgradeCost(i, 1) < (Invest * ns.getServerMoneyAvailable("home"))) {
				await ns.sleep(0);
				ns.hacknet.upgradeCore(i, 1);
			}
		}

		//allow money to build a bit
		if (loop) { await ns.sleep(5000); }
	} while (loop);
	ns.print('== Master Hacknet Complete ==');
}
masternuke.js  (4.00)
/** @param {NS} ns **/
import * as nt from "notns.js";

// opens ports and nukes
// run periodically to gain access to new servers as you acquire new programs
// USES te masterdata.js servers database

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	ns.disableLog('disableLog');
	ns.disableLog('sleep');

	ns.print("--Open Ports & Nuke 'em");
	const servers = asd.servers?asd.servers.non??[]:[];
	for (const server of servers) {
		await ns.sleep(1);
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
masterpserv.js  (8.10)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

const maxRam = 20;

function realRam(ramPow) { return Math.pow(2, ramPow); }
function myMoney(ns) { return ns.getServerMoneyAvailable('home'); }
function canBuy(ns, ramPow) { return myMoney(ns) - ns.getPurchasedServerCost(realRam(ramPow)) > 0; }

export async function main(ns) {
	let asd = Math.asd;
	if (!asd) { return; }
	if (!asd.deadserver) { asd.deadserver = ' '; }

	ns.disableLog("disableLog");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");
	ns.disableLog("getServerMaxRam");

	asd.ram = asd.ram ?? 4;
	let ram = asd.ram;

	//determine ram amount (highest power of 2 that can be purchased)
	while (maxRam - ram >= 0 && canBuy(ns, ram + 1)) { await ns.sleep(1); ++ram; }
	if (ram - maxRam > 0) { ram = maxRam; }
	asd.ram = ram;

	// buy a new server or upgrade weakest server
	if (canBuy(ns, ram)) {
		const serverlist = asd.servers ? asd.servers.pur : [];
		if (serverlist.length < ns.getPurchasedServerLimit()) {
			//server space available, just buy it
			const pServ = ns.purchaseServer("pserv", realRam(ram))
			if (pServ != '') {
				ns.tprint('purchased ' + pServ
					+ ' @ ' + ns.nFormat(realRam(ram), '0.0a')
					+ ' for ' + ns.nFormat(ns.getPurchasedServerCost(realRam(ram)), '$0.00a'));
			}
		}
		else {
			//need to remove lowest ram server
			let minRam = realRam(maxRam);
			let minServer = '';
			for (let i = 0; i < serverlist.length; i++) {
				await ns.sleep(1);
				const iServer = serverlist[i];
				const iRam = ns.getServerMaxRam(iServer);
				if (iRam - minRam < 0) {
					minRam = iRam;
					minServer = iServer;
				}
			}
			if (minRam - realRam(ram) < 0) {
				//remove smallest server and buy a new one if not already max
				asd.deadserver = minServer; //flag as not a resource server and wait for all processess to die...
				if (ns.scriptRunning('fixem.js', minServer)) { ns.killall(minServer); }
				while (ns.getServerUsedRam(minServer) > 0) { await ns.sleep(100); } //wait for any running scripts to finish
				ns.deleteServer(minServer);
				ns.tprint('deleted ' + minServer + ' @ ' + ns.nFormat(minRam, '0.0a'));
				await ns.sleep(1000);
				const pServ = ns.purchaseServer("pserv", realRam(ram))
				if (pServ != '') {
					ns.tprint('purchased ' + pServ
						+ ' @ ' + ns.nFormat(realRam(ram), '0.0a')
						+ ' for ' + ns.nFormat(ns.getPurchasedServerCost(realRam(ram)), '$0.00a'));
				}
				asd.deadserver = ' '; //remove deadserver flag
			}
		}
	}
}
masterscripts.js  (1.90)
/** @param {NS} ns **/

/*==================
// masterscripts builds a list of scripts found on the home server, and records their sizes for future reference to asd.hScripts
//scripts is a paired array (defaultsize, scriptname, size, scirptname, size, etc...)
// as such, iterating over the array should be done with: for (let i=1, i<asd.hScripts.length; i+=2) {}
//  with asd.hScripts[i] being the name of a script and asd.hScripts[i+1] being its size
// also, asd.hScripts.indexOf(scriptName)+1 should be used to get the size of any given script
// 
==================*/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	const scripts = [2.0]; // defaults to 2.0GB if script not found, may want to revise this...
	for (const script of ns.ls("home",".js")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	for (const script of ns.ls("home",".ns")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	for (const script of ns.ls("home",".script")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	asd.hScripts = scripts;
}
masterspawn.js  (3.65)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";


function freeRam(ns, server) { //uses getServerRam to ensure up to date values to avoid trying to generate threads w/o enough RAM
	try {
		return nt.maxRam(server) - ns.getServerUsedRam(server) - Math.max(0, ((server == 'home') ? nt.homeReserve() : 0));
	} catch { }
	return 0;
}

function launchAttack(ns, type, tar, threads = 1) {
	const start = Date.now();
	const script = (type == 'h') ? '_hack.js' : (type == 'g') ? '_grow.js' : '_weak.js'; //default to w
	const size = nt.scriptCost(script);
	for (let i = ((type == 'g') ? 0 : 1); i < ress.length && threads > 0; i++) { //sart at home for grows; largest non-home server for others.
		const res = ress[i];
		const maxth = Math.max(0, Math.floor(freeRam(ns, res) / size))
		if (maxth >= 1) {
			//adjust threads needed if server has more cores
			const coreMult = ((res == 'home') && (type == 'w' || type == 'g')) ? asd.homeCoreMult : 1.0;
			const th = Math.min(Math.max(1, Math.ceil(threads / coreMult)), maxth); //threads to assign to this attack
			const tixBool = (type == 'h' && asd.tixShort) || (type == 'g' && asd.tixLong); //manipulating the market?
			const pid = ns.exec(script, res, th, tar, Math.random(), th, tixBool);
			if (pid > 0) {
				threads -= Math.floor(th * coreMult);
				if (type == 'h') { hpids.push(pid); }
			}
		}
	}
	updatebT(start);
}

function updatebT(start) {
	realbT += Math.min(mc.AdaptSpeed*realbT, Math.max(-mc.AdaptSpeed*realbT, ((Date.now() - start) - realbT) * mc.AdaptSpeed)); //update the rolling average
	asd.realbT = realbT; //Math.max(mc.MinbT, Math.ceil(realbT)); //update the strat target
}
/*
function thiscL(ns, pid, cL) { //retuns true if pid will complete within one CycleLength
	const rs = ns.getRunningScript(pid);
	if (!rs) { return true; } //pid is dead, it has (presumably) already conpleted
	let string = '';
	for (const log of rs.logs) {
		if (log.includes('Executing')) {
			string = log.substring(log.indexOf(' in ') + 4, log.indexOf('(t=') - 1);
			break;
		}
	}
	if (string == '') { return false; } //no executing log, so script hasn't yet executed its payload for some reason (presumably), so can't determine completion time - let it stay
	const ms = nt.toms(string); //change minutes, seconds, etc. to ms
	//ns.print(rs.onlineRunningTime*1000);
	return ((ms - rs.onlineRunningTime * 1000 - cL) < 0); //time remaining is less than 1 cycle length
}
*/
let ress = [];
let hpids = [];
//let gpids = [];
//let hgw = false;
let realbT = mc.MinbT;

let ss;
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	asd.tixShort = asd.tixShort ?? false;
	asd.tixLong = asd.tixLong ?? false;
	asd.realbT = asd.realbT??(2 * mc.MinbT);
	realbT = asd.realbT;

	ss=ns;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMoneyAvailable');
	//ns.disableLog('exec');
	//ns.disableLog('kill');
	ns.disableLog('getServerSecurityLevel');
	ns.clearLog();

	while (true) {
		await ns.sleep(0);

		let totCost = 0; //add to this each time an active profile is added; up to totRam
		let totProc = 0; //add to this each time an active profile is added; up to MaxProcess
		for (let i = 0; i < asd.bests.length && i < mc.MaxTargets && totCost < asd.totRam && totProc < mc.MaxProcess; i++) { //ToDo: add totProc check
			await ns.sleep(1);

			try { ress = asd.servers.res; } catch { }

			totCost += asd.bests[i].cost;
			const tar = asd.bests[i].tar;

			const dat = asd.servers.dat[asd.servers.dat.indexOf(tar) + 1];
			const hT = dat.hT; // length of a hack
			const gT = dat.gT; // length of a grow
			const wT = dat.wT; // length of a weaken

			let wL = Date.now() + 10; // weaken launch time
			//let gL = wL - 5; //grow launch time
			//let hL = gL - 5; //hack launch time
			let gL = wL + wT - gT + 5 * asd.bests[i].cL - realbT; //grow launch time
			let hL = gL + gT - hT + 5 * asd.bests[i].cL - realbT; //hack launch time
			let tL = Date.now(); //test collision launch time

			let curTar = asd.bests[i].tar;
			//			hgw = false;
			//			let start = Date.now();

			while (asd.bests[i].tar == curTar) { //will need to be removed if multiple targets are to be enabld
				if (asd.calibrate) {
					ns.disableLog('exec');
					ns.disableLog('kill');
					ns.print(realbT);
				}
				else {
					ns.enableLog('exec');
					ns.enableLog('kill');
				}
				await ns.sleep(0);

				//				if (!hgw) { start = Date.now(); }
				const best = asd.bests[i];
				const hgSec = (best.hS + best.gS) * 1.1;
				const secTol = dat.minDifficulty + Math.max(1, hgSec); //don't allow sec to rise by more than 1
				const monTol = (1.0 - best.amt) * 0.90 * dat.moneyMax; //don't allow more than 1 hack to hit

				const cL = best.cL;

				//clean up old hPids
				//if the queue's length has gone past the number of expected hacks, plus a buffer, remove the oldest extra hpids (should be mostly dead hpids)
				const hpidTrim = Math.max(0, Math.floor(hpids.length - best.hP - 30));
				if (hpidTrim) { //truthy hack for speed - the above math means that hpidTrim is either 0(false), or positive (true)
					hpids.splice(0,  hpidTrim); //keep the hack pid queue a little tidy
				}
				//collision detection (and prevention?)
				if (Date.now() > tL && (((ns.getServerSecurityLevel(tar) - secTol) > 0) || ((ns.getServerMoneyAvailable(tar) - monTol) < 0))) {
					tL = Date.now() + cL; //don't remove more hacks until at least 1 grow/weaken pair has had a chance to fix things
/*					//killing hacks set to land in the next cycle length - runningScript.onlineRunningTime seems too unreluable
					for (let i = 0; i < hpids.length && i<15; i++) { //kill all hacks due to execute this cycle
						await ns.sleep(0);
						if (thiscL(ns, hpids[i], cL)) { ns.kill(hpids.splice(i,1)[0]); --i;} //if set to complete within a cycle, kill and remove from queue
					}
*/
					//blind killing method (faster, but less accurate)
					let hpidsIndex = 0; //start at the beginning of the queue and go until you kill 5 hacks (or reach the end)
					for (let hackKills = 0; hackKills < 5 && hpidsIndex < hpids.length; hpidsIndex++) { //try for 5 successful kills
						await ns.sleep(0);
						if (ns.kill(hpids[hpidsIndex])) { ++hackKills; } //count successful kills
					}
					hpids.splice(0, hpidsIndex); //remove the dead hacks

				}

				try { ress = asd.servers.res; } catch { continue; }
				if (Date.now() > wL) {
					launchAttack(ns, 'w', tar, best.wN);
					wL = Date.now() + cL;
				}
				if (Date.now() > gL) {
					launchAttack(ns, 'g', tar, best.gN);
					gL = Date.now() + cL;
				}
				if (Date.now() > hL) {
					launchAttack(ns, 'h', tar, best.hN);
					hL = Date.now() + cL;
				}
				//				ns.print(hgw);
				//				if (hgw) {
				//					realcL += Math.min(0.0001*realcL, Math.max(-0.0001*realcL, (5 * (Date.now() - start) - realcL) * 0.0001*realcL)); //update the rolling average
				//					asd.realcL = Math.max(mc.MincL, Math.ceil(realcL)); //update the strat target
				//					hgw = false;
				//				}
			}
		}
	}
}
masterspawnbak.js  (3.95)
/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";


function freeRam(ns, server) { //uses getServerRam to ensure up to date values to avoid trying to generate threads w/o enough RAM
	try {
		return nt.maxRam(server) - ns.getServerUsedRam(server) - Math.max(0, ((server == 'home') ? nt.homeReserve() : 0));
	}
	catch { }
	return 0;
}

function launchAttack(ns, type, tar, threads = 1) {
	const script = (type == 'h') ? '_hack.js' : (type == 'g') ? '_grow.js' : '_weak.js'; //default to w
	const size = nt.scriptCost(script);
	for (let i = ((type == 'g') ? 0 : 1); i < ress.length && threads > 0; i++) { //sart at home for grows; largest non-home server for others.
		const res = ress[i];
		const maxth = Math.max(0, Math.floor(freeRam(ns, res) / size))
		if (maxth >= 1) {
			//adjust threads needed if server has more cores
			const coreMult = ((res == 'home') && (type == 'w' || type == 'g')) ? asd.homeCoreMult : 1.0;
			const th = Math.min(Math.max(1, Math.ceil(threads / coreMult)), maxth); //threads to assign to this attack
			const tixBool = (type == 'h' && asd.tixShort) || (type == 'g' && asd.tixLong); //manipulating the market?
			const pid = ns.exec(script, res, th, tar, Math.random(), th, tixBool);
			if (pid > 0) {
				threads -= Math.floor(th * coreMult);
				if (type == 'h') { hpids.push(pid); }
			}
		}
	}
}

function pastcL (pid, cL) { //retuns true if pid completes within the CycleLength
	const rs = ns.getRunningScript(pid);
	if (!rs) {return false;}
	let string = '';
	for (const log of rs.logs) {
		if (log.includes('Executing on')) {
			string = log.substring(log.indexOf(' in ')+4,log.indexOf('(t=')-1);
			break;
		}
	}
	return (nt.toms(string) - rs.onlineRunningTime*1000 - cL > 0);
}

let ress = [];
let hpids = [];
let gpids = [];

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	asd.tixShort = asd.tixShort ?? false;
	asd.tixLong = asd.tixLong ?? false;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMoneyAvailable');
	//	ns.disableLog('exec');
	ns.disableLog('getServerSecurityLevel');
	ns.clearLog();

	while (true) {
		await ns.sleep(0);

		let totCost = 0; //add to this each time an active profile is added; up to totRam
		//		let totProc = 0; //add to this each time an active profile is added; up to MaxProcess
		for (let i = 0; i < asd.bests.length && i < mc.MaxTargets && totCost < asd.totRam; i++) { //ToDo: add totProc check
			await ns.sleep(1);

			try { ress = asd.servers.res; } catch { }

			totCost += asd.bests[i].cost;
			const tar = asd.bests[i].tar;

			const dat = asd.servers.dat[asd.servers.dat.indexOf(tar) + 1];
			const hT = dat.hT; // length of a hack
			const gT = dat.gT; // length of a grow
			const wT = dat.wT; // length of a weaken

			let wL = Date.now() + 100; // weaken launch time
			let gL = wL - 5; //grow launch time
			let hL = gL - 5; //hack launch time
//			let gL = wL + wT - gT + 5 * asd.bests[i].cL - 5; //grow launch time
//			let hL = gL + gT - hT + 5 * asd.bests[i].cL - 5; //hack launch time
//			let tL = Date.now(); //test server launch time

			let curTar = asd.bests[i].tar;
			while (asd.bests[i].tar == curTar) { //will need to be removed if multiple targets are to be enabld
				await ns.sleep(0);

				const hgSec = asd.bests[i].hS + asd.bests[i].gS
				const secTol = dat.minDifficulty + Math.max(1, hgSec); //don't allow sec to rise by more than 1
				const monTol = (1.0 - asd.bests[i].amt) * 0.90 * dat.moneyMax; //don't allow more than 1 hack to hit

				const cL = asd.bests[i].cL;

				//ToDo - make the queue less ineffecient
				//clean up old hPids
				if (hpids.length - asd.bests[i].hP > 0) {
					hpids.slice(0, Math.max(0, hpids.length - asd.bests[i].hP));
				}
				//collission detection (and prevention?)
				if ((((ns.getServerSecurityLevel(tar) - secTol) > 0) || ((ns.getServerMoneyAvailable(tar) - monTol) < 0))) {
					let pid = hpids.shift()
					while (hpids.length > 0 && !pastcL(pid)) { ns.kill(pid); await ns.sleep(0) } // kill until a hack is actually killed (or no hacks remain)
				}

				try { ress = asd.servers.res; } catch { continue; }
				if (Date.now() > hL) {
					launchAttack(ns, 'h', tar, asd.bests[i].hN);
					hL = Date.now() + cL;
				}
				if (Date.now() > gL) {
					launchAttack(ns, 'g', tar, asd.bests[i].gN);
					gL = Date.now() + cL;
				}
				if (Date.now() > wL) {
					launchAttack(ns, 'w', tar, asd.bests[i].wN);
					wL = Date.now() + cL;
				}
			}
		}
	}
}
masterstrat.js  (1.60)
/** @param {NS} ns **/

/*----------
All require root access on target;

hack: time depends on hacking and security. requires enough skill. security +0.002 (base)
grow: time depends on hacking and security. No skill req. security +0.004 (base)
weaken: time depends on hacking and security. security -0.05 (base, effected by cores)

== TOOLS ==
W -Sec 1 ns.weakenAnalyze(threads, **cores?) - returns amt weakened by this number of threads
G +Sec 1 ns.growthAnalyzeSecurity(threads)
G ?Thr 1 ns.growthAnalyze(host, growthMultiplier, **cores?) - returns number of threads needed == don't care for 1 core, low threads
H +Sec 1 ns.hackAnalyzeSecurity(threads)
H -$%  1 ns.hackAnalyze(host)
H Chnc 1 ns.hackAnalyzeChance(host) - Chance of success (only matters for valuation)
W Time 0.05 ns.getWeakenTime(host) - Time in ms to complete
G Time 0.05 ns.getGrowTime(host) - Time in ms to complete
H Time 0.05 ns.getHackTime(host) - Time in ms to complete

CORES only affect: Weaken Magnitude (makes weaken more Powerful) and Grow Magnitude (makes Grow more powerful)
They can be safely ignored, at least in the beginning... (they technically just reduce the number of grow/weaken threads needed per hack thread)

core multiplier = 1 + (cores - 1) / 16

----------*/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";

//  tar is the target server's name (ex 'n00dles') as a string
//  hN is the desired number of Hack threads to simulate for
//  tarDat is a server object (ns.getServer()) for the target server, and is optional.
//    If not provided, the idealized values will be used instead (from MasterData)
//  cL is used to adjust strategies for high process count lag, and sub 1 hack thread, processes
//  cores should be used to increase totRam and calculate actual launched threads at time of launch instead
//    but is provided for here for situations where all or most processes get run on home - for instance
function estBestScore(tar, hN, tardat = null, cL = mc.MincL, cores = 1) { //tar = target server: string, hN = number of hack threads to model: integer > 0
	const ret = { tar: tar, value: 0, score: 0, cost: 0, hN: hN, cL: cL };
	if (!tardat) try { tardat = nt.gServer(tar); } catch { return ret; }
	if (!tardat) { return ret; } //can't get dat, abort

	//determine hack amt, chamce, and thread count numbers for hack, etc. (hN, gN, wN)
	ret.hA = tardat.hA; //hack Amount PER THREAD
	ret.amt = ret.hA * ret.hN; //amt hacked (as portion of currentMoney) -- if Hacking/Growing properly, then of MaxMoney
	ret.hS = nt.hAnalyzeSecurity(ret.hN); //amount of security generated by each hack
	const postHackSec = Math.min(100, tardat.minDifficulty + ret.hS); //security level after hack hits (max 100)
	ret.gN = Math.max(1, Math.ceil(mc.BN * nt.gAnalyzeLost(tardat, asd.player, ret.amt, postHackSec))); //number of Grow threads needed to offset each hack
	ret.gS = nt.gAnalyzeSecurity(ret.gN); //amount of security generated by the Grow threads
	const postGrowSec = Math.min(100, tardat.minDifficulty + ret.gS); //security level after hack hits
	ret.hC = 0.5 * (nt.hAnalyzeChance(tardat, asd.player) + nt.hAnalyzeChance(tardat, asd.player, postGrowSec));  // chance for a successful hack (at avg of minSec and minSec+growSec) - basically, assume hack lands first about half the time
	ret.maxSI = 100 - tardat.minDifficulty; // Caps weaken threads (max security is 100, so max security needing weaken is 100-minSec)
	ret.wA = nt.wAnalyze(1, cores); //amount of security offset by each weaken thread
	ret.wN = Math.max(1, Math.ceil(Math.min(ret.maxSI, (2 * mc.BN * (ret.hS + ret.gS))) / ret.wA)); // number of weaken threads needed to offset each HackGrow pair

	//determine process counts
	ret.hT = tardat.hT; // time required to finish a minSec Hack
	ret.gT = tardat.gT; // time required to finish a minSec Grow
	ret.wT = tardat.wT; // time required to finish a minSec Weaken
//	ret.bT = Math.ceil(Math.max(cL, (ret.hT * 8.2 / 3.0 / mc.MaxProcess))); // Buffer Time between attacks
	ret.cL = Math.ceil(Math.max(cL, (ret.hT * 8.2 / mc.MaxProcess)));//cL; // length of a cycle (hgw)
	ret.hP = Math.ceil(ret.hT / ret.cL); //number of Hack processes continuously running
	ret.gP = Math.ceil(ret.gT / ret.cL); //number of Grow processes continuously running
	ret.wP = Math.ceil(ret.wT / ret.cL); //number of Weaken processes continuously running
	ret.totP = ret.hP + ret.gP + ret.wP; //total number of processes needed to run this profile

	//put it all together
	ret.cost = nt.scriptCost('_hack.js') * ret.hN * ret.hP + nt.scriptCost('_grow.js') * ret.gN * ret.gP + nt.scriptCost('_weak.js') * ret.wN * ret.wP; //cost in GB
	ret.value = ret.amt * tardat.moneyMax * ret.hC / ret.cL; // $ per millisecond
	ret.score = ret.value / ret.cost; // $ / ms / GB
	return ret;
}


let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	if (ns.args.includes('clear') || !Array.isArray(asd.bests)) { asd.bests = []; }
//	asd.realcL = asd.realcL??mc.MincL;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMaxMoney');
	ns.disableLog('exec');
	ns.disableLog('getServerMinSecurityLevel');
	ns.clearLog();

	let loop = false;
	if (ns.args.includes('loop')) { loop = true; }

	let count = 0;
	do {
		await ns.sleep(50);
		//update data
		let tars = []; try { tars = asd.servers.tar; } catch { continue; }
		let dats = []; try { dats = asd.servers.dat; } catch { continue; }
		let bests = []; try { bests = asd.bests; } catch { continue; }

		for (const tar of tars) {
			await ns.sleep(1);
			let tardat = {};
			const di = dats.indexOf(tar) + 1;
			if (di > 0) { tardat = dats[di]; }
			else { continue; }

			let hN = 1;
			let ret = { tar: tar, value: 0, score: 0, cost: 0, hN: 1, cL: mc.MincL };

			const maxCost = mc.RamUse * asd.totRam;
			let bi = bests.findIndex(a => a.tar == tar);
			if (bi == -1) { bi = bests.length; bests.push(ret); } // add the new target to the profiles list
			else if (
				(maxCost - bests[bi].cost < 0) //overRam, remove profile
				|| (mc.MaxAmt - bests[bi].amt < 0) //over hack amt limit, remove profile
//				|| (bests[bi].cL -1.1*asd.realcL > 0) //to far above realcL, remove profile
//				|| (bests[bi].cL -0.9*asd.realcL < 0) //to far below realcL, remove profile
				) { bests[bi] = ret; } //check that profile is still valid
			do {
				await ns.sleep(0);

				//check for a better target
				ret = estBestScore(tar, hN, tardat);
				while (hN == 1 && (ret.cost / maxCost > 1.0)) { //hN 1 profile to expensive, lengrhen cL to reduce cost
					await ns.sleep(0);
					ret = estBestScore(tar, hN, tardat, Math.ceil(ret.cL * ret.cost / maxCost));
				}
				if (ret.score > 0 && maxCost - ret.cost > 0 && (hN == 1 || mc.MaxAmt - ret.amt > 0) && ret.value - bests[bi].value > 0) { //new best target
					bests[bi] = ret;
				}
				if (count % 10 == 9) { hN++; } else { //high detail pass every 10th
					if (ret.amt < 0.01) { hN += hN < 10 ? 1 : hN < 100 ? 10 : Math.ceil(0.0001 / tardat.hA); } //step by 0.01%
					else { hN += Math.ceil(0.02 / tardat.hA); } //step by 0.2%
				}
			} while ((ret.score > 0) && (maxCost - ret.cost > 0) && (mc.MaxAmt - ret.amt > 0))
			//updated best profile for server, re-sort and update global to new order (and profile)
		}
		bests.sort((a, b) => (b.value - a.value > 0) ? 1 : (b.value == a.value) ? ((b.cost - a.cost > 0) ? -1 : 1) : -1);
		asd.bests = bests;
		count++;
	} while (loop);
	ns.print('== MasterStrat complete ==');
}
notns.js  (1.60)
/** @param {NS} ns **/
import * as mc from "masterconfig.js";

// misc helper functions
export function connectPath(tar) { // returns an array of server names starting at home and tracing to the target server (inc)
	const path = [tar];
	let parent = gServer(tar) ? gServer(tar).parent : null;
	let count = 15;
	while (parent && count > 0) {
		count--;
		path.unshift(parent);
		parent = gServer(parent) ? gServer(parent).parent : null;
	}
	return path;
}
export function scriptCost(script) { return Math.asd.hScripts[Math.asd.hScripts.indexOf(script) + 1]; }
export function canRun(server, script, ignoreHomeReserve = false) {
	return availRam(server) + ((ignoreHomeReserve && server == 'home') ? homeReserve() : 0) - scriptCost(script) >= 0;
}
export function gServer(server) { //returns the asd.dat for specified server - remember not necessarily realtime, best used for static data like minSec, moneyMax, etc.
	try {
		const di = Math.asd.servers.dat.indexOf(server) + 1;
		if (di > 0) { return Math.asd.servers.dat[di]; }
	} catch { }
	return null;
}
export function maxThreads(server, script) { return Math.floor(availRam(server) / scriptCost(script)); }
export function maxRam(server) { return gServer(server).maxRam ?? 0; }
export function availRam(server) { return gServer(server).freeRam ?? 0; } //NOT REALTIME
export function homeReserve() { //amt of ram to keep free at home
	try { return Math.min(mc.HomeReserveMax, Math.max(mc.HomeReserveMin, mc.HomeReservePortion * maxRam('home'))); }
	catch { }
	return 10;
}
export function eatRam(server, cost) { try { gServer(server).freeRam -= cost; } catch { } } //to free up ram, eat a negative amount
export function updateRam(server, amt) { try { gServer(server).freeRam = amt; } catch { } }

export const durationms = ['days', 24 * 60 * 60 * 1000, 'hours', 60 * 60 * 1000, 'minutes', 60 * 1000, 'seconds', 1000];
export function toms(string) { // parses a string like "1 hours 57 minutes 2.487 seconds" into ms
	const times = string.trim().split(' ');
	let ms = 0;
	for (let i = 1; i < times.length; i += 2) {
		ms += durationms[durationms.indexOf(times[i]) + 1] * Number(times[i - 1]);
	}
	ms = parseInt(ms);
	return (ms == NaN) ? 0 : ms;
}

// =============================================
// === 02 SOME better/no cost Gang functions ===
// =============================================

export const GangFactions = ['Slum Snakes', 'Tetrads', 'The Syndicate', 'The Dark Army', 'Speakers for the Dead', 'NiteSec', 'The Black Hand'];
export const GangCFactions = ['Slum Snakes', 'Tetrads', 'The Syndicate', 'The Dark Army', 'Speakers for the Dead'];
export const GangHFactions = ["NiteSec", "The Black Hand"];
export const GangTasks = ["Unassigned", "Mug People", "Deal Drugs", "Strongarm Civilians", "Run a Con", "Armed Robbery", "Traffick Illegal Arms", "Threaten & Blackmail", "Human Trafficking", "Terrorism", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"];
export const GangCTasks = ["Unassigned", "Mug People", "Deal Drugs", "Strongarm Civilians", "Run a Con", "Armed Robbery", "Traffick Illegal Arms", "Threaten & Blackmail", "Human Trafficking", "Terrorism", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"];
export const GangHTasks = ["Unassigned", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"];
export const GangTaskInfo = [{ "name": "Unassigned", "desc": "This gang member is currently idle", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Mug People", "desc": "Assign this gang member to mug random people on the streets<br><br>Earns money - Slightly increases respect - Very slightly increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00005, "baseWanted": 0.00005, "baseMoney": 3.6, "hackWeight": 0, "strWeight": 25, "defWeight": 25, "dexWeight": 25, "agiWeight": 10, "chaWeight": 15, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Deal Drugs", "desc": "Assign this gang member to sell drugs<br><br>Earns money - Slightly increases respect - Slightly increases wanted level - Scales slightly with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.00006, "baseWanted": 0.002, "baseMoney": 15, "hackWeight": 0, "strWeight": 0, "defWeight": 0, "dexWeight": 20, "agiWeight": 20, "chaWeight": 60, "difficulty": 3.5, "territory": { "money": 1.2, "respect": 1, "wanted": 1.15 } }, { "name": "Strongarm Civilians", "desc": "Assign this gang member to extort civilians in your territory<br><br>Earns money - Slightly increases respect - Increases wanted - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.00004, "baseWanted": 0.02, "baseMoney": 7.5, "hackWeight": 10, "strWeight": 25, "defWeight": 25, "dexWeight": 20, "agiWeight": 10, "chaWeight": 10, "difficulty": 5, "territory": { "money": 1.6, "respect": 1.1, "wanted": 1.5 } }, { "name": "Run a Con", "desc": "Assign this gang member to run cons<br><br>Earns money - Increases respect - Increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00012, "baseWanted": 0.05, "baseMoney": 45, "hackWeight": 0, "strWeight": 5, "defWeight": 5, "dexWeight": 25, "agiWeight": 25, "chaWeight": 40, "difficulty": 14, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Armed Robbery", "desc": "Assign this gang member to commit armed robbery on stores, banks and armored cars<br><br>Earns money - Increases respect - Increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00014, "baseWanted": 0.1, "baseMoney": 114, "hackWeight": 20, "strWeight": 15, "defWeight": 15, "dexWeight": 20, "agiWeight": 10, "chaWeight": 20, "difficulty": 20, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Traffick Illegal Arms", "desc": "Assign this gang member to traffick illegal arms<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.0002, "baseWanted": 0.24, "baseMoney": 174, "hackWeight": 15, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 0, "chaWeight": 25, "difficulty": 32, "territory": { "money": 1.4, "respect": 1.3, "wanted": 1.25 } }, { "name": "Threaten & Blackmail", "desc": "Assign this gang member to threaten and black mail high-profile targets<br><br>Earns money - Slightly increases respect - Slightly increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.0002, "baseWanted": 0.125, "baseMoney": 72, "hackWeight": 25, "strWeight": 25, "defWeight": 0, "dexWeight": 25, "agiWeight": 0, "chaWeight": 25, "difficulty": 28, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Human Trafficking", "desc": "Assign this gang member to engage in human trafficking operations<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.004, "baseWanted": 1.25, "baseMoney": 360, "hackWeight": 30, "strWeight": 5, "defWeight": 5, "dexWeight": 30, "agiWeight": 0, "chaWeight": 30, "difficulty": 36, "territory": { "money": 1.5, "respect": 1.5, "wanted": 1.6 } }, { "name": "Terrorism", "desc": "Assign this gang member to commit acts of terrorism<br><br>Greatly increases respect - Greatly increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.01, "baseWanted": 6, "baseMoney": 0, "hackWeight": 20, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 0, "chaWeight": 20, "difficulty": 36, "territory": { "money": 1, "respect": 2, "wanted": 2 } }, { "name": "Vigilante Justice", "desc": "Assign this gang member to be a vigilante and protect the city from criminals<br><br>Decreases wanted level", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": -0.001, "baseMoney": 0, "hackWeight": 20, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 0.9 } }, { "name": "Train Combat", "desc": "Assign this gang member to increase their combat stats (str, def, dex, agi)", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 25, "defWeight": 25, "dexWeight": 25, "agiWeight": 25, "chaWeight": 0, "difficulty": 100, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Hacking", "desc": "Assign this gang member to train their hacking skills", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 45, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Charisma", "desc": "Assign this gang member to train their charisma", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 100, "difficulty": 8, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Territory Warfare", "desc": "Assign this gang member to engage in territorial warfare with other gangs. Members assigned to this task will help increase your gang's territory and will defend your territory from being taken.", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 15, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 5, "difficulty": 5, "territory": { "money": 1, "respect": 1, "wanted": 1 } }];
export const GangCTaskInfo = [{ "name": "Unassigned", "desc": "This gang member is currently idle", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Mug People", "desc": "Assign this gang member to mug random people on the streets<br><br>Earns money - Slightly increases respect - Very slightly increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00005, "baseWanted": 0.00005, "baseMoney": 3.6, "hackWeight": 0, "strWeight": 25, "defWeight": 25, "dexWeight": 25, "agiWeight": 10, "chaWeight": 15, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Deal Drugs", "desc": "Assign this gang member to sell drugs<br><br>Earns money - Slightly increases respect - Slightly increases wanted level - Scales slightly with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.00006, "baseWanted": 0.002, "baseMoney": 15, "hackWeight": 0, "strWeight": 0, "defWeight": 0, "dexWeight": 20, "agiWeight": 20, "chaWeight": 60, "difficulty": 3.5, "territory": { "money": 1.2, "respect": 1, "wanted": 1.15 } }, { "name": "Strongarm Civilians", "desc": "Assign this gang member to extort civilians in your territory<br><br>Earns money - Slightly increases respect - Increases wanted - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.00004, "baseWanted": 0.02, "baseMoney": 7.5, "hackWeight": 10, "strWeight": 25, "defWeight": 25, "dexWeight": 20, "agiWeight": 10, "chaWeight": 10, "difficulty": 5, "territory": { "money": 1.6, "respect": 1.1, "wanted": 1.5 } }, { "name": "Run a Con", "desc": "Assign this gang member to run cons<br><br>Earns money - Increases respect - Increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00012, "baseWanted": 0.05, "baseMoney": 45, "hackWeight": 0, "strWeight": 5, "defWeight": 5, "dexWeight": 25, "agiWeight": 25, "chaWeight": 40, "difficulty": 14, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Armed Robbery", "desc": "Assign this gang member to commit armed robbery on stores, banks and armored cars<br><br>Earns money - Increases respect - Increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.00014, "baseWanted": 0.1, "baseMoney": 114, "hackWeight": 20, "strWeight": 15, "defWeight": 15, "dexWeight": 20, "agiWeight": 10, "chaWeight": 20, "difficulty": 20, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Traffick Illegal Arms", "desc": "Assign this gang member to traffick illegal arms<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.0002, "baseWanted": 0.24, "baseMoney": 174, "hackWeight": 15, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 0, "chaWeight": 25, "difficulty": 32, "territory": { "money": 1.4, "respect": 1.3, "wanted": 1.25 } }, { "name": "Threaten & Blackmail", "desc": "Assign this gang member to threaten and black mail high-profile targets<br><br>Earns money - Slightly increases respect - Slightly increases wanted level", "isHacking": false, "isCombat": true, "baseRespect": 0.0002, "baseWanted": 0.125, "baseMoney": 72, "hackWeight": 25, "strWeight": 25, "defWeight": 0, "dexWeight": 25, "agiWeight": 0, "chaWeight": 25, "difficulty": 28, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Human Trafficking", "desc": "Assign this gang member to engage in human trafficking operations<br><br>Earns money - Increases respect - Increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.004, "baseWanted": 1.25, "baseMoney": 360, "hackWeight": 30, "strWeight": 5, "defWeight": 5, "dexWeight": 30, "agiWeight": 0, "chaWeight": 30, "difficulty": 36, "territory": { "money": 1.5, "respect": 1.5, "wanted": 1.6 } }, { "name": "Terrorism", "desc": "Assign this gang member to commit acts of terrorism<br><br>Greatly increases respect - Greatly increases wanted level - Scales heavily with territory", "isHacking": false, "isCombat": true, "baseRespect": 0.01, "baseWanted": 6, "baseMoney": 0, "hackWeight": 20, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 0, "chaWeight": 20, "difficulty": 36, "territory": { "money": 1, "respect": 2, "wanted": 2 } }, { "name": "Vigilante Justice", "desc": "Assign this gang member to be a vigilante and protect the city from criminals<br><br>Decreases wanted level", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": -0.001, "baseMoney": 0, "hackWeight": 20, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 0.9 } }, { "name": "Train Combat", "desc": "Assign this gang member to increase their combat stats (str, def, dex, agi)", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 25, "defWeight": 25, "dexWeight": 25, "agiWeight": 25, "chaWeight": 0, "difficulty": 100, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Hacking", "desc": "Assign this gang member to train their hacking skills", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 45, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Charisma", "desc": "Assign this gang member to train their charisma", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 100, "difficulty": 8, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Territory Warfare", "desc": "Assign this gang member to engage in territorial warfare with other gangs. Members assigned to this task will help increase your gang's territory and will defend your territory from being taken.", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 15, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 5, "difficulty": 5, "territory": { "money": 1, "respect": 1, "wanted": 1 } }];
export const GangHTaskInfo = [{ "name": "Unassigned", "desc": "This gang member is currently idle", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Vigilante Justice", "desc": "Assign this gang member to be a vigilante and protect the city from criminals<br><br>Decreases wanted level", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": -0.001, "baseMoney": 0, "hackWeight": 20, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 0, "difficulty": 1, "territory": { "money": 1, "respect": 1, "wanted": 0.9 } }, { "name": "Train Combat", "desc": "Assign this gang member to increase their combat stats (str, def, dex, agi)", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 25, "defWeight": 25, "dexWeight": 25, "agiWeight": 25, "chaWeight": 0, "difficulty": 100, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Hacking", "desc": "Assign this gang member to train their hacking skills", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 100, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 0, "difficulty": 45, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Train Charisma", "desc": "Assign this gang member to train their charisma", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 0, "strWeight": 0, "defWeight": 0, "dexWeight": 0, "agiWeight": 0, "chaWeight": 100, "difficulty": 8, "territory": { "money": 1, "respect": 1, "wanted": 1 } }, { "name": "Territory Warfare", "desc": "Assign this gang member to engage in territorial warfare with other gangs. Members assigned to this task will help increase your gang's territory and will defend your territory from being taken.", "isHacking": true, "isCombat": true, "baseRespect": 0, "baseWanted": 0, "baseMoney": 0, "hackWeight": 15, "strWeight": 20, "defWeight": 20, "dexWeight": 20, "agiWeight": 20, "chaWeight": 5, "difficulty": 5, "territory": { "money": 1, "respect": 1, "wanted": 1 } }];
export const GangEquips = [{ "name": "Baseball Bat", "type": "Weapon", "stats": { "str": 1.04, "def": 1.04 } }, { "name": "Katana", "type": "Weapon", "stats": { "str": 1.08, "def": 1.08, "dex": 1.08 } }, { "name": "Glock 18C", "type": "Weapon", "stats": { "str": 1.1, "def": 1.1, "dex": 1.1, "agi": 1.1 } }, { "name": "P90C", "type": "Weapon", "stats": { "str": 1.12, "def": 1.1, "agi": 1.1 } }, { "name": "Steyr AUG", "type": "Weapon", "stats": { "str": 1.2, "def": 1.15 } }, { "name": "AK-47", "type": "Weapon", "stats": { "str": 1.25, "def": 1.2 } }, { "name": "M15A10 Assault Rifle", "type": "Weapon", "stats": { "str": 1.3, "def": 1.25 } }, { "name": "AWM Sniper Rifle", "type": "Weapon", "stats": { "str": 1.3, "dex": 1.25, "agi": 1.3 } }, { "name": "Bulletproof Vest", "type": "Armor", "stats": { "def": 1.04 } }, { "name": "Full Body Armor", "type": "Armor", "stats": { "def": 1.08 } }, { "name": "Liquid Body Armor", "type": "Armor", "stats": { "def": 1.15, "agi": 1.15 } }, { "name": "Graphene Plating Armor", "type": "Armor", "stats": { "def": 1.2 } }, { "name": "Ford Flex V20", "type": "Vehicle", "stats": { "agi": 1.04, "cha": 1.04 } }, { "name": "ATX1070 Superbike", "type": "Vehicle", "stats": { "agi": 1.08, "cha": 1.08 } }, { "name": "Mercedes-Benz S9001", "type": "Vehicle", "stats": { "agi": 1.12, "cha": 1.12 } }, { "name": "White Ferrari", "type": "Vehicle", "stats": { "agi": 1.16, "cha": 1.16 } }, { "name": "NUKE Rootkit", "type": "Rootkit", "stats": { "hack": 1.05 } }, { "name": "Soulstealer Rootkit", "type": "Rootkit", "stats": { "hack": 1.1 } }, { "name": "Demon Rootkit", "type": "Rootkit", "stats": { "hack": 1.15 } }, { "name": "Hmap Node", "type": "Rootkit", "stats": { "hack": 1.12 } }, { "name": "Jack the Ripper", "type": "Rootkit", "stats": { "hack": 1.15 } }, { "name": "Bionic Arms", "type": "Augmentation", "stats": { "str": 1.3, "dex": 1.3 } }, { "name": "Bionic Legs", "type": "Augmentation", "stats": { "agi": 1.6 } }, { "name": "Bionic Spine", "type": "Augmentation", "stats": { "str": 1.15, "def": 1.15, "dex": 1.15, "agi": 1.15 } }, { "name": "BrachiBlades", "type": "Augmentation", "stats": { "str": 1.4, "def": 1.4 } }, { "name": "Nanofiber Weave", "type": "Augmentation", "stats": { "str": 1.2, "def": 1.2 } }, { "name": "Synthetic Heart", "type": "Augmentation", "stats": { "str": 1.5, "agi": 1.5 } }, { "name": "Synfibril Muscle", "type": "Augmentation", "stats": { "str": 1.3, "def": 1.3 } }, { "name": "BitWire", "type": "Augmentation", "stats": { "hack": 1.05 } }, { "name": "Neuralstimulator", "type": "Augmentation", "stats": { "hack": 1.15 } }, { "name": "DataJack", "type": "Augmentation", "stats": { "hack": 1.1 } }, { "name": "Graphene Bone Lacings", "type": "Augmentation", "stats": { "str": 1.7, "def": 1.7 } }];

export function getGang() { return (Math.asd && Math.asd.gang) ? Math.asd.gang.faction : null; }
export function hasGang() { return GangFactions.includes(getGang()); }
export function gangIsCombat(fac = (Math.asd && Math.asd.gang) ? Math.asd.gang.faction : null) { return GangCFactions.includes(fac); }
export function gangIsHacking(fac = (Math.asd && Math.asd.gang) ? Math.asd.gang.faction : null) { return GangHFactions.includes(fac); }
export function gangMemberInformation(member) { return (Math.asd && Math.asd.gang) ? Math.asd.gang.memberInfos.filter(a => a.name == member)[0] : null; }
export function gangGetTask(taskName) { return GangTaskInfo.filter(a => a.name == taskName)[0]; }

export function gangMemberTotalStats(member) { return eval('member.ha' + 'ck') + member.str + member.def + member.dex + member.agi + member.cha; }
export function statWt(task, member) {
	return 0.01 * (
		task.hackWeight * eval('member.ha' + 'ck') +
		task.strWeight * member.str +
		task.defWeight * member.def +
		task.dexWeight * member.dex +
		task.agiWeight * member.agi +
		task.chaWeight * member.cha);
}

export function calcRespectGain(member, task, gang = Math.asd ? Math.asd.gang : null) {
	if (!gang) { return 0; }
	if (task.baseRespect === 0) return 0;
	let statWeight = statWt(task, member);
	statWeight -= 4 * task.difficulty;
	if (statWeight <= 0) return 0;
	const territoryMult = Math.max(0.005, Math.pow(gang.territory * 100, task.territory.respect) / 100);
	const territoryPenalty = (0.2 * gang.territory + 0.8) * ((Math.asd && Math.asd.BitNodeMultipliers) ? (Math.asd.BitNodeMultipliers.GangSoftcap ?? 1.0) : 1.0);
	if (isNaN(territoryMult) || territoryMult <= 0) return 0;
	const respectMult = calcWantedPenalty(gang);
	return Math.pow(11 * task.baseRespect * statWeight * territoryMult * respectMult, territoryPenalty);
}

export function calcWantedLevelGain(member, task, gang = Math.asd ? Math.asd.gang : null) {
	if (!gang) { return 0; }
	if (task.baseWanted === 0) return 0;
	let statWeight = statWt(task, member);
	statWeight -= 3.5 * task.difficulty;
	if (statWeight <= 0) return 0;
	const territoryMult = Math.max(0.005, Math.pow(gang.territory * 100, task.territory.wanted) / 100);
	if (isNaN(territoryMult) || territoryMult <= 0) return 0;
	if (task.baseWanted < 0) {
		return 0.4 * task.baseWanted * statWeight * territoryMult;
	}
	const calc = (7 * task.baseWanted) / Math.pow(3 * statWeight * territoryMult, 0.8);

	// Put an arbitrary cap on this to prevent wanted level from rising too fast if the
	// denominator is very small. Might want to rethink formula later
	return Math.min(100, calc);
}

export function calcMoneyGain(member, task, gang = Math.asd ? Math.asd.gang : null) {
	if (!gang) { return 0; }
	if (task.baseMoney === 0) return 0;
	let statWeight = statWt(task, member);

	statWeight -= 3.2 * task.difficulty;
	if (statWeight <= 0) return 0;
	const territoryMult = Math.max(0.005, Math.pow(gang.territory * 100, task.territory.money) / 100);
	if (isNaN(territoryMult) || territoryMult <= 0) return 0;
	const respectMult = calcWantedPenalty(gang);
	const territoryPenalty = (0.2 * gang.territory + 0.8) * ((Math.asd && Math.asd.BitNodeMultipliers) ? (Math.asd.BitNodeMultipliers.GangSoftcap ?? 1.0) : 1.0);
	return Math.pow(5 * task.baseMoney * statWeight * territoryMult * respectMult, territoryPenalty);
}

export function calcWantedPenalty(gang = Math.asd.gang) { return gang.respect / (gang.respect + gang.wantedLevel); }
export function calcAscensionPointsGain(exp) { return Math.max(exp - 1000, 0); }
export function calcAscensionMult(points) { return Math.max(Math.pow(points / 2000, 0.5), 1); }

// ====================================================
// === 04 SOME better/no cost Singularity functions ===
// ====================================================
export function hasSingularity() { return hasSource(4); }
export function hasSource(sNumber) { return ((sourceLvl(sNumber)) || (currentBitNode() == sNumber)); }
export function currentBitNode() { return (Math.asd) ? (Math.asd.sources[0] ?? 1) : 1; }
export function sourceLvl(bNode) { return (Math.asd) ? (Math.asd.sources[bNode] ?? 0) : 0; }

export const factionList = [
	'CyberSec', 'Tian Di Hui', 'Netburners', 'NiteSec', 'The Black Hand', 'BitRunners' //early game and hackers
	, 'Chongqing', 'New Tokyo', 'Ishima', 'Sector-12', 'Aevum', 'Volhaven' //cities-first 3, next 2, and last are grouped
	, 'ECorp', 'MegaCorp', 'KuaiGong International', 'Four Sigma', 'NWO', 'Blade Industries' //companies
	, 'OmniTek Incorporated', 'Bachman & Associates', 'Clarke Incorporated', 'Fulcrum Secret Technologies' //companies
	, 'Slum Snakes', 'Tetrads', 'Silhouette', 'Speakers for the Dead', 'The Dark Army', 'The Syndicate' //criminals
	, 'The Covenant', 'Daedalus', 'Illuminati' //end game
]
export const augmentsByFaction = [{ faction: 'CyberSec', augments: ["BitWire", "Synaptic Enhancement Implant", "Cranial Signal Processors - Gen I", "Cranial Signal Processors - Gen II", "NeuroFlux Governor", "Neurotrainer I"] }, { faction: 'Tian Di Hui', augments: ["Nanofiber Weave", "Wired Reflexes", "Speech Processor Implant", "Nuoptimal Nootropic Injector Implant", "Speech Enhancement", "ADR-V1 Pheromone Gene", "NeuroFlux Governor", "Social Negotiation Assistant (S.N.A)", "Neuroreceptor Management Implant"] }, { faction: 'Netburners', augments: ["Hacknet Node CPU Architecture Neural-Upload", "Hacknet Node Cache Architecture Neural-Upload", "Hacknet Node NIC Architecture Neural-Upload", "Hacknet Node Kernel Direct-Neural Interface", "Hacknet Node Core Direct-Neural Interface", "NeuroFlux Governor"] }, { faction: 'NiteSec', augments: ["BitWire", "Artificial Synaptic Potentiation", "Neural-Retention Enhancement", "DataJack", "Embedded Netburner Module", "Cranial Signal Processors - Gen II", "Cranial Signal Processors - Gen III", "NeuroFlux Governor", "Neurotrainer II", "CRTX42-AA Gene Modification"] }, { faction: 'The Black Hand', augments: ["Artificial Synaptic Potentiation", "Enhanced Myelin Sheathing", "DataJack", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Neuralstimulator", "Cranial Signal Processors - Gen III", "Cranial Signal Processors - Gen IV", "NeuroFlux Governor", "The Black Hand"] }, { faction: 'BitRunners', augments: ["Artificial Bio-neural Network Implant", "Enhanced Myelin Sheathing", "DataJack", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "Neural Accelerator", "Cranial Signal Processors - Gen III", "Cranial Signal Processors - Gen IV", "Cranial Signal Processors - Gen V", "NeuroFlux Governor", "Neurotrainer II", "BitRunners Neurolink"] }, { faction: 'Chongqing', augments: ["Speech Processor Implant", "DataJack", "Neuralstimulator", "Nuoptimal Nootropic Injector Implant", "NeuroFlux Governor", "Neuregen Gene Modification"] }, { faction: 'New Tokyo', augments: ["Speech Processor Implant", "DataJack", "Neuralstimulator", "Nuoptimal Nootropic Injector Implant", "NeuroFlux Governor", "NutriGen Implant"] }, { faction: 'Ishima', augments: ["Augmented Targeting I", "Combat Rib I", "Wired Reflexes", "Speech Processor Implant", "Neuralstimulator", "NeuroFlux Governor", "INFRARET Enhancement"] }, { faction: 'Sector-12', augments: ["Augmented Targeting I", "Augmented Targeting II", "Wired Reflexes", "Speech Processor Implant", "Neuralstimulator", "NeuroFlux Governor", "CashRoot Starter Kit"] }, { faction: 'Aevum', augments: ["Wired Reflexes", "Speech Processor Implant", "Synaptic Enhancement Implant", "Neuralstimulator", "NeuroFlux Governor", "Neurotrainer I", "PCMatrix"] }, { faction: 'Volhaven', augments: ["Combat Rib I", "Combat Rib II", "Wired Reflexes", "Speech Processor Implant", "Neuralstimulator", "Nuoptimal Nootropic Injector Implant", "NeuroFlux Governor", "DermaForce Particle Barrier"] }, { faction: 'ECorp', augments: ["Graphene Bionic Spine Upgrade", "Graphene Bionic Legs Upgrade", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "PC Direct-Neural Interface", "PC Direct-Neural Interface Optimization Submodule", "NeuroFlux Governor", "ECorp HVMind Implant"] }, { faction: 'MegaCorp', augments: ["Graphene Bionic Legs Upgrade", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "ADR-V1 Pheromone Gene", "NeuroFlux Governor", "CordiARC Fusion Reactor"] }, { faction: 'KuaiGong International', augments: ["Augmented Targeting I", "Augmented Targeting II", "Augmented Targeting III", "Synthetic Heart", "Synfibril Muscle", "Combat Rib I", "Combat Rib II", "Combat Rib III", "Bionic Spine", "Bionic Legs", "Embedded Netburner Module Core V2 Upgrade", "Speech Enhancement", "FocusWire", "NeuroFlux Governor", "HyperSight Corneal Implant", "Photosynthetic Cells"] }, { faction: 'Four Sigma', augments: ["Enhanced Social Interaction Implant", "Neuralstimulator", "Nuoptimal Nootropic Injector Implant", "Speech Enhancement", "FocusWire", "PC Direct-Neural Interface", "ADR-V1 Pheromone Gene", "ADR-V2 Pheromone Gene", "NeuroFlux Governor", "Neurotrainer III"] }, { faction: 'NWO', augments: ["Synthetic Heart", "Synfibril Muscle", "Enhanced Social Interaction Implant", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "ADR-V1 Pheromone Gene", "NeuroFlux Governor", "Neurotrainer III", "Power Recirculation Core", "Xanipher", "Hydroflame Left Arm"] }, { faction: 'Blade Industries', augments: ["Augmented Targeting I", "Augmented Targeting II", "Augmented Targeting III", "Synfibril Muscle", "Combat Rib I", "Combat Rib II", "Combat Rib III", "Nanofiber Weave", "Bionic Spine", "Bionic Legs", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "PC Direct-Neural Interface", "PC Direct-Neural Interface Optimization Submodule", "NeuroFlux Governor", "HyperSight Corneal Implant", "Neotra"] }, { faction: 'OmniTek Incorporated', augments: ["Augmented Targeting I", "Augmented Targeting II", "Augmented Targeting III", "Combat Rib I", "Combat Rib II", "Combat Rib III", "Nanofiber Weave", "Bionic Spine", "Bionic Legs", "Enhanced Social Interaction Implant", "Embedded Netburner Module Core V2 Upgrade", "PC Direct-Neural Interface", "NeuroFlux Governor", "OmniTek InfoLoad"] }, { faction: 'Bachman & Associates', augments: ["Enhanced Social Interaction Implant", "Neuralstimulator", "Nuoptimal Nootropic Injector Implant", "Speech Enhancement", "FocusWire", "ADR-V2 Pheromone Gene", "NeuroFlux Governor", "SmartJaw"] }, { faction: 'Clarke Incorporated', augments: ["Enhanced Social Interaction Implant", "Neuralstimulator", "Neuronal Densification", "Nuoptimal Nootropic Injector Implant", "Speech Enhancement", "FocusWire", "ADR-V2 Pheromone Gene", "NeuroFlux Governor", "nextSENS Gene Modification"] }, { faction: 'Fulcrum Secret Technologies', augments: ["Synthetic Heart", "Synfibril Muscle", "Nanofiber Weave", "NEMEAN Subdermal Weave", "Graphene Bone Lacings", "Graphene Bionic Spine Upgrade", "Graphene Bionic Legs Upgrade", "Artificial Bio-neural Network Implant", "Enhanced Myelin Sheathing", "Embedded Netburner Module", "Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "PC Direct-Neural Interface Optimization Submodule", "PC Direct-Neural Interface NeuroNet Injector", "NeuroFlux Governor"] }, { faction: 'Slum Snakes', augments: ["Augmented Targeting I", "Combat Rib I", "Wired Reflexes", "NeuroFlux Governor", "LuminCloaking-V1 Skin Implant", "LuminCloaking-V2 Skin Implant", "SmartSonar Implant"] }, { faction: 'Tetrads', augments: ["HemoRecirculator", "NeuroFlux Governor", "LuminCloaking-V1 Skin Implant", "LuminCloaking-V2 Skin Implant", "Power Recirculation Core", "Bionic Arms"] }, { faction: 'Silhouette', augments: ["Speech Processor Implant", "TITN-41 Gene-Modification Injection", "ADR-V2 Pheromone Gene", "NeuroFlux Governor"] }, { faction: 'Speakers for the Dead', augments: ["Unstable Circadian Modulator", "Synthetic Heart", "Synfibril Muscle", "Nanofiber Weave", "Wired Reflexes", "Bionic Spine", "Bionic Legs", "Speech Enhancement", "The Shadow's Simulacrum", "NeuroFlux Governor", "Graphene BrachiBlades Upgrade"] }, { faction: 'The Dark Army', augments: ["HemoRecirculator", "Augmented Targeting I", "Augmented Targeting II", "Augmented Targeting III", "Combat Rib I", "Combat Rib II", "Combat Rib III", "Nanofiber Weave", "Wired Reflexes", "The Shadow's Simulacrum", "NeuroFlux Governor", "Power Recirculation Core", "Graphene Bionic Arms Upgrade"] }, { faction: 'The Syndicate', augments: ["HemoRecirculator", "Augmented Targeting I", "Augmented Targeting II", "Augmented Targeting III", "Combat Rib I", "Combat Rib II", "Combat Rib III", "Nanofiber Weave", "NEMEAN Subdermal Weave", "Wired Reflexes", "Bionic Spine", "Bionic Legs", "ADR-V1 Pheromone Gene", "The Shadow's Simulacrum", "NeuroFlux Governor", "Power Recirculation Core", "BrachiBlades"] }, { faction: 'The Covenant', augments: ["Augmented Targeting III", "Synthetic Heart", "Synfibril Muscle", "Combat Rib III", "NEMEAN Subdermal Weave", "Graphene Bone Lacings", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "NeuroFlux Governor", "SPTN-97 Gene Modification"] }, { faction: 'Daedalus', augments: ["Synthetic Heart", "Synfibril Muscle", "NEMEAN Subdermal Weave", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "NeuroFlux Governor", "The Red Pill"] }, { faction: 'Illuminati', augments: ["Synthetic Heart", "Synfibril Muscle", "NEMEAN Subdermal Weave", "Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module Direct Memory Access Upgrade", "NeuroFlux Governor", "QLink"] }];
export const augmentList = ["QLink", "Hydroflame Left Arm", "Embedded Netburner Module Core V3 Upgrade", "PC Direct-Neural Interface NeuroNet Injector", "Embedded Netburner Module Direct Memory Access Upgrade", "Graphene Bionic Spine Upgrade", "Embedded Netburner Module Analyze Engine", "ECorp HVMind Implant", "CordiARC Fusion Reactor", "Unstable Circadian Modulator", "SPTN-97 Gene Modification", "Embedded Netburner Module Core V2 Upgrade", "Graphene Bionic Legs Upgrade", "PC Direct-Neural Interface Optimization Submodule", "BitRunners Neurolink", "Xanipher", "Graphene Bone Lacings", "PC Direct-Neural Interface", "Graphene Bionic Arms Upgrade", "NEMEAN Subdermal Weave", "Neuralstimulator", "Artificial Bio-neural Network Implant", "Synthetic Heart", "Neotra", "OmniTek InfoLoad", "HyperSight Corneal Implant", "Photosynthetic Cells", "SmartJaw", "Embedded Netburner Module Core Implant", "Graphene BrachiBlades Upgrade", "Cranial Signal Processors - Gen V", "PCMatrix", "nextSENS Gene Modification", "Neural Accelerator", "Enhanced Myelin Sheathing", "Enhanced Social Interaction Implant", "Neuronal Densification", "Synfibril Muscle", "Cranial Signal Processors - Gen IV", "FocusWire", "Neuroreceptor Management Implant", "Cranial Signal Processors - Gen III", "The Black Hand", "ADR-V2 Pheromone Gene", "DataJack", "The Shadow's Simulacrum", "Neuregen Gene Modification", "Bionic Legs", "Bionic Arms", "Neural-Retention Enhancement", "Embedded Netburner Module", "CRTX42-AA Gene Modification", "TITN-41 Gene-Modification Injection", "Power Recirculation Core", "Neurotrainer III", "Cranial Signal Processors - Gen II", "Nanofiber Weave", "CashRoot Starter Kit", "Bionic Spine", "Combat Rib III", "Augmented Targeting III", "BrachiBlades", "Artificial Synaptic Potentiation", "SmartSonar Implant", "Cranial Signal Processors - Gen I", "Combat Rib II", "Hacknet Node Core Direct-Neural Interface", "Speech Processor Implant", "DermaForce Particle Barrier", "Neurotrainer II", "HemoRecirculator", "Augmented Targeting II", "Hacknet Node Kernel Direct-Neural Interface", "Social Negotiation Assistant (S.N.A)", "INFRARET Enhancement", "LuminCloaking-V2 Skin Implant", "Combat Rib I", "Nuoptimal Nootropic Injector Implant", "ADR-V1 Pheromone Gene", "Augmented Targeting I", "Speech Enhancement", "Hacknet Node CPU Architecture Neural-Upload", "BitWire", "Synaptic Enhancement Implant", "Hacknet Node Cache Architecture Neural-Upload", "LuminCloaking-V1 Skin Implant", "Hacknet Node NIC Architecture Neural-Upload", "Neurotrainer I", "Wired Reflexes", "NutriGen Implant", "NeuroFlux Governor", "The Red Pill"]
export const augmentDetails = [{ "name": "QLink", "price": 25000000000000, "rep": 1875000, "stats": { "hacking_mult": 1.75, "hacking_chance_mult": 2.5, "hacking_speed_mult": 2, "hacking_money_mult": 4 }, "prereqs": [], "factions": ["Illuminati"] }, { "name": "Hydroflame Left Arm", "price": 2500000000000, "rep": 1250000, "stats": { "strength_mult": 2.7 }, "prereqs": [], "factions": ["NWO"] }, { "name": "Embedded Netburner Module Core V3 Upgrade", "price": 7500000000, "rep": 1750000, "stats": { "hacking_mult": 1.1, "hacking_exp_mult": 1.25, "hacking_chance_mult": 1.1, "hacking_speed_mult": 1.05, "hacking_money_mult": 1.4 }, "prereqs": ["Embedded Netburner Module Core V2 Upgrade"], "factions": ["ECorp", "MegaCorp", "NWO", "Fulcrum Secret Technologies", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "PC Direct-Neural Interface NeuroNet Injector", "price": 7500000000, "rep": 1500000, "stats": { "hacking_mult": 1.1, "hacking_speed_mult": 1.05, "company_rep_mult": 2 }, "prereqs": ["PC Direct-Neural Interface"], "factions": ["Fulcrum Secret Technologies"] }, { "name": "Embedded Netburner Module Direct Memory Access Upgrade", "price": 7000000000, "rep": 1000000, "stats": { "hacking_chance_mult": 1.2, "hacking_money_mult": 1.4 }, "prereqs": ["Embedded Netburner Module"], "factions": ["ECorp", "MegaCorp", "NWO", "Fulcrum Secret Technologies", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "Graphene Bionic Spine Upgrade", "price": 6000000000, "rep": 1625000, "stats": { "strength_mult": 1.6, "defense_mult": 1.6, "dexterity_mult": 1.6, "agility_mult": 1.6 }, "prereqs": ["Bionic Spine"], "factions": ["ECorp", "Fulcrum Secret Technologies"] }, { "name": "Embedded Netburner Module Analyze Engine", "price": 6000000000, "rep": 625000, "stats": { "hacking_speed_mult": 1.1 }, "prereqs": ["Embedded Netburner Module"], "factions": ["ECorp", "MegaCorp", "NWO", "Fulcrum Secret Technologies", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "ECorp HVMind Implant", "price": 5500000000, "rep": 1500000, "stats": { "hacking_grow_mult": 3 }, "prereqs": [], "factions": ["ECorp"] }, { "name": "CordiARC Fusion Reactor", "price": 5000000000, "rep": 1125000, "stats": { "strength_mult": 1.35, "defense_mult": 1.35, "dexterity_mult": 1.35, "agility_mult": 1.35, "strength_exp_mult": 1.35, "defense_exp_mult": 1.35, "dexterity_exp_mult": 1.35, "agility_exp_mult": 1.35 }, "prereqs": [], "factions": ["MegaCorp"] }, { "name": "Unstable Circadian Modulator", "price": 5000000000, "rep": 362500, "stats": { "hacknet_node_money_mult": 1.2, "hacknet_node_purchase_cost_mult": 0.85, "hacknet_node_ram_cost_mult": 0.85, "hacknet_node_core_cost_mult": 0.85, "hacknet_node_level_cost_mult": 0.85 }, "prereqs": [], "factions": ["Speakers for the Dead"] }, { "name": "SPTN-97 Gene Modification", "price": 4875000000, "rep": 1250000, "stats": { "hacking_mult": 1.15, "strength_mult": 1.75, "defense_mult": 1.75, "dexterity_mult": 1.75, "agility_mult": 1.75 }, "prereqs": [], "factions": ["The Covenant"] }, { "name": "Embedded Netburner Module Core V2 Upgrade", "price": 4500000000, "rep": 1000000, "stats": { "hacking_mult": 1.08, "hacking_exp_mult": 1.15, "hacking_chance_mult": 1.05, "hacking_speed_mult": 1.05, "hacking_money_mult": 1.3 }, "prereqs": ["Embedded Netburner Module Core Implant"], "factions": ["BitRunners", "ECorp", "MegaCorp", "KuaiGong International", "NWO", "Blade Industries", "OmniTek Incorporated", "Fulcrum Secret Technologies"] }, { "name": "Graphene Bionic Legs Upgrade", "price": 4500000000, "rep": 750000, "stats": { "agility_mult": 2.5 }, "prereqs": ["Bionic Legs"], "factions": ["ECorp", "MegaCorp", "Fulcrum Secret Technologies"] }, { "name": "PC Direct-Neural Interface Optimization Submodule", "price": 4500000000, "rep": 500000, "stats": { "hacking_mult": 1.1, "company_rep_mult": 1.75 }, "prereqs": ["PC Direct-Neural Interface"], "factions": ["ECorp", "Blade Industries", "Fulcrum Secret Technologies"] }, { "name": "BitRunners Neurolink", "price": 4375000000, "rep": 875000, "stats": { "hacking_mult": 1.15, "hacking_exp_mult": 1.2, "hacking_chance_mult": 1.1, "hacking_speed_mult": 1.05 }, "prereqs": [], "factions": ["BitRunners"] }, { "name": "Xanipher", "price": 4250000000, "rep": 875000, "stats": { "hacking_mult": 1.2, "strength_mult": 1.2, "defense_mult": 1.2, "dexterity_mult": 1.2, "agility_mult": 1.2, "charisma_mult": 1.2, "hacking_exp_mult": 1.15, "strength_exp_mult": 1.15, "defense_exp_mult": 1.15, "dexterity_exp_mult": 1.15, "agility_exp_mult": 1.15, "charisma_exp_mult": 1.15 }, "prereqs": [], "factions": ["NWO"] }, { "name": "Graphene Bone Lacings", "price": 4250000000, "rep": 1125000, "stats": { "strength_mult": 1.7, "defense_mult": 1.7 }, "prereqs": [], "factions": ["Fulcrum Secret Technologies", "The Covenant"] }, { "name": "PC Direct-Neural Interface", "price": 3750000000, "rep": 375000, "stats": { "hacking_mult": 1.08, "company_rep_mult": 1.3 }, "prereqs": [], "factions": ["ECorp", "Four Sigma", "Blade Industries", "OmniTek Incorporated"] }, { "name": "Graphene Bionic Arms Upgrade", "price": 3750000000, "rep": 500000, "stats": { "strength_mult": 1.85, "dexterity_mult": 1.85 }, "prereqs": ["Bionic Arms"], "factions": ["The Dark Army"] }, { "name": "NEMEAN Subdermal Weave", "price": 3250000000, "rep": 875000, "stats": { "defense_mult": 2.2 }, "prereqs": [], "factions": ["Fulcrum Secret Technologies", "The Syndicate", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "Neuralstimulator", "price": 3000000000, "rep": 50000, "stats": { "hacking_exp_mult": 1.12, "hacking_chance_mult": 1.1, "hacking_speed_mult": 1.02 }, "prereqs": [], "factions": ["The Black Hand", "Chongqing", "New Tokyo", "Ishima", "Sector-12", "Aevum", "Volhaven", "Four Sigma", "Bachman & Associates", "Clarke Incorporated"] }, { "name": "Artificial Bio-neural Network Implant", "price": 3000000000, "rep": 275000, "stats": { "hacking_mult": 1.12, "hacking_speed_mult": 1.03, "hacking_money_mult": 1.15 }, "prereqs": [], "factions": ["BitRunners", "Fulcrum Secret Technologies"] }, { "name": "Synthetic Heart", "price": 2875000000, "rep": 750000, "stats": { "strength_mult": 1.5, "agility_mult": 1.5 }, "prereqs": [], "factions": ["KuaiGong International", "NWO", "Fulcrum Secret Technologies", "Speakers for the Dead", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "Neotra", "price": 2875000000, "rep": 562500, "stats": { "strength_mult": 1.55, "defense_mult": 1.55 }, "prereqs": [], "factions": ["Blade Industries"] }, { "name": "OmniTek InfoLoad", "price": 2875000000, "rep": 625000, "stats": { "hacking_mult": 1.2, "hacking_exp_mult": 1.25 }, "prereqs": [], "factions": ["OmniTek Incorporated"] }, { "name": "HyperSight Corneal Implant", "price": 2750000000, "rep": 150000, "stats": { "dexterity_mult": 1.4, "hacking_speed_mult": 1.03, "hacking_money_mult": 1.1 }, "prereqs": [], "factions": ["KuaiGong International", "Blade Industries"] }, { "name": "Photosynthetic Cells", "price": 2750000000, "rep": 562500, "stats": { "strength_mult": 1.4, "defense_mult": 1.4, "agility_mult": 1.4 }, "prereqs": [], "factions": ["KuaiGong International"] }, { "name": "SmartJaw", "price": 2750000000, "rep": 375000, "stats": { "charisma_mult": 1.5, "charisma_exp_mult": 1.5, "company_rep_mult": 1.25, "faction_rep_mult": 1.25 }, "prereqs": [], "factions": ["Bachman & Associates"] }, { "name": "Embedded Netburner Module Core Implant", "price": 2500000000, "rep": 175000, "stats": { "hacking_mult": 1.07, "hacking_exp_mult": 1.07, "hacking_chance_mult": 1.03, "hacking_speed_mult": 1.03, "hacking_money_mult": 1.1 }, "prereqs": ["Embedded Netburner Module"], "factions": ["The Black Hand", "BitRunners", "ECorp", "MegaCorp", "NWO", "Blade Industries", "Fulcrum Secret Technologies"] }, { "name": "Graphene BrachiBlades Upgrade", "price": 2500000000, "rep": 225000, "stats": { "strength_mult": 1.4, "defense_mult": 1.4, "crime_money_mult": 1.3, "crime_success_mult": 1.1 }, "prereqs": ["BrachiBlades"], "factions": ["Speakers for the Dead"] }, { "name": "Cranial Signal Processors - Gen V", "price": 2250000000, "rep": 250000, "stats": { "hacking_mult": 1.3, "hacking_money_mult": 1.25, "hacking_grow_mult": 1.75 }, "prereqs": ["Cranial Signal Processors - Gen IV"], "factions": ["BitRunners"] }, { "name": "PCMatrix", "price": 2000000000, "rep": 100000, "stats": { "charisma_mult": 1.0777, "charisma_exp_mult": 1.0777, "company_rep_mult": 1.0777, "faction_rep_mult": 1.0777, "crime_money_mult": 1.0777, "crime_success_mult": 1.0777, "work_money_mult": 1.777 }, "prereqs": [], "factions": ["Aevum"] }, { "name": "nextSENS Gene Modification", "price": 1925000000, "rep": 437500, "stats": { "hacking_mult": 1.2, "strength_mult": 1.2, "defense_mult": 1.2, "dexterity_mult": 1.2, "agility_mult": 1.2, "charisma_mult": 1.2 }, "prereqs": [], "factions": ["Clarke Incorporated"] }, { "name": "Neural Accelerator", "price": 1750000000, "rep": 200000, "stats": { "hacking_mult": 1.1, "hacking_exp_mult": 1.15, "hacking_money_mult": 1.2 }, "prereqs": [], "factions": ["BitRunners"] }, { "name": "Enhanced Myelin Sheathing", "price": 1375000000, "rep": 100000, "stats": { "hacking_mult": 1.08, "hacking_exp_mult": 1.1, "hacking_speed_mult": 1.03 }, "prereqs": [], "factions": ["The Black Hand", "BitRunners", "Fulcrum Secret Technologies"] }, { "name": "Enhanced Social Interaction Implant", "price": 1375000000, "rep": 375000, "stats": { "charisma_mult": 1.6, "charisma_exp_mult": 1.6 }, "prereqs": [], "factions": ["Four Sigma", "NWO", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated"] }, { "name": "Neuronal Densification", "price": 1375000000, "rep": 187500, "stats": { "hacking_mult": 1.15, "hacking_exp_mult": 1.1, "hacking_speed_mult": 1.03 }, "prereqs": [], "factions": ["Clarke Incorporated"] }, { "name": "Synfibril Muscle", "price": 1125000000, "rep": 437500, "stats": { "strength_mult": 1.3, "defense_mult": 1.3 }, "prereqs": [], "factions": ["KuaiGong International", "NWO", "Blade Industries", "Fulcrum Secret Technologies", "Speakers for the Dead", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "Cranial Signal Processors - Gen IV", "price": 1100000000, "rep": 125000, "stats": { "hacking_speed_mult": 1.02, "hacking_money_mult": 1.2, "hacking_grow_mult": 1.25 }, "prereqs": ["Cranial Signal Processors - Gen III"], "factions": ["The Black Hand", "BitRunners"] }, { "name": "FocusWire", "price": 900000000, "rep": 75000, "stats": { "hacking_exp_mult": 1.05, "strength_exp_mult": 1.05, "defense_exp_mult": 1.05, "dexterity_exp_mult": 1.05, "agility_exp_mult": 1.05, "charisma_exp_mult": 1.05, "company_rep_mult": 1.1, "work_money_mult": 1.2 }, "prereqs": [], "factions": ["KuaiGong International", "Four Sigma", "Bachman & Associates", "Clarke Incorporated"] }, { "name": "Neuroreceptor Management Implant", "price": 550000000, "rep": 75000, "stats": {}, "prereqs": [], "factions": ["Tian Di Hui"] }
	, { "name": "Cranial Signal Processors - Gen III", "price": 550000000, "rep": 50000, "stats": { "hacking_mult": 1.09, "hacking_speed_mult": 1.02, "hacking_money_mult": 1.15 }, "prereqs": ["Cranial Signal Processors - Gen II"], "factions": ["NiteSec", "The Black Hand", "BitRunners"] }, { "name": "The Black Hand", "price": 550000000, "rep": 100000, "stats": { "hacking_mult": 1.1, "strength_mult": 1.15, "dexterity_mult": 1.15, "hacking_speed_mult": 1.02, "hacking_money_mult": 1.1 }, "prereqs": [], "factions": ["The Black Hand"] }, { "name": "ADR-V2 Pheromone Gene", "price": 550000000, "rep": 62500, "stats": { "company_rep_mult": 1.2, "faction_rep_mult": 1.2 }, "prereqs": [], "factions": ["Four Sigma", "Bachman & Associates", "Clarke Incorporated", "Silhouette"] }, { "name": "DataJack", "price": 450000000, "rep": 112500, "stats": { "hacking_money_mult": 1.25 }, "prereqs": [], "factions": ["NiteSec", "The Black Hand", "BitRunners", "Chongqing", "New Tokyo"] }, { "name": "The Shadow's Simulacrum", "price": 400000000, "rep": 37500, "stats": { "company_rep_mult": 1.15, "faction_rep_mult": 1.15 }, "prereqs": [], "factions": ["Speakers for the Dead", "The Dark Army", "The Syndicate"] }, { "name": "Neuregen Gene Modification", "price": 375000000, "rep": 37500, "stats": { "hacking_exp_mult": 1.4 }, "prereqs": [], "factions": ["Chongqing"] }, { "name": "Bionic Legs", "price": 375000000, "rep": 150000, "stats": { "agility_mult": 1.6 }, "prereqs": [], "factions": ["KuaiGong International", "Blade Industries", "OmniTek Incorporated", "Speakers for the Dead", "The Syndicate"] }, { "name": "Bionic Arms", "price": 275000000, "rep": 62500, "stats": { "strength_mult": 1.3, "dexterity_mult": 1.3 }, "prereqs": [], "factions": ["Tetrads"] }, { "name": "Neural-Retention Enhancement", "price": 250000000, "rep": 20000, "stats": { "hacking_exp_mult": 1.25 }, "prereqs": [], "factions": ["NiteSec"] }, { "name": "Embedded Netburner Module", "price": 250000000, "rep": 15000, "stats": { "hacking_mult": 1.08 }, "prereqs": [], "factions": ["NiteSec", "The Black Hand", "BitRunners", "ECorp", "MegaCorp", "NWO", "Blade Industries", "Fulcrum Secret Technologies"] }, { "name": "CRTX42-AA Gene Modification", "price": 225000000, "rep": 45000, "stats": { "hacking_mult": 1.08, "hacking_exp_mult": 1.15 }, "prereqs": [], "factions": ["NiteSec"] }, { "name": "TITN-41 Gene-Modification Injection", "price": 190000000, "rep": 25000, "stats": { "charisma_mult": 1.15, "charisma_exp_mult": 1.15 }, "prereqs": [], "factions": ["Silhouette"] }, { "name": "Power Recirculation Core", "price": 180000000, "rep": 25000, "stats": { "hacking_mult": 1.05, "strength_mult": 1.05, "defense_mult": 1.05, "dexterity_mult": 1.05, "agility_mult": 1.05, "charisma_mult": 1.05, "hacking_exp_mult": 1.1, "strength_exp_mult": 1.1, "defense_exp_mult": 1.1, "dexterity_exp_mult": 1.1, "agility_exp_mult": 1.1, "charisma_exp_mult": 1.1 }, "prereqs": [], "factions": ["NWO", "Tetrads", "The Dark Army", "The Syndicate"] }, { "name": "Neurotrainer III", "price": 130000000, "rep": 25000, "stats": { "hacking_exp_mult": 1.2, "strength_exp_mult": 1.2, "defense_exp_mult": 1.2, "dexterity_exp_mult": 1.2, "agility_exp_mult": 1.2, "charisma_exp_mult": 1.2 }, "prereqs": [], "factions": ["Four Sigma", "NWO"] }, { "name": "Cranial Signal Processors - Gen II", "price": 125000000, "rep": 18750, "stats": { "hacking_mult": 1.07, "hacking_chance_mult": 1.05, "hacking_speed_mult": 1.02 }, "prereqs": ["Cranial Signal Processors - Gen I"], "factions": ["CyberSec", "NiteSec"] }, { "name": "Nanofiber Weave", "price": 125000000, "rep": 37500, "stats": { "strength_mult": 1.2, "defense_mult": 1.2 }, "prereqs": [], "factions": ["Tian Di Hui", "Blade Industries", "OmniTek Incorporated", "Fulcrum Secret Technologies", "Speakers for the Dead", "The Dark Army", "The Syndicate"] }, { "name": "CashRoot Starter Kit", "price": 125000000, "rep": 12500, "stats": {}, "prereqs": [], "factions": ["Sector-12"] }, { "name": "Bionic Spine", "price": 125000000, "rep": 45000, "stats": { "strength_mult": 1.15, "defense_mult": 1.15, "dexterity_mult": 1.15, "agility_mult": 1.15 }, "prereqs": [], "factions": ["KuaiGong International", "Blade Industries", "OmniTek Incorporated", "Speakers for the Dead", "The Syndicate"] }, { "name": "Combat Rib III", "price": 120000000, "rep": 35000, "stats": { "strength_mult": 1.18, "defense_mult": 1.18 }, "prereqs": ["Combat Rib II"], "factions": ["KuaiGong International", "Blade Industries", "OmniTek Incorporated", "The Dark Army", "The Syndicate", "The Covenant"] }, { "name": "Augmented Targeting III", "price": 115000000, "rep": 27500, "stats": { "dexterity_mult": 1.3 }, "prereqs": ["Augmented Targeting II"], "factions": ["KuaiGong International", "Blade Industries", "OmniTek Incorporated", "The Dark Army", "The Syndicate", "The Covenant"] }, { "name": "BrachiBlades", "price": 90000000, "rep": 12500, "stats": { "strength_mult": 1.15, "defense_mult": 1.15, "crime_money_mult": 1.15, "crime_success_mult": 1.1 }, "prereqs": [], "factions": ["The Syndicate"] }, { "name": "Artificial Synaptic Potentiation", "price": 80000000, "rep": 6250, "stats": { "hacking_exp_mult": 1.05, "hacking_chance_mult": 1.05, "hacking_speed_mult": 1.02 }, "prereqs": [], "factions": ["NiteSec", "The Black Hand"] }, { "name": "SmartSonar Implant", "price": 75000000, "rep": 22500, "stats": { "dexterity_mult": 1.1, "dexterity_exp_mult": 1.15, "crime_money_mult": 1.25 }, "prereqs": [], "factions": ["Slum Snakes"] }, { "name": "Cranial Signal Processors - Gen I", "price": 70000000, "rep": 10000, "stats": { "hacking_mult": 1.05, "hacking_speed_mult": 1.01 }, "prereqs": [], "factions": ["CyberSec"] }, { "name": "Combat Rib II", "price": 65000000, "rep": 18750, "stats": { "strength_mult": 1.14, "defense_mult": 1.14 }, "prereqs": ["Combat Rib I"], "factions": ["Volhaven", "KuaiGong International", "Blade Industries", "OmniTek Incorporated", "The Dark Army", "The Syndicate"] }, { "name": "Hacknet Node Core Direct-Neural Interface", "price": 60000000, "rep": 12500, "stats": { "hacknet_node_money_mult": 1.45 }, "prereqs": [], "factions": ["Netburners"] }, { "name": "Speech Processor Implant", "price": 50000000, "rep": 7500, "stats": { "charisma_mult": 1.2 }, "prereqs": [], "factions": ["Tian Di Hui", "Chongqing", "New Tokyo", "Ishima", "Sector-12", "Aevum", "Volhaven", "Silhouette"] }, { "name": "DermaForce Particle Barrier", "price": 50000000, "rep": 15000, "stats": { "defense_mult": 1.4 }, "prereqs": [], "factions": ["Volhaven"] }, { "name": "Neurotrainer II", "price": 45000000, "rep": 10000, "stats": { "hacking_exp_mult": 1.15, "strength_exp_mult": 1.15, "defense_exp_mult": 1.15, "dexterity_exp_mult": 1.15, "agility_exp_mult": 1.15, "charisma_exp_mult": 1.15 }, "prereqs": [], "factions": ["NiteSec", "BitRunners"] }, { "name": "HemoRecirculator", "price": 45000000, "rep": 10000, "stats": { "strength_mult": 1.08, "defense_mult": 1.08, "dexterity_mult": 1.08, "agility_mult": 1.08 }, "prereqs": [], "factions": ["Tetrads", "The Dark Army", "The Syndicate"] }, { "name": "Augmented Targeting II", "price": 42500000, "rep": 8750, "stats": { "dexterity_mult": 1.2 }, "prereqs": ["Augmented Targeting I"], "factions": ["Sector-12", "KuaiGong International", "Blade Industries", "OmniTek Incorporated", "The Dark Army", "The Syndicate"] }, { "name": "Hacknet Node Kernel Direct-Neural Interface", "price": 40000000, "rep": 7500, "stats": { "hacknet_node_money_mult": 1.25 }, "prereqs": [], "factions": ["Netburners"] }, { "name": "Social Negotiation Assistant (S.N.A)", "price": 30000000, "rep": 6250, "stats": { "company_rep_mult": 1.15, "faction_rep_mult": 1.15, "work_money_mult": 1.1 }, "prereqs": [], "factions": ["Tian Di Hui"] }, { "name": "INFRARET Enhancement", "price": 30000000, "rep": 7500, "stats": { "dexterity_mult": 1.1, "crime_money_mult": 1.1, "crime_success_mult": 1.25 }, "prereqs": [], "factions": ["Ishima"] }, { "name": "LuminCloaking-V2 Skin Implant", "price": 30000000, "rep": 5000, "stats": { "defense_mult": 1.1, "agility_mult": 1.1, "crime_money_mult": 1.25 }, "prereqs": ["LuminCloaking-V1 Skin Implant"], "factions": ["Slum Snakes", "Tetrads"] }, { "name": "Combat Rib I", "price": 23750000, "rep": 7500, "stats": { "strength_mult": 1.1, "defense_mult": 1.1 }, "prereqs": [], "factions": ["Ishima", "Volhaven", "KuaiGong International", "Blade Industries", "OmniTek Incorporated", "Slum Snakes", "The Dark Army", "The Syndicate"] }, { "name": "Nuoptimal Nootropic Injector Implant", "price": 20000000, "rep": 5000, "stats": { "company_rep_mult": 1.2 }, "prereqs": [], "factions": ["Tian Di Hui", "Chongqing", "New Tokyo", "Volhaven", "Four Sigma", "Bachman & Associates", "Clarke Incorporated"] }, { "name": "ADR-V1 Pheromone Gene", "price": 17500000, "rep": 3750, "stats": { "company_rep_mult": 1.1, "faction_rep_mult": 1.1 }, "prereqs": [], "factions": ["Tian Di Hui", "MegaCorp", "Four Sigma", "NWO", "The Syndicate"] }, { "name": "Augmented Targeting I", "price": 15000000, "rep": 5000, "stats": { "dexterity_mult": 1.1 }, "prereqs": [], "factions": ["Ishima", "Sector-12", "KuaiGong International", "Blade Industries", "OmniTek Incorporated", "Slum Snakes", "The Dark Army", "The Syndicate"] }, { "name": "Speech Enhancement", "price": 12500000, "rep": 2500, "stats": { "charisma_mult": 1.1, "company_rep_mult": 1.1 }, "prereqs": [], "factions": ["Tian Di Hui", "KuaiGong International", "Four Sigma", "Bachman & Associates", "Clarke Incorporated", "Speakers for the Dead"] }, { "name": "Hacknet Node CPU Architecture Neural-Upload", "price": 11000000, "rep": 3750, "stats": { "hacknet_node_money_mult": 1.15, "hacknet_node_purchase_cost_mult": 0.85 }, "prereqs": [], "factions": ["Netburners"] }, { "name": "BitWire", "price": 10000000, "rep": 3750, "stats": { "hacking_mult": 1.05 }, "prereqs": [], "factions": ["CyberSec", "NiteSec"] }, { "name": "Synaptic Enhancement Implant", "price": 7500000, "rep": 2000, "stats": { "hacking_speed_mult": 1.03 }, "prereqs": [], "factions": ["CyberSec", "Aevum"] }, { "name": "Hacknet Node Cache Architecture Neural-Upload", "price": 5500000, "rep": 2500, "stats": { "hacknet_node_money_mult": 1.1, "hacknet_node_level_cost_mult": 0.85 }, "prereqs": [], "factions": ["Netburners"] }, { "name": "LuminCloaking-V1 Skin Implant", "price": 5000000, "rep": 1500, "stats": { "agility_mult": 1.05, "crime_money_mult": 1.1 }, "prereqs": [], "factions": ["Slum Snakes", "Tetrads"] }, { "name": "Hacknet Node NIC Architecture Neural-Upload", "price": 4500000, "rep": 1875, "stats": { "hacknet_node_money_mult": 1.1, "hacknet_node_purchase_cost_mult": 0.9 }, "prereqs": [], "factions": ["Netburners"] }, { "name": "Neurotrainer I", "price": 4000000, "rep": 1000, "stats": { "hacking_exp_mult": 1.1, "strength_exp_mult": 1.1, "defense_exp_mult": 1.1, "dexterity_exp_mult": 1.1, "agility_exp_mult": 1.1, "charisma_exp_mult": 1.1 }, "prereqs": [], "factions": ["CyberSec", "Aevum"] }
	, { "name": "Wired Reflexes", "price": 2500000, "rep": 1250, "stats": { "dexterity_mult": 1.05, "agility_mult": 1.05 }, "prereqs": [], "factions": ["Tian Di Hui", "Ishima", "Sector-12", "Aevum", "Volhaven", "Slum Snakes", "Speakers for the Dead", "The Dark Army", "The Syndicate"] }, { "name": "NutriGen Implant", "price": 2500000, "rep": 6250, "stats": { "strength_exp_mult": 1.2, "defense_exp_mult": 1.2, "dexterity_exp_mult": 1.2, "agility_exp_mult": 1.2 }, "prereqs": [], "factions": ["New Tokyo"] }, { "name": "NeuroFlux Governor", "price": 750000, "rep": 500, "stats": { "hacking_mult": 1.01, "strength_mult": 1.01, "defense_mult": 1.01, "dexterity_mult": 1.01, "agility_mult": 1.01, "charisma_mult": 1.01, "hacking_exp_mult": 1.01, "strength_exp_mult": 1.01, "defense_exp_mult": 1.01, "dexterity_exp_mult": 1.01, "agility_exp_mult": 1.01, "charisma_exp_mult": 1.01, "hacking_chance_mult": 1.01, "hacking_speed_mult": 1.01, "hacking_money_mult": 1.01, "hacking_grow_mult": 1.01, "company_rep_mult": 1.01, "faction_rep_mult": 1.01, "crime_money_mult": 1.01, "crime_success_mult": 1.01, "work_money_mult": 1.01, "hacknet_node_money_mult": 1.01, "hacknet_node_purchase_cost_mult": 0.99, "hacknet_node_ram_cost_mult": 0.99, "hacknet_node_core_cost_mult": 0.99, "hacknet_node_level_cost_mult": 0.99 }, "prereqs": [], "factions": ["CyberSec", "Tian Di Hui", "Netburners", "NiteSec", "The Black Hand", "BitRunners", "Chongqing", "New Tokyo", "Ishima", "Sector-12", "Aevum", "Volhaven", "ECorp", "MegaCorp", "KuaiGong International", "Four Sigma", "NWO", "Blade Industries", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated", "Fulcrum Secret Technologies", "Slum Snakes", "Tetrads", "Silhouette", "Speakers for the Dead", "The Dark Army", "The Syndicate", "The Covenant", "Daedalus", "Illuminati"] }, { "name": "The Red Pill", "price": 0, "rep": 2500000, "stats": {}, "prereqs": [], "factions": ["Daedalus"] }];

export function gAugmentationFactions(aug) { return gAugmentDetails(aug) ? gAugmentDetails(aug).factions : []; }
export function gAugmentationPrereqs(aug) { return gAugmentDetails(aug) ? gAugmentDetails(aug).prereqs : []; }
export function gAugmentationStats(aug) { return gAugmentDetails(aug) ? gAugmentDetails(aug).stats : []; }
export function gAugmentationPrice(aug) { return gAugmentDetails(aug) ? gAugmentDetails(aug).price : -1; }
export function gAugmentationRepReq(aug) { return gAugmentDetails(aug) ? gAugmentDetails(aug).rep : -1; }
export function gAugmentDetails(aug) {
	augDets = augmentDetails.filter(a => a.name == aug);
	return augDets.length > 0 ? augDets[0] : null;
}
export function gAugmentationsFromFaction(faction) {
	facDets = augmentsByFaction.filter(a => a.faction == faction);
	return facDets.length > 0 ? facDets[0].augments : [];
}
export function gNeededAugmentations(hasAugs = Math.asd ? Math.asd.hasAugs : []) {
	const augList = [];
	for (const aug of augmentDetails) {
		if (!hasAugs.includes(aug.name)) { augList.push(aug); }
	}
	return augList;
}
export function gNeededFactions(hasAugs) { //returns which factions still have augs to purchase
	const facList = [];
	for (const aug of augmentDetails) {
		if (!hasAugs.includes(aug.name)) {
			for (const fac of aug.factions) { if (!facList.includes(fac)) { facList.push(fac); } }
		}
	}
	return facList;
}

// ====================================
// === better, no cost formulas.exe ===
// ====================================
// Note: don't need to pass getServer and getPlayer objects,
//  as long as the passed object has the necessary properties.
// ex: hAnalyze({minDifficulty:10, hackDifficulty:20, requiredHackingSkill:100}, {hacking:104, hacking_money_mult:1.1})
//   should work perfectly fine

// ToDo:
//returns the grow ratio for a given threads count
export function gAnalyzeAmt() { }

export function getHTime(server, player = Math.asd.player, difficulty = -1) { //target, server or server name
	if (difficulty <= 0) { difficulty = server.minDifficulty; }
	const difficultyMult = server.requiredHackingSkill * difficulty;

	const baseDiff = 500;
	const baseSkill = 50;
	const diffFactor = 2.5;
	const skillFactor = (diffFactor * difficultyMult + baseDiff) / (player.hacking + baseSkill);

	const hackTimeMultiplier = 5;
	const hackingTime = (hackTimeMultiplier * skillFactor) /
		(player.hacking_speed_mult * calculateIntelligenceMult(player.intelligence, 1));
	return hackingTime * 1000;
}

export function getGTime(target, player = Math.asd.player, difficulty = -1) {
	const growTimeMultiplier = 3.2; // Relative to hacking time. 16/5 = 3.2
	return growTimeMultiplier * getHTime(target, player, difficulty);
}

export function getWTime(target, player = Math.asd.player, difficulty = -1) {
	const weakenTimeMultiplier = 4; // Relative to hacking time
	return weakenTimeMultiplier * getHTime(target, player, difficulty);
}

export function hAnalyzeChance(server, player = Math.asd.player, difficulty = -1) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const hackFactor = 1.75;
	const difficultyMult = (100 - difficulty) / 100;
	const skillMult = hackFactor * player.hacking;
	const skillChance = (skillMult - server.requiredHackingSkill) / skillMult;
	const chance = skillChance * difficultyMult * player.hacking_chance_mult
		* calculateIntelligenceMult(player.intelligence, 1);
	if (chance > 1) { return 1; }
	if (chance < 0) { return 0; }

	return chance;
}

// returns decimal percentage stolen by ONE hack thread
export function hAnalyze(server, player = Math.asd.player, difficulty = -1) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const balanceFactor = 240;

	const difficultyMult = (100 - difficulty) / 100;
	const skillMult = (player.hacking - (server.requiredHackingSkill - 1)
	)
		/ player.hacking;
	const percentMoneyHacked = (difficultyMult * skillMult * player.hacking_money_mult * ((Math.asd && Math.asd.BitNodeMultipliers) ? (Math.asd.BitNodeMultipliers.ScriptHackMoney ?? 1.0) : 1.0)) / balanceFactor;
	if (percentMoneyHacked < 0) { return 0.0; }
	if (percentMoneyHacked > 1) { return 1.0; }

	return percentMoneyHacked;
}

// returns actual dollars stolen by ONE hack thread
//useMax = true: gets value based on server's MaxMoney
//useMax = false: gets value based on server's AvailableMoney
export function hAnalyzeValue(server, player = Math.asd.player, difficulty = -1, useMax = true) {
	const hAmt = hAnalyze(server, player, difficulty);
	const money = useMax ? server.moneyMax : server.moneyAvailable;
	return hAmt * money;
}

// returns amt of security reduced by a weaken with x threads
export function wAnalyze(threads, cores) {
	const CONSTANTSServerWeakenAmount = 0.05;
	return CONSTANTSServerWeakenAmount * threads * coreMult(cores);
}

// returns amt of security increased by a grow with x threads
export function gAnalyzeSecurity(threads) {
	const CONSTANTSServerFortifyAmount = 0.002;
	return 2 * CONSTANTSServerFortifyAmount * threads;
}

// returns amt of security reduced by a hack with x threads
export function hAnalyzeSecurity(threads) {
	const CONSTANTSServerFortifyAmount = 0.002;
	return CONSTANTSServerFortifyAmount * threads;
}

// helper function for getting multiplier to Weaken and Grow effectiveness
export function coreMult(cores) { return (1.0 + (cores - 1.0) / 16.0); }

// helper function for getting multiplier to hack time and chance
export function calculateIntelligenceMult(intelligence, weight = 1) {
	return 1 + (weight * Math.pow(intelligence, 0.8)) / 600;
}

/*
gAnalyze (and gAnalyzeLost) are reverse engineered from
	function calculateServerGrowth(server: Server, threads: number, p: IPlayer, cores = 1): number
	(and related functions/constants)

which grows a server with the following formula
GM: Growth Multiplier (avail money * GM = new money)
B: base = Math.min(CONSTANTS.ServerMaxGrowthRate, (1 + (CONSTANTS.ServerBaseGrowthRate - 1) / server.hackDifficulty)
  (known for a given server at a given security)
TM: Thread Multiplier = (server.serverGrowth / 100) * p.hacking_grow_mult * (1 + (cores - 1) / 16) * BitNodeMultipliers.ServerGrowthRate
  (known for a given serverGrowth AND given Player Hack Skill AND given Core Count AND a given BitNodeMultiplier)

GM = Base ^ ( threads * TM)
Threads * TM = log (base Base) of GM // definition of log
Threads = log (base Base) of GM / TM // isolate threads (value we want)
Threads = log (GM / TM) / log (Base) // Log change of base rule (from log base "Base" to log base 10)
*/
//for those with bitnode stuff, you can use the following line if desired
//BitNodeMultipliersServerGrowthRate = ns.getBitNodeMultipliers().BitNodeMultipliers.ServerGrowthRate;
//cores is the # of cores of the ATTACKING (not target) server (where grow() is being run)
//capGrowMult false (default) = return threads for provided growth
//capGrowMult true = return threads for provided growth OR needed for growth to max money on provided server
//  whichever is less
export function gAnalyze(server, player = Math.asd.player, growth, difficulty = -1, cores = 1, capGrowMult = false) {
	if (difficulty < 0) { difficulty = server.minDifficulty; } // Assume min security
	else if (difficulty == 0) { difficulty = server.hackDifficulty; } // Use current security

	const fullGrow = Math.max(1.0, (server.moneyMax / server.moneyAvailable)); // grow multiplier needed to Max Money - must be >= 1
	const growthMultiplier = capGrowMult ? Math.min(growth, fullGrow) : growth; //if capMult, then cap growth to maxMoney

	const CONSTANTSServerBaseGrowthRate = 1.03;
	const CONSTANTSServerMaxGrowthRate = 1.0035;
	const adjGrowthRate = (1 + (CONSTANTSServerBaseGrowthRate - 1) / difficulty); // adj exponential base for security
	const exponentialBase = Math.min(adjGrowthRate, CONSTANTSServerMaxGrowthRate) //cap growth rate

	const serverGrowthPercentage = server.serverGrowth / 100.0;
	const coreMultiplier = coreMult(cores);
	const threadMultiplier = serverGrowthPercentage * player.hacking_grow_mult * coreMultiplier * (Math.asd.BitNodeMultipliers ? (Math.asd.BitNodeMultipliers.ServerGrowthRate ?? 1) : 1); //total of all grow thread multipliers

	const cycles = Math.log(growthMultiplier) / (Math.log(exponentialBase)) / threadMultiplier;
	return cycles;
}
export function gAnalyzeLost(server, player = Math.asd.player, hackAmt, difficulty = -1.0, cores = 1, capGrowMult = false) {
	const growth = 1 / (1 - Math.min(0.9999, hackAmt));
	return gAnalyze(server, player, growth, difficulty, cores, capGrowMult);
}

// UNTESTED - USE CAREFULLY (might trigger static ram warning)
//use any ns function without mem cost
// to do so, hide the function name (ex: 'get' + 'server', 'ns', 'home')
function func(functionName, context, args = '') {
	var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	return context[func].apply(context, args);
}

/*
Vestigual main...
export async function main(ns) {

}
*/
scan.js  (7.75)
/** @param {NS} ns **/
let facServers = {
	"CSEC": "yellow",
	"avmnite-02h": "yellow",
	"I.I.I.I": "yellow",
	"run4theh111z": "yellow",
	"The-Cave": "orange",
	"w0r1d_d43m0n": "red"
};

let svObj = (name = 'home', depth = 0) => ({ name: name, depth: depth });
export function getServers(ns) {
	let result = [];
	let visited = { 'home': 0 };
	let queue = Object.keys(visited);
	let name;
	while ((name = queue.pop())) {
		let depth = visited[name];
		result.push(svObj(name, depth));
		let scanRes = ns.scan(name);
		for (let i = scanRes.length; i >= 0; i--) {
			if (visited[scanRes[i]] === undefined) {
				queue.push(scanRes[i]);
				visited[scanRes[i]] = depth + 1;
			}
		}
	}
	return result;
}

export async function main(ns) {
	let output = "Network:";

	getServers(ns).forEach(server => {
		let name = server.name;
		let hackColor = ns.hasRootAccess(name) ? "lime" : "red";
		let nameColor = facServers[name] ? facServers[name] : "white";

		let hoverText = ["Req Level: ", ns.getServerRequiredHackingLevel(name),
			"&#10;Req Ports: ", ns.getServerNumPortsRequired(name),
			"&#10;Memory: ", ns.getServerRam(name)[0], "GB",
			"&#10;Security: ", ns.getServerSecurityLevel(name),
			"/", ns.getServerMinSecurityLevel(name),
			"&#10;Money: ", Math.round(ns.getServerMoneyAvailable(name)).toLocaleString(), " (",
			Math.round(100 * ns.getServerMoneyAvailable(name) / ns.getServerMaxMoney(name)), "%)"
		].join("");

		let ctText = "";
		ns.ls(name, ".cct").forEach(ctName => {
			ctText += ["<a title='", ctName,
				//Comment out the next line to reduce footprint by 5 GB
				"&#10;", ns.codingcontract.getContractType(ctName, name),
				"'>©</a>"].join("");
		});

		output += ["<br>", "---".repeat(server.depth),
			`<font color=${hackColor}>■ </font>`,
			`<a class='scan-analyze-link' title='${hoverText}''

            onClick="(function()
            {
                const terminalInput = document.getElementById('terminal-input');
                terminalInput.value='home; run connect.js ${name}';
                const handler = Object.keys(terminalInput)[1];
                terminalInput[handler].onChange({target:terminalInput});
                terminalInput[handler].onKeyDown({keyCode:13,preventDefault:()=>null});
            })();"
        
            style='color:${nameColor}'>${name}</a> `,
			`<font color='fuchisa'>${ctText}</font>`,
		].join("");
	});

	const list = Math.doc.getElementById("terminal");
	list.insertAdjacentHTML('beforeend', output);
}
sendem.js  (2.20)
/** @param {NS} ns **/
const sFiles = ['_hack.js', '_grow.js', '_weak.js', 'fixem.js', '04_manualhack.js'];
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
			await ns.sleep(1);
			await ns.scp(sFile, 'home', tar);
		}
	}
}
test.js  (1.60)
/** @param {NS} ns **/
import * as nt from "notns.js";

let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd=Math.asd; //if port's not empty, populate asd

	ns.disableLog('scan');
	ns.disableLog('sleep');
	ns.clearLog();

	asd.realbT = 12;
//	ns.print(ns.gang.getGangInformation().territory)


	//await ns.writePort(20,10);
//	const ph = ns.getPortHandle(20);
//	ph.length = function() {return this.data.length;}
//	ns.print(ph.length);

/*
	let gangTasks = [];
	let gangCTasks = [];
	let gangHTasks = [];
	let gangTaskInfo = [];
	let gangCTaskInfo = [];
	let gangHTaskInfo = [];

	for (const task of ns.gang.getTaskNames()) {
		const dat = ns.gang.getTaskStats(task);
		gangTasks.push(dat.name); gangTaskInfo.push(dat);
		if (dat.isCombat) {gangCTasks.push(dat.name);gangCTaskInfo.push(dat);}
		if (dat.isHacking) {gangHTasks.push(dat.name);gangHTaskInfo.push(dat);}
	}
	ns.print(gangTasks);
	ns.print(gangCTasks);
	ns.print(gangHTasks);
	ns.print(gangTaskInfo);
	ns.print(gangCTaskInfo);
	ns.print(gangHTaskInfo);

	let gangEquipment = [];
	for (const item of ns.gang.getEquipmentNames()) {
		let equip = {};
		equip.name = item;
		equip.type = ns.gang.getEquipmentType(item);
		equip.stats = ns.gang.getEquipmentStats(item);
		gangEquipment.push(equip);
	}
	ns.print(gangEquipment);
*/	

/*
	const pid = ns.exec('_weak.js','home',1,'phantasy',Math.random(), 1, false);
	const cL = 0;
	await ns.sleep(500);
//	const pid = 0;
while(true) {
	await ns.sleep(1)
	const rs = ns.getRunningScript(pid);
//	ns.print(rs);
//	if (!rs) { return false; }
	let string = '';
	for (const log of rs.logs) {
		if (log.includes('Execut')) {
			string = log.substring(log.indexOf(' in ') + 4, log.indexOf('(t=') - 1);
			break;
		}
	}
//	ns.print(string);
//	if (string == '') { return false; }
	const ms = nt.toms(string);
ns.clearLog();
	ns.print(ms - rs.onlineRunningTime * 1000 - cL);
	//	if (ms - hT - 2*cL > 0) { return false; } //hack created during really highsec, clear it... so that the queue doesn't get stuck
}
*/
//	ns.print(Object.keys(this.main));
//	ns.print(this);

/*
	const host = 'lexo-corp';
	const threads = 100;
	let cores = 15;
	const growthMultiplier = 2;
	const hackAmt = 0.5;
	
	let player = ns.getPlayer();
	let tardat = ns.getServer(host);
	let srcdat = ns.getServer('home');

//	ns.print(player.hacking_money_mult);

	let nsdat = {};
	nsdat.sW = ns.weakenAnalyze(threads, cores); //returns amt weakened by this number of threads
	nsdat.sG = ns.growthAnalyzeSecurity(threads); // sec increase for hack of size threads
	nsdat.sH = ns.hackAnalyzeSecurity(threads); // sec increase for hack of size threads
	nsdat.nG = ns.growthAnalyze(host, growthMultiplier, cores); //returns number of threads needed
	nsdat.aH = ns.hackAnalyze(host); //percent of money stolen per hack thread
	nsdat.cH = ns.hackAnalyzeChance(host); //Chance of success (only matters for valuation)
	nsdat.tW = ns.getWeakenTime(host); //Time in ms to complete
	nsdat.tG = ns.getGrowTime(host); //Time in ms to complete
	nsdat.tH = ns.getHackTime(host); //Time in ms to complete

	let ntdat = {};
	ntdat.sW = nt.wAnalyze(threads, cores); //returns amt weakened by this number of threads
	ntdat.sG = nt.gAnalyzeSecurity(threads); // sec increase for hack of size threads
	ntdat.sH = nt.hAnalyzeSecurity(threads); // sec increase for hack of size threads
	ntdat.nG = nt.gAnalyze(tardat, player, growthMultiplier, -1, cores); //returns number of threads needed
	ntdat.nGha = nt.gAnalyzeLost(tardat, player, hackAmt, -1, cores); //returns number of threads needed
	ntdat.aH = nt.hAnalyze(tardat, player); //percent of money stolen per hack thread
	ntdat.cH = nt.hAnalyzeChance(tardat, player); //Chance of success (only matters for valuation)
	ntdat.tW = nt.getWTime(tardat, player); //Time in ms to complete
	ntdat.tG = nt.getGTime(tardat, player); //Time in ms to complete
	ntdat.tH = nt.getHTime(tardat, player); //Time in ms to complete

//	ns.print (nsdat);
//	ns.print ('-----');
//	ns.print (ntdat);

	ns.print(asd.bests[0]);
*/
}
watchbests.js  (1.60)
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
