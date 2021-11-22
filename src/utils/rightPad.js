
/**
 * Preechimento de string com caracteres a direita do texto original
 * @param {string} text texto a ser concatenado
 * @param {number} totalWidth comprimento da string final
 * @param {string} paddingChar caractere utilizado no preenchimento
 * @returns
 */
function rightPad(text, totalWidth, paddingChar = ' ') {
  var length = totalWidth - text.toString().length + 1;
  return text + Array(length).join(paddingChar);
}

module.exports = rightPad