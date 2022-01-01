/** @param {NS} ns **/
//args: target, manipulateTix, uid
export async function main(ns) {
    const target = (ns.args && ns.args.length > 0) ? ns.args[0] : '';
    const tix = (ns.args && ns.args.length > 1) ? ns.args[1] : false;
    if (target!='') { await ns.hack(target, {stock: tix}); }
}