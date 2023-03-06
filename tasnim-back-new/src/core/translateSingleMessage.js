module.exports =  function translateSingleMessage(message, req) {
    Object.keys(req.polyglot.phrases).forEach(phrase => {
        if (phrase == message) {
            message = req.polyglot.t(phrase)
        }
    })
    return message
}