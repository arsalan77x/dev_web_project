const Polyglot = require('node-polyglot')
const { messages } =require('./i18n') 

module.exports= async function whichLangMiddleware(req, res, next){
    // Get the locale from express-locale
    const locale = req.locale.language

    // Start Polyglot and add it to the req
    res.langs = new Polyglot()

    // Decide which phrases for polyglot will be used
    if (locale == 'fr') {
        res.langs.extend(messages.fr)
    } else {
        res.langs.extend(messages.en)
    }

    next()
}