/** @param {NS} ns **/
//constants and helper functions for Drak's Masterhacker serries of scripts

export const bestThresh = 1.10; //How much swapping targets has to be worth to bother
export const MaxAmt = 0.999; // max amount to steal per hack (decimal%) //lower helps maintain stability
export const MaxProcess = 8000; //Maximum allowed concurrent processes
export const BN = 1.10; //buffer threads extra grow and weaken threads to help keep stability
//const ProcPerbT = 10000; //how many processes before increasing bT
export const MinbT = 40;//MINIMUM buffer time betwwen calls in milliseconds (time between each hack, grow, weaken, landing) to ensure sequence is kept
// lower buffer = more hack grow pairs = more money (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money
export const RamUse = 0.99 // Amount of your total ram to allow profiles to build from
export const MaxTargets = 1; //Maximum number of servers to atatck - currently only works for one, do not change


/*
// vestigual main
export async function main(ns) {

}
*/
