const { Guild } = require('discord.js');
const Eris = require('eris');

async function addRole(params) {
  const { DS_TOKEN, SERVER_ID, ROLE_NAME, USER_ID} = params

  const client = new Eris(DS_TOKEN);
  client.connect()

  const GUILD = client.guilds.cache.find(guild => guild.id === SERVER_ID) // TODO o retorno do Eris é diferente do retorno do DiscordJS, verificar como mapear a lista de servidores do bot e seus membros

  let cargoRecebido = GUILD.roles.cache.find(role => role.name.includes(ROLE_NAME))
  let cargoMembro = GUILD.roles.cache.find(role => role.name.includes('membro'))
  let member = GUILD.members.cache.find(member => member.id === USER_ID)

  cargoMembro &&
    member.roles.add(cargoMembro)
      .then(() => {
        message += ':blush: Acabei de liberar o seu acesso!!\n'
      })
      .catch(err => console.error(err)) // TODO redirect de erros pra uma function que envia no Discord em Cody/erros

  cargoRecebido &&
    member.roles.add(cargoRecebido)
      .then(() => {
        message += `Acesso concedido: ${ROLE_NAME}\n`
      })
      .catch(err => console.error(err))  // TODO redirect de erros pra uma function que envia no Discord em Cody/erros

  message += 'may the Community be with you! :vulcan:'

  return {message: message, params}
}

global.main = addRole