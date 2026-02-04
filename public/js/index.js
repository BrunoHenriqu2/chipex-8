import * as safeOperation from "./library/safeOperation.js"

const dom = {
    _ui: {
        chipexNav: document.querySelector("#chipex-nav"),
        chipexNavButton: document.querySelector("#chipex-nav-button"),
        games: document.querySelector("#games"),
        gamesLibrary: document.querySelector("#games-library"),
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
            // const { sucess, result } = safeOperation.pcall(() => {
            //     throw new Error("teste")
            // })
            // console.log(sucess, result)
            safeOperation.retry(async () => {
                const res = await fetch("/games.json")
                
                if (!res.ok) {
                    throw new Error(`HTTP Response: ${res.status}`)
                }

                const gamesJson = await res.json()
                console.log(gamesJson)

                gamesJson.forEach(game => {
                    const newRom = this._ui.customRom.cloneNode(true)
                    newRom.id = game.name
                    
                    const newRomButton = newRom.querySelector("button")
                    newRomButton.title = game.name
                    //newRomButton.style.backgroundImage = `url(${game.preview})`

                    const newRomImg = newRom.querySelector("img")
                    newRomImg.src = game.preview

                    const newRomSummary = newRomButton.querySelector("summary")
                    newRomSummary.innerText = game.description

                    const newRomFigCaption = newRomButton.querySelector("figcaption")
                    newRomFigCaption.innerText = game.name

                    this._ui.gamesLibrary.appendChild(newRom)
                })
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