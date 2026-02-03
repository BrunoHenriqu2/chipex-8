import type { expressApp } from "../types/expressTypes.js";
import fs from "fs"
import path from "path"

const __dirname = import.meta.dirname

export default function (app: expressApp) {
    const scripts = fs.readdirSync(__dirname)
        .filter(arch => !arch.startsWith("routes"))
    console.log(scripts)
    
    scripts.forEach(script => {
        const fullScriptPath = path.join(__dirname, script)
        const scriptUrl = new URL(`file://${fullScriptPath}`).href
        import(scriptUrl).then(route => route.default(app)) 
    })
}