var express = require('express');
var router = express.Router();
const pool = require("../db/db");

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('post', { title: 'Node.js', });
});

router.post('/add', async (req, res, next) => {
    const {posttitle, postvalue} = req.body;
    const add_post = await pool.query('insert into post values (null, ?, ?);', [posttitle, postvalue]);
    console.log(posttitle, postvalue);
    res.render('post', { title: 'Node.js', });
  });
  
  router.get("/del", async (req, res, next) => {
    const post = await pool.query("select * from post");
    console.log(post[0]);
    res.render("postdel", { title: "Node.js", post: post[0] });
});
router.get("/del/:target", async (req, res, next) => {
    const target = req.params.target;
    const del_post = await pool.query(" delete  from post where id =?", [target]);
    
    res.redirect("/post/del");
});
router.get("/update", async (req, res, next) => {
    const post = await pool.query("select * from post");
    res.render("postupdate", { title: "Node.js", post: post[0] });
});
router.post("/update", async (req, res, next) => {
    const {posttitle, postvalue} = req.body;
    const post = await pool.query("select * from post");
    const updatepost = await pool.query("update post set title = ?, value= ? where id = 100; ", [posttitle, postvalue]);
    res.render("postupdate", { title: "Node.js"});
});
module.exports = router;

//ejs 폼을 만든다 서브밋 버튼을 만든다 라우터에서 준비를 받는다 라우터에서 디비를 받는다