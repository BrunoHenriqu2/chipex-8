import type { expressReq, expressRes } from "../types/expressTypes.js";
import path from "path"

const __dirname = import.meta.dirname

export async function playGame(req: expressReq, res: expressRes) {
    try {
        const id = req.params["id"]
        const rom = req.body.rom
        
        console.log(id, rom)
        if (!rom) { throw new Error("No rom received!") }
        
        res.status(200).sendFile(path.join(path.dirname(__dirname), "view", "play.html"))
    } catch (msg) {
        res.status(400).jsonp({msg})
    }
}
