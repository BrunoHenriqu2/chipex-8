import type { expressReq, expressRes } from "../types/expressTypes.js";
import stringQuery from "../query/stringQuery.js";
import path from "path"

const __dirname = import.meta.dirname

export async function playGame(req: expressReq, res: expressRes) {
    try {
        const id = req.params.id ?? undefined
        let rom
        //console.log(id, rom)
        
        try {
            const res = await fetch(`/roms/${id}.ch8`)
            if (!res.ok) {
                throw new Error("No rom found!") 
            }
            rom = await res.arrayBuffer()
        } catch (err) {
            console.log(err)
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
