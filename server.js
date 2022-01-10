const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const fs = require("fs")
const auth = require("./client/src/routes/auth");
const port = 3001;
const cors = require("cors");
const authController = require('./client/src/controllers/auth');
// require("./service/passport");
// require('./routes/authRoutes')(app);
// app.use(passport.initialize());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', auth);

<<<<<<< HEAD
// app.use(cookieSession({
//   name: 'test-session',
//   keys: ['key1', 'key2']
// }))

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
=======
const boards = require("./routes/board/Board");
const products = require("./routes/product/Product");
const mains = require("./routes/main/Main");
const mypages = require("./routes/mypage/Mypage");

app.use(express.static(path.join(__dirname, 'build')));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use("/board", boards);
app.use("/product", products);
app.use("/main", mains);
app.use("/mypage", mypages);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "build/index.html"));
>>>>>>> 97d8b643db316632f3122ae16b4db563110341b4
});

connection.connect((err) => {                           
  if(err) throw err;
  console.log("MySQL Conected!!!");
});


<<<<<<< HEAD

app.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    user: req.user
  });
});


app.get('/mypage', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
})



app.get("/api/products", (req, res) => {
    connection.query(
      "SELECT * FROM Products",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.get("/api/boards", (req, res) => {
    connection.query(
      "SELECT * FROM Boards",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.put("/api/boards", (req,res) => {
  var bidx = req.body.bidx;
  var btitle = req.body.btitle;
  var bcontent = req.body.bcontent;
  let sQuery = `UPDATE Boards SET btitle=("${btitle}"), bcontent=("${bcontent}"), modidate=now() where bidx=${bidx}`;  // ? 는 매개변수
  connection.query(sQuery, (err, result, fields) => {
    res.send(result)
  })
})

app.delete("/api/boards", (req, res) => {
  var bidx = parseInt(req.query.bidx);
  connection.query(
    `DELETE from Boards where bidx=${bidx}`
  )
})

app.get("/api/comments", (req, res) => {
  var idx = req.params.idx;
    connection.query(
      `SELECT * FROM Comments where board_idx=${idx}`,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.post("/board/write", (req, res)=>{
  var buserid = req.body.buserid;
  var btitle = req.body.btitle;
  var bcontent = req.body.bcontent;
  var datas = [buserid, btitle, bcontent];
    let sQuery = "insert into Boards(buserid, btitle, bcontent, regdate, modidate, bhit, blikeuser) values(?,?,?,now(),now(),0,0)";  // ? 는 매개변수
        connection.query(sQuery, datas,(err, result, fields) => {
          res.send(result)
        });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
=======
const host = "127.0.0.1";
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`ReactProject is running  ---http://${host}:${port}`);
});
>>>>>>> 97d8b643db316632f3122ae16b4db563110341b4
