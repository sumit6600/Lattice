const db = require("../config/db");
const catchAsync = require("../utils/catchAsync");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { response } = require("../app");

//------------------------------PATIENT-REGISTER-FORUM--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.patientRegister = catchAsync(async (req, res) => {
  var name = res.locals.name;
  var a;
  var insert_query;
  console.log(name);
  var obj = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    password: req.body.password,
    pic: req.file,
  };
  obj.pic = process.env.HOST + "/public" + req.file.filename;

  try {
    const hospitalName = `SELECT hospitalName from doctortable WHERE name = '${name}'`;

    console.log(a);
    db.getConnection(async (err, connection) => {
      if (err) throw err;

      const sqlSearch = "SELECT * FROM usertable WHERE email = ?";
      const search_query = mysql.format(sqlSearch, [obj.email]);
      const sqlInsert = `INSERT INTO usertable(name ,email,mobile,address,password,pic,role,hospitalName) VALUES (?,?,?,?,?,?,'Patient',?)`;
      const query =
        " UPDATE doctortable SET patientcount = patientcount+1 WHERE name = ?";
      const search = mysql.format(query, [name]);

      db.query(hospitalName, (err, result) => {
        a = result[0].hospitalName;
        console.log(a);
        insert_query = mysql.format(sqlInsert, [
          obj.name,
          obj.email,
          obj.mobile,
          obj.address,
          obj.password,
          obj.pic,
          a,
        ]);
      });

      connection.query(search);

      connection.query(search_query, search, async (err, results) => {
        if (err) throw err;
        if (results.length != 0) {
          connection.release();
          console.log("------> User already exists");
          return res
            .status(409)
            .send("User with this email is already registerd");
        } else {
          await connection.query(insert_query, (err, result) => {
            connection.release();
            if (err) throw err;

            return res.status(201).json({ msg: "User Register successfully" });
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//-------------------------------------------psychiatrist-Form------------------------------------------------------------------------------------------------------------------------------------

module.exports.addPsychiatrist = catchAsync(async (req, res) => {
  var a;
  const user = req.body;

  var queryInsert =
    "INSERT INTO doctortable (name ,patientcount , hospitalName,password) VALUES (?,0,?,?) ";
  var query = `SELECT hospitalName FROM hospitalname WHERE idhospitalName =${user.hospitalName}`;

  db.query(query, user.hospitalName, (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({ message: "id does not exist" });
      } else {
        a = results[0].hospitalName;
        console.log(a);
        db.query(queryInsert, [user.name, a, user.password], (err, result) => {
          if (err) throw err;

          return res.status(200).send({ msg: "success", results });
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

//-------------------------------------------------------psychiatrist---------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.psychiatrist = async (req, res) => {
  const name = req.body.name;
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM doctortable where name=?";
      const search_query = mysql.format(sqlSearch, [name]);

      await connection.query(search_query, async (err, result) => {
        if (err) throw err;
        if (result.length <= 0) {
          return res.status(404).send("User not exists!");
        } else {
          var a = name;
          console.log(a);
          const accessToken = jwt.sign(
            { name: name },
            process.env.ACCESS_TOKEN,
            {
              expiresIn: 60 * 60,
            }
          );
          return res.status(200).send({ msg: ` is logged In`, accessToken });
        }
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


module.exports.hospitalDetails = async (req, res) => {
  const user = req.body;
  var a, b, c;
  var query = `SELECT hospitalName FROM hospitalname WHERE idhospitalName =${user.hospitalName}`;

  db.query(query, user.hospitalName, (err, result) => {
    if (err) throw err;
    else {
      a = result[0].hospitalName;
      var select = `SELECT iddoctortable ,name , patientcount ,hospitalName FROM doctortable  WHERE hospitalName = '${a}'`;
      var count = `SELECT SUM(patientcount) AS totalPatientcount FROM doctortable WHERE  hospitalName = '${a}'`;
      var patientCount = `SELECT COUNT('${a}') AS patientcount FROM usertable;`;

      db.query(count,(err, result) => {
        if (err) throw err;
        b = result[0].totalPatientcount;
      });
      db.query(patientCount,(err,result) =>{
        if(err) throw err;
        c = result[0].patientcount;
        console.log(c+"&&&&&&&&&");
       db.query(select, count, (err, result) => {
         if (err) throw err;
         if (result.length <= 0) {
           return res.status(404).send(" not exists!");
         } else {
           console.log(b);
           return res.status(200).send({
             hospitalName: result[0].hospitalName,
             TotalpsychiatristCount: b,
             patientCount: c,
             psychiatrist: { result },
           });
         }
       });
      })
     
    }
  });
};
