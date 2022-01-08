/** @param {NS} ns **/
//constants and helper functions for Drak's Masterhacker serries of scripts

export const HomeReserveMax = 100; //max amt of ram to keep free at home
export const HomeReserveMin = 10; //min amt of ram to keep free at home
export const HomeReservePortion = 0.10; //decimal% of home's ram to reserve, bounded by above
// MasterScripts will generally attempt to reserve a HomeReservePortion of home's ram for processing scripts, bounced by the above

export const SmlRam = 0.10; //portion of home ram below which a server is not used for the main hacking scripts

export const NoticeInterval = 5 * 60 * 1000; //amount of time between notices (currently only backdoor notices)

//export const bestThresh = 1.10; //How much swapping targets has to be worth to bother
export const MaxAmt = 0.999; // max amount to steal per hack (decimal%) //lower helps maintain stability
export const MaxProcess = 8000; //Maximum allowed concurrent processes
export const BN = 1.10; //buffer threads extra grow and weaken threads to help keep stability
//const ProcPerbT = 10000; //how many processes before increasing bT
export const MinbT = 23;//MINIMUM buffer time betwwen calls in milliseconds (time between each hack, grow, weaken, landing) to ensure sequence is kept
// lower buffer = more hack grow pairs = more money (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money
export const RamUse = 0.95 // Amount of your total ram to allow profiles to build from
export const MaxTargets = 1; //Maximum number of servers to atatck - currently only works for one, do not change


/*
// vestigial main
export async function main(ns) {

}
*/
