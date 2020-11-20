const Cloudant = require("@cloudant/cloudant");

const cloudant = Cloudant({
  account: process.env.CLOUDANT_USER,
  password: process.env.CLOUDANT_PASSWORD,
});

const db = cloudant.db.use("cody");

const select = (selector = { _id: { $gt: 0 } }, fields = [], sort = []) => {
  return new Promise((resolve, reject) => {
    db.find(
      {
        selector: selector,
        fields: fields,
        sort: sort,
      },

      function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result.docs);
        //return result.docs
      }
    );
  });
};

const create = (data) => {
  return new Promise((resolve, reject) => {

    let example = {
      registration: 679027,
      name: "TESTE",
      type: "TESTE",
      university: "Universidade do Sul de Santa Catarina",
      course: "Sistemas de Informação",
      campus: "Pedra Branca",
      date_of_birth: "08/06/1985",
      contact: {
        email: "Jesus.miguel@live.com ",
        cell_phone: 3423423,
        discord: "TESTE",
        id_discord: "123123123121312313",
      },
    };
    db.insert(data, (err, result) => {
      if (err) {
        logger.error("Error occurred: " + err.message, "create()");
        reject(err);
      } else {
        resolve({
          data: { createdId: result.id, createdRevId: result.rev },
          statusCode: 201,
        });
      }
    });
  });
};

// update a document
const updateDocument = (data) => {
  return new Promise((resolve, reject) => {
    db.insert(data, (err, result) => {
      if (err) {
        logger.error("Error occurred: " + err.message, "create()");
        reject(err);
      } else {
        resolve({
          data: { createdId: result.id, createdRevId: result.rev },
          statusCode: 201,
        });
      }
    });
  });
};

const deleteDocument = data => {
  console.log(data);
  console.log("Deleting document 'mydoc'");
  return new Promise((resolve, reject) => {
    db.destroy(data._id, data._rev, function (err, data) {
      console.log("Error:", err);
      console.log("Data:", data);
    });
  });
};

module.exports = {
  create,
  select,
  deleteDocument,
  updateDocument,
};
