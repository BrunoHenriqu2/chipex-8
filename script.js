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
        navButton: document.querySelector("#chipex-nav-button")
    },

    actions () {
        this.ui.navButton.addEventListener("click", () => {

        })
    },

    init() {
        this.actions()
    },

    abort() {

    }
}