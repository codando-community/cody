const Memes = require('./memes')
const Avisos = require('./avisos')

module.exports = client => {
    Memes(client)
    Avisos(client)
}