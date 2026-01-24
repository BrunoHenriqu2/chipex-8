import express from "express"

const port = 8080
const expressApp = express()

//expressApp.use()

expressApp.listen(port, () => {console.log(`Escutando em ${port}`)})