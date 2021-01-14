module.exports = (client, activeServer, msg) => {
  console.log('auth')
  const reg = new RegExp(/^[0-9]+$/)

  console.log('RegExp: ', reg.exec(msg.content))
}