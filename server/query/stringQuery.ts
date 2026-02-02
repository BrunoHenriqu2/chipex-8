import type { queryStringObject } from "../types/queryTypes.js"

export default function (obj: queryStringObject) {
    let string = "?", i = 0
    for (const [name, value] of Object.entries(obj)) {
        i++
        string = `${string}${name}=${value}`
        console.log(Object.keys(obj).length, i)
        if (i < Object.keys(obj).length) {
            string += "&"
        }
    }
    return string
}