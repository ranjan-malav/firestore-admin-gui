var express = require('express');
var router = express.Router();

const { getFirestore } = require('firebase-admin/firestore');

router.get('/:key', function (req, res, next) {
  const key = req.params.key;
  const uid = req.query.uid;

  getFirestore()
    .collection(key).doc(uid)
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

module.exports = router;
