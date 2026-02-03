import express from "express"
import routesLoader from "./routes/routesLoader.js"

const port = 8080
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.static("public"))
routesLoader(expressApp)

expressApp.listen(port, (err) => {
    console.log(`Escutando em ${port}`)
})