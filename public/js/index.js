async function domReady () {
    return new Promise(resolve => {
        document.addEventListener("DOMContentLoaded", () => {
            resolve(true)
        })
    })
}

await domReady()

const dom = {
    ui: {
        chipexNav: document.querySelector("#chipex-nav"),
        chipexNavButton: document.querySelector("#chipex-nav-button")
    },

    actions () {
        this.ui.chipexNavButton.addEventListener("click", () => {
            if (!this.ui.chipexNav.classList.contains("chipex-nav-opened")) {
                this.ui.chipexNav.classList.add("chipex-nav-opened")
                
                return
            }

            this.ui.chipexNav.classList.remove("chipex-nav-opened")
        })
    },

    init() {
        this.actions()
    },

    abort() {

    }
}

dom.init()