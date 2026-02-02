export interface queryStringObject {
    reason: string,
    status: boolean
}

export default function (obj: queryStringObject) {
    let string = "?"
    let i = 0
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