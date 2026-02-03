import * as safeOperation from "./library/safeOperation.js"

const dom = {
    _ui: {
        chipexNav: document.querySelector("#chipex-nav"),
        chipexNavButton: document.querySelector("#chipex-nav-button"),
        customRom: document.querySelector("#custom-rom")
    },

    _events() {
        this._ui.chipexNavButton.addEventListener("click", () => {
            if (!this._ui.chipexNav.classList.contains("chipex-nav-opened")) {
                this._ui.chipexNav.classList.add("chipex-nav-opened")

                return
            }

            this._ui.chipexNav.classList.remove("chipex-nav-opened")
        })
    },

    _actions() {
        const loadGames = () => {
            const customRomDiv = document.querySelector("#custom-rom")
            const { sucess, result } = safeOperation.pcall(() => {
                throw new Error("teste")
            })
            console.log(sucess, result)
            safeOperation.retry(async () => {
                const res = await fetch("/games.jsona")

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`)
                }
                const gamesJson = res.json()
                console.log(gamesJson)
            }, 5)
        }

        loadGames()
    },

    init() {
        this._events()
        this._actions()
    },

    abort() {

    },

    ready() {
        return new Promise(resolve => {
            document.addEventListener("DOMContentLoaded", () => {
                resolve(true)
            }, { once: true })
        })
    }
}

dom.ready().then(dom.init())