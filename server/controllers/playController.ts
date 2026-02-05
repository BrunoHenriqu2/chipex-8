import type { expressReq, expressRes } from "../types/expressTypes.js";
import stringQuery from "../query/stringQuery.js";
import path from "path"
import fs from "fs"

const __dirname = import.meta.dirname

export async function playGame(req: expressReq, res: expressRes) {
    try {
        const id = req.params.id ?? ""
        const romsPath = path.resolve(process.cwd(), "public", "roms")
        let romPath
        //console.log(id, rom)
        
        if (!romPath) {
            return res.redirect(301, "/" + stringQuery(
                { rejectionReason: "no_rom_found" }
            ))
        }

        res.status(200).sendFile(path.join(path.dirname(__dirname), "views", "play.html"))
    } catch (msg) {
        // console.log(msg)
        // console.log(typeof msg)
        res.status(400).json(String(msg))
    }
}
