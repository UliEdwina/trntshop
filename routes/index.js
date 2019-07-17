let express = require('express');
let router = express.Router();



/* GET home page. */
router.get('/', (req, res)=> {
    res.render('index.ejs')
    console.log('hi')
})
module.exports = router;
