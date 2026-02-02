import type { expressReq, expressRes } from "../types/expressTypes.js";
import stringQuery from "../query/stringQuery.js";
import path from "path"

const __dirname = import.meta.dirname

export async function playGame(req: expressReq, res: expressRes) {
    try {
        const id = req.params.id ?? undefined
        const rom = req.body?.rom ?? undefined

        //console.log(id, rom)
        //if (!rom) { throw new Error("No rom received!") }
        if (!rom) {
            res.redirect(301, "/" + stringQuery(
                { reason: "no_rom_received", status: false }
            ))
        }

        res.status(200).sendFile(path.join(path.dirname(__dirname), "views", "play.html"))
    } catch (msg) {
        console.log(msg)
        console.log(typeof msg)
        res.status(400).json(String(msg))
    }
}
