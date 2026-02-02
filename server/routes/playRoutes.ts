import type { expressApp } from "../types/expressTypes.js"
import { playGame } from "../controllers/playController.js"

export default function (app: expressApp) {
    app.get("/play/:id", playGame)
}