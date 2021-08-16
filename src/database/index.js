const Cloudant = require("@cloudant/cloudant");

const cloudant = Cloudant({
  account: process.env.CLOUDANT_USER,
  password: process.env.CLOUDANT_PASSWORD,
});

const db = cloudant.db.use(process.env.ENV_MODE === 'dev' ? 'codando_test' : 'codando_v3');

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
      }
    );
  });
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    db.insert(data, (err, result) => {
      if (err) {
        console.error("Error occurred: " + err.message, "create()");
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

const updateDocument = (data) => {
  return new Promise((resolve, reject) => {
    db.insert(data, (err, result) => {
      if (err) {
        console.error("Error occurred: " + err.message, "create()");
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
