const { connect } = require("mongoose");
const mysql = require("mysql2");
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection success");
      connection.query("select * from users", (err, rows) => {
        connection.release();
        if (!err) {
          console.log("Good, works fine!!");
          res.render("home", { rows });
        } else {
          console.log("Error while fetching data" + err);
        }
      });
    }
  });
};

exports.adduser = (req, res) => {
  res.render("adduser");
};
exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection success");
      const { name, age, city } = req.body;
      connection.query(
        "insert into users (NAME,AGE,CITY) values (?,?,?)",
        [name, age, city],
        (err, rows) => {
          connection.release();
          if (!err) {
            console.log("Good, works fine!!");
            res.render("adduser", { msg: "User details added successfully" });
          } else {
            console.log("Error while fetching data" + err);
          }
        }
      );
    }
  });
};

exports.edituser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection success");
      //getting ID from url
      let id = req.params.id;
      connection.query(
        "select * from users where id = ?",
        [id],
        (err, rows) => {
          connection.release();
          if (!err) {
            console.log("Good, works fine!!");
            res.render("edituser", { rows });
          } else {
            console.log("Error while fetching data" + err);
          }
        }
      );
    }
  });
};

exports.editsave = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection success");
      let id = req.params.id;
      const { name, age, city } = req.body;
      connection.query(
        "update users set NAME=?, AGE =?, CITY=? where ID=?",
        [name, age, city, id],
        (err, rows) => {
          connection.release();
          if (!err) {
            console.log("Good, works fine!!");
            con.getConnection((err, connection) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Connection success");
                //getting ID from url
                let id = req.params.id;
                connection.query(
                  "select * from users where id = ?",
                  [id],
                  (err, rows) => {
                    connection.release();
                    if (!err) {
                      console.log("Good, works fine!!");

                      res.render("edituser", {
                        rows,
                        msg: "User details updated successfully",
                      });
                    } else {
                      console.log("Error while fetching data" + err);
                    }
                  }
                );
              }
            });
          } else {
            console.log("Error while fetching data" + err);
          }
        }
      );
    }
  });
};

exports.delete = (req, res) =>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    let id = req.params.id;
    connection.query("delete from users where id=?",[id],(err,rows)=>{
      connection.release();
      if(!err)
      {
        res.redirect("/");
      }
      else
      {
        console.log(err);
      }
    })
  })
}
