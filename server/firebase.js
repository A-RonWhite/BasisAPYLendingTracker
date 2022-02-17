var admin = require("firebase-admin");

var serviceAccount = require("./average-apy-tracker-firebase-adminsdk-8fvnj-50c109a041.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const test = {
  [new Date().getTime()]: 131,
};

db.collection("APYDump")
  .doc("BASIS")
  .update(test)
  .then(() => {
    console.log("Added to the database");
  });

const updateFirebase = (document, field) => {
  db.collection("APYDump")
    .doc(document)
    .update(field)
    .then(() => {
      console.log("Added to the database");
    });
};

/* const arr = [];

const average = (array) => array.reduce((a, b) => a + b) / array.length; */

/* db.collection("APYDump")
  .doc("BASIS")
  .get()
  .then((doc) => {
    if (!doc.exists) {
      console.log("No doc exists");
    }

    console.log(doc._fieldsProto);

    //add sum / by num

    for (const key in doc._fieldsProto) {
      console.log(`${key}: ${doc._fieldsProto[key].integerValue}`);

      arr.push(parseInt(doc._fieldsProto[key].integerValue));
    }
  })
  .then(() => {
    console.log("Average: ", average(arr));
  }); */
