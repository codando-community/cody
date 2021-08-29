const Eris = require('eris');

async function addRole(params) {

  const client = new Eris(params.DS_TOKEN);
  client.connect()

  return new Promise((resolve, reject) => {

    client.on('ready', () => {
      resolve({message: "teste", params})
    })
  })
}

global.main = addRole