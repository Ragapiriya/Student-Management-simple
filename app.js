const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files - importing static files
app.use(express.static("public"));

//template engine
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

/*
//mysql connection
const con = mysql.createPool({
  connectionLimit:10,
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})
 
//check db connection
con.getConnection((err,connection)=>{
  if(err) {
    console.log(err);
  }
  else{
    console.log("Connection success");
  }
})
*/


const routes = require("./server/routes/students");
app.use('/',routes);
//listening to the port
app.listen(port, () => {
  console.log("Listening to the port " + port);
});
