/** @param {NS} ns **/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; } //if port's empty, initialize it
	asd = Math.asd; //if port's not empty, populate asd
	
	try { asd.BitNodeMultipliers = ns.getBitNodeMultipliers(); }
	catch {
		const bnm = {
			AgilityLevelMultiplier:1, // 	number 	Influences how quickly the player's agility level (not exp) scales
			AugmentationMoneyCost:1, // 	number 	Influences the base cost to purchase an augmentation.
			AugmentationRepCost:1, // 	number 	Influences the base rep the player must have with a faction to purchase an augmentation.
			BladeburnerRank:1, // 	number 	Influences how quickly the player can gain rank within Bladeburner.
			BladeburnerSkillCost:1, // 	number 	Influences the cost of skill levels from Bladeburner.
			CharismaLevelMultiplier:1, // 	number 	Influences how quickly the player's charisma level (not exp) scales
			ClassGymExpGain:1, // 	number 	Influences the experience gained for each ability when a player completes a class.
			CodingContractMoney:1, // 	number 	Influences the amount of money gained from completing Coding Contracts
			CompanyWorkExpGain:1, // 	number 	Influences the experience gained for each ability when the player completes working their job.
			CompanyWorkMoney:1, // 	number 	Influences how much money the player earns when completing working their job.
			CorporationValuation:1, // 	number 	Influences the valuation of corporations created by the player.
			CrimeExpGain:1, // 	number 	Influences the base experience gained for each ability when the player commits a crime.
			CrimeMoney:1, // 	number 	Influences the base money gained when the player commits a crime.
			DaedalusAugsRequirement:1, // 	number 	Influences how many Augmentations you need in order to get invited to the Daedalus faction
			DefenseLevelMultiplier:1, // 	number 	Influences how quickly the player's defense level (not exp) scales
			DexterityLevelMultiplier:1, // 	number 	Influences how quickly the player's dexterity level (not exp) scales
			FactionPassiveRepGain:1, // 	number 	Influences how much rep the player gains in each faction simply by being a member.
			FactionWorkExpGain:1, // 	number 	Influences the experience gained for each ability when the player completes work for a Faction.
			FactionWorkRepGain:1, // 	number 	Influences how much rep the player gains when performing work for a faction.
			FourSigmaMarketDataApiCost:1, // 	number 	Influences how much it costs to unlock the stock market's 4S Market Data API
			FourSigmaMarketDataCost:1, // 	number 	Influences how much it costs to unlock the stock market's 4S Market Data (NOT API)
			HackExpGain:1, // 	number 	Influences the experienced gained when hacking a server.
			HackingLevelMultiplier:1, // 	number 	Influences how quickly the player's hacking level (not experience) scales
			HacknetNodeMoney:1, // 	number 	Influences how much money is produced by Hacknet Nodes and the hash rate of Hacknet Servers (unlocked in BitNode-9)
			HomeComputerRamCost:1, // 	number 	Influences how much money it costs to upgrade your home computer's RAM
			InfiltrationMoney:1, // 	number 	Influences how much money is gained when the player infiltrates a company.
			InfiltrationRep:1, // 	number 	Influences how much rep the player can gain from factions when selling stolen documents and secrets
			ManualHackMoney:1, // 	number 	Influences how much money can be stolen from a server when the player performs a hack against it through the Terminal.
			PurchasedServerCost:1, // 	number 	Influence how much it costs to purchase a server
			PurchasedServerLimit:1, // 	number 	Influences the maximum number of purchased servers you can have
			PurchasedServerMaxRam:1, // 	number 	Influences the maximum allowed RAM for a purchased server
			RepToDonateToFaction:1, // 	number 	Influences the minimum favor the player must have with a faction before they can donate to gain rep.
			ScriptHackMoney:1, // 	number 	Influences how much money can be stolen from a server when a script performs a hack against it.
			ServerGrowthRate:1, // 	number 	Influences the growth percentage per cycle against a server.
			ServerMaxMoney:1, // 	number 	Influences the maxmimum money that a server can grow to.
			ServerStartingMoney:1, // 	number 	Influences the initial money that a server starts with.
			ServerStartingSecurity:1, // 	number 	Influences the initial security level (hackDifficulty) of a server.
			ServerWeakenRate:1, // 	number 	Influences the weaken amount per invocation against a server.
			StrengthLevelMultiplier:1, // 	number 	Influences how quickly the player's strength level (not exp) scales		
		}
		bnm = null;
		asd.BitNodeMultipliers = bnm;
	}
}
