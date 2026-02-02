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
            fetch("/games").then(data => {
                const json = await data.json()

                const newRom = customRomDiv.cloneNode()
                newRom.id = json.name
            })
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