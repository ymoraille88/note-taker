const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  readFromFile('./db/routes.json').then((data) => res.json(JSON.parse(data)));
});



module.exports = router;