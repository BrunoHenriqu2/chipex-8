import express from "express"
import type { expressApp } from "../types/expressTypes.js"
import { playGame } from "../controllers/playController.js"

export default function (app: expressApp) {
    app.use(express.json())
    app.get("/play:id", playGame)
}