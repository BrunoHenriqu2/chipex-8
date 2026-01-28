const log = function(message: string) {
    console.log(message)
    return JSON.stringify({message})
}

export default {
    noCanvas: log("No canvas detected!"),
}