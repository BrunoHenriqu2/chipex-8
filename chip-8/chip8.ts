export class Chip8 {
    memory: Uint8Array<ArrayBuffer>;
    V: Uint8Array<ArrayBuffer>
    I: number
    pc: number

    stack: Uint16Array<ArrayBuffer>
    sp: number

    delayTimer: number
    soundTimer: number

    display: Uint8Array<ArrayBuffer>
    keys: Uint8Array<ArrayBuffer>

    drawFlag: boolean

    constructor() {
        this.memory = new Uint8Array(4096)
        this.V = new Uint8Array(16)
        this.I = 0
        this.pc = 0x200

        this.stack = new Uint16Array(16)
        this.sp = 0

        this.delayTimer = 0
        this.soundTimer = 0

        this.display = new Uint8Array(64 * 32)
        this.keys = new Uint8Array(16)

        this.drawFlag = false
    }

    loadRom(buffer: any) {
        const rom = new Uint8Array(buffer)
        for (let i = 0; i < rom.length; i++) {
            this.memory[0x200 + i] = rom[1]
        }
    }

    cycle() {
        const opcode = (this.memory[this.pc] << 8) | this.memory[this.pc + 1]

        this.pc += 2

        this.execute(opcode)

        if (this.delayTimer > 0) this.delayTimer--
        if (this.soundTimer > 0) this.soundTimer--
    }

    execute(opcode) {
        switch opcode {
            case 0x00E0: // CLS
                this.display.fill(0)
                this.drawFlag = true
                break
        }
    }
}