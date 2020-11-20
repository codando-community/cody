const Cloudant = require('@cloudant/cloudant')

const cloudant = Cloudant({
  account: process.env.CLOUDANT_USER,
  password: process.env.CLOUDANT_PASSWORD
})

const db = cloudant.db.use('cody')

const select = (selector={_id: {$gt: 0}}, fields=[], sort=[]) => {

  db.find({
    selector: selector,
    fields: fields,
    sort: sort
  },

  function (err, result) {
    if (err) {
      throw err
    }

    console.log(result.docs)
  })

}

const  create = description => {
  return new Promise((resolve, reject) => {
      //let listId = uuidv4();
      //let whenCreated = Date.now();
      let list = {
        //"_id": "022887d981e4c61035c2be194908e3fd",
        //"_rev": "1-8f751895e1efffe3d5db4dd415b045a2",
        "registration": 679027,
        "name": "TESTE",
        "type": "TESTE",
        "university": "Universidade do Sul de Santa Catarina",
        "course": "Sistemas de Informação",
        "campus": "Pedra Branca",
        "date_of_birth": "08/06/1985",
        "contact": {
          "email": "Jesus.miguel@live.com ",
          "cell_phone": 3423423,
          "discord": "TESTE",
          "id_discord" :"123123123121312313"
        }
      }
      db.insert(list, (err, result) => {
          if (err) {
              logger.error('Error occurred: ' + err.message, 'create()');
              reject(err);
          } else {
              resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
          }
      });
  });
};

module.exports = {
  select,
  create
}