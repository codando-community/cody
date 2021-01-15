const instance = require('../../../database');

module.exports = (msg) => {
  const parameter = msg.content.toLowerCase().split(' ')[1]
  const value = msg.content.split('"')[1].trim()

  const Select = selectObject => {
    instance
      .select(selectObject)
      .then(result => {
        const { name, university, campus, registration, date_of_birth, contact, type } = result[0]

        msg.reply(
          `Nome: ${name}`+
          `\nUniversidade: ${university}`+
          `\nCampus: ${campus}`+
          `\nEmail: ${contact.email}`+
          `\nR.A: ${registration}`+
          `\nCargo: ${type}`+
          `\nTelefone: ${contact.cell_phone}`+
          `\nDiscord: ${contact.discord}`+
          `\nData de nascimento: ${date_of_birth}`
        )
      })
      .catch((err) => {
        msg.reply("Aluno não encontrado.");
      });
  };

  switch (parameter) {
    case '--email':
      Select({contact: {email: value}})
      break;

    case '--ra':
      Select({registration: Number(value)})
      break;

    case '--discord':
      Select({contact: {discord: value}})
      break;

    default:
      msg.reply(
        'erro: parâmetro não encontrado, tente:' +
        '\nread [--discord, --email, --ra] "informação"' +
        '\nread --ra "12345678"'
      );
      break;
  }
}