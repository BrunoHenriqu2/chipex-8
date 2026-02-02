import { Chip8 } from "./chip8.js";
import messages from "./messages.js"

const chip8 = new Chip8()

async function loadRom(url) {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    chip8.loadRom(buffer)
}

function render(canvas: HTMLCanvasElement) {
    if (!(canvas instanceof Node) || canvas.nodeName !== "CANVAS") {
        return messages.noCanvas
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) { return messages.noCanvasCtx }

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const scale = 10

    for (let y = 0; y < 32; y++) { // y
        for (let x = 0; x < 64; x++) { // x
            if (chip8.display[x + y * 64]) {
                ctx.fillStyle = "white"
                ctx.fillRect(x * scale, y * scale, scale, scale)
            }
        }
    }
}

function loop(canvas: HTMLCanvasElement) {
    for (let i = 0; i < 10; i++) {
        chip8.cycle()
    }

    if (chip8.drawFlag) {
        render(canvas)
        chip8.drawFlag = false
    }

    requestAnimationFrame(loop)
}

loadRom("./roms/ibm.ch8").then(() => loop())