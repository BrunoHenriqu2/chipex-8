import * as safeOperation from "../shared/safeOperation.js"

const gamesJson = await safeOperation.retry(async () => {
    const res = await fetch("/games.json")

    if (!res.ok) {
        throw new Error(`HTTP Response: ${res.status}`)
    }

    return await res.json()
}, 5)

const dom = {
    _ui: {
        chipexNav: document.querySelector("#chipex-nav"),
        chipexNavButton: document.querySelector("#chipex-nav-button"),
        searchBar: document.querySelector("#search-bar"),
        searchInput: document.querySelector("#search-input"),
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
        this._ui.searchInput.addEventListener("input", (e) => {
            const currentValue = this._ui.searchInput.value
            const gameNodes = Array.from(this._ui.gamesLibrary.children)
            //console.log(gameNodes)

            //if (currentValue === "") {
            gameNodes.forEach(node => {
                node.classList.remove("game-hidden")
            })
            //return
            //}

            gameNodes.forEach(node => {
                if (node.id !== "custom-rom" && !node.innerHTML.toLowerCase().includes(currentValue.toLowerCase())) {
                    node.classList.add("game-hidden")
                }
            })
        })
    },

    _actions() {
        const loadGames = () => {
            gamesJson.forEach(game => {
                const newRom = this._ui.customRom.cloneNode(true)
                newRom.id = game.name

                const newRomButton = newRom.querySelector("button")
                newRomButton.title = game.name
                //newRomButton.style.backgroundImage = `url(${game.preview})`
                newRomButton.addEventListener("click", () => {
                    window.location.href = `/play/${game.name}`
                })

                const newRomImg = newRom.querySelector("img")
                newRomImg.src = game.preview

                const newRomSummary = newRomButton.querySelector("summary")
                newRomSummary.innerText = game.description

                const newRomFigCaption = newRomButton.querySelector("figcaption")
                newRomFigCaption.innerText = game.name

                this._ui.gamesLibrary.appendChild(newRom)
            })
        }

        const loadSearch = () => {

        }

        loadGames()
        loadSearch()
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