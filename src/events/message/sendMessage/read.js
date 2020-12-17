const instance = require('../../../database');

module.exports = (msg) => {
  const paramValue = msg.content.split(' ')[2].replace('\"', '').replace('\"', '').trim()



  const Select = selectObject => {
    console.log(selectObject)
    instance
      .select(selectObject)
      .then(result => {
        const { name, university, campus, registration, date_of_birth, contact } = result[0]

        msg.reply(
          `Nome: ${name}` +
          `\nUniversidade: ${university}`+
          `\nCampus: ${campus}`+
          `\nEmail: ${contact.email}`+
          `\nR.A: ${registration}`+
          `\nTelefone: ${contact.cell_phone}`+
          `\nDiscord: ${contact.discord}`+
          `\nData de nascimento: ${date_of_birth}`
        )
      })
      .catch((err) => {
        msg.reply("Aluno não encontrado.");
      });
  };

  switch (msg.content.toLowerCase().split(' ')[1]) {
    case '--email':
      Select({contact: {email: paramValue}})
      break;

    case '--ra':
      Select({registration: Number(paramValue)})
      break;

    case '--discord':
      Select({contact: {discord: paramValue}})
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