const instance = require('../../../database');

module.exports = (msg) => {
  const paramValue = msg.content.toLowerCase().split(' ')[2]
  paramValue.replace('"', '').trim()

  const Select = selectObject => {
    instance
      .select({
        contact: selectObject
      })
      .then(result => {
        const { name, university, campus, email, registration, cell_phone, date_of_birth } = result[0]

        msg.reply(
          `Nome: ${name}` +
          `\nUniversidade: ${university}`+
          `\nCampus: ${campus}`+
          `\nEmail: ${email}`+
          `\nR.A: ${registration}`+
          `\nTelefone: ${cell_phone}`+
          `\nData de nascimento: ${date_of_birth}`
        )
      })
      .catch((err) => {
        msg.reply("Aluno não encontrado.");
      });
  };

  switch (msg.content.toLowerCase().split(' ')[1]) {
    case '--email':
      Select({email: paramValue})
      break;

    case '--ra':
      Select({registration: paramValue})
      break;

    case '--discord':
      Select({discord: paramValue})
      break;

    default:
      msg.reply(
        'erro: parâmetro não encontrado, tente:' +
        '\nread [--discord, --email, --ra] [informação]' +
        '\nread --email "teste@email.com"'
      );
      break;
  }
}