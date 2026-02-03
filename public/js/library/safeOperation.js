export function pcall(f) {
    if (typeof f !== "function") { return console.log("\"f\" must be valid!") }

    let sucess, result = undefined

    try {
        sucess = true
        result = f()
    } catch (err) {
        sucess = false
        result = err
    }

    return { sucess, result }
}

export async function retry(f, times) {
    const _times = times || 1

    if (typeof f !== "function") { return console.log("\"f\" must be valid!") }

    let { sucess, result } = pcall(await f)

    if (!sucess) {
        for (let attempts = 0; attempts < _times; attempts++) {
            if (sucess) { break }
            console.log(`Trying more ${_times - attempts} times`)
            sucess, result = pcall(await f)
        }
    }

    return result
}