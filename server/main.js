import express from "express"
import routesLoader from "./routes/routesLoader.js"
import path from "node:path"

const __dirname = import.meta.dirname // REMEMBER: `__dirname` is always the parentFolder, so in this case `__dirname = ./server...`

const port = 8080 // I love this port
const expressApp = express()

expressApp.use(express.json())
expressApp.use("/", express.static(`${path.dirname(__dirname)}/public`)) // Main public route
expressApp.use("/shared", express.static(`${path.dirname(__dirname)}/shared`)) // I also have this route, similar to a `ReplicatedStorage` (roblox ref lol).
routesLoader(expressApp)

expressApp.listen(port, (err) => {
    console.log(`Listening on ${port}`)
})