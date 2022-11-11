var express = require('express');
var router = express.Router();
const pool = require("../db/db");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const posts = await pool.query("SELECT * FROM post;"); 
  console.log(posts[0]);
  res.render('index', { title: 'Node.js', posts: posts[0]}); //0 불필요한거 안보내기 위해
});

module.exports = router;
