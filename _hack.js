/** @param {NS} ns **/
//args: target, uid, threads, manipulateTix
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args.length > 2) {
            await ns.hack(ns.args[0], {threads: ns.args[2], stock: ns.args[3]??false});
        } else { await ns.hack(ns.args[0]); }
    }
}
