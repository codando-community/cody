const instance = require('../../../database');
const informationErrorMessage = (
  '\nerro: você esqueceu da **informação**, tente:' +
  '\nread [--discord, --email, --ra, --id] "**informação**"' +
  '\nread --ra "12345678"'
)

const ParameterErrorMessage = (
  '\nerro: parâmetro não encontrado, tente:' +
  '\nread [--discord, --email, --ra, --id] "informação"' +
  '\nread --ra "12345678"'
)

module.exports = (msg) => {
  const parameter = msg.content.toLowerCase().split(' ')[1]
  const value = msg.content.split('"')[1]

  if (!value && parameter && parameter !== '--' && parameter.indexOf('--') !== -1) {
    msg.reply(informationErrorMessage)

  } else if (parameter === '--') {
    msg.reply(ParameterErrorMessage)

  } else if (value && parameter && parameter.indexOf('--') !== -1) {
    const Select = selectObject => {
      instance
        .select(selectObject)
        .then(result => {
          const { name, university, campus, course, registration, date_of_birth, contact, type } = result[0]

          msg.reply(
            `\nNome: ${name}` +
            `\nEmail: ${contact.email}` +
            `\nTelefone: ${contact.cell_phone}` +
            `\nData de nascimento: ${date_of_birth}` +
            `\n\nUniversidade: ${university}` +
            `\nCampus: ${campus}` +
            `\nCurso: ${course}` +
            `\nR.A: ${registration}` +
            `\nCargo: ${type}` +
            `\n\nDiscord: ${contact.discord}` +
            `\nDiscord ID: ${contact.id_discord}`
          )
        })
        .catch(() => msg.reply('Aluno não encontrado.'));
    };

    switch (parameter) {
      case '--email':
        Select({ contact: { email: value.trim() } })
        break;

      case '--ra':
        Select({ registration: Number(value.trim()) })
        break;

      case '--discord':
        Select({ contact: { discord: value.trim() } })
        break;

      case '--id':
        Select({ contact: { id_discord: value.trim() } })
        break;

      default:
        msg.reply(ParameterErrorMessage);
        break;
    }
  }
}