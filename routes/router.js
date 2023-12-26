var express = require('express');
var router = express.Router();

const { getFirestore } = require('firebase-admin/firestore');

router.get('/:collection/:docId', function (req, res, next) {
  const collection = req.params.collection;
  const docId = req.params.docId;

  getFirestore()
    .collection(collection)
    .doc(docId)
    .get()
    .then((doc) => {
      console.log(`Successfully fetched data: ${JSON.stringify(doc.data())}`);
      res.status(200).send(JSON.stringify(doc.data()));
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
      res.status(400).send(error);
    });
});

router.get('/custom', function (req, res, next) {
  const path = req.query.path
  // ex - users/xyz/orders/123
  const array = path.split("/")
  var docRef = getFirestore();
  for (const [index, value] of array.entries()) {
    if (index % 2 == 0) {
      docRef = docRef.collection(value);
    } else {
      docRef = docRef.doc(value);
    }
  }

  docRef.get()
    .then((doc) => {
      console.log(`Successfully fetched data: ${JSON.stringify(doc.data())}`);
      res.status(200).send(JSON.stringify(doc.data()));
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
      res.status(400).send(error);
    });
});

module.exports = router;
