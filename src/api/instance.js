const Cloudant = require('@cloudant/cloudant')

const cloudant = Cloudant({
  account: process.env.CLOUDANT_USER,
  password: process.env.CLOUDANT_PASSWORD
})

const db = cloudant.db.use('codando')

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

module.exports = {
  select
}