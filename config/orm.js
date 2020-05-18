const connection = require("../config/connection.js");


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
    selectAll: (tableInput, cb) => {
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: (tableName, cols, vals, cb) => {
        let queryString = `INSERT INTO ${tableName} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            console.log("Sucesfully Added");
            cb(res);
        })

    },

    updateOne: (tableName, objColVals, vals, condition, cb) => {
        let queryString  = `UPDATE ${tableName} SET (${objToSql(objColVals)}) WHERE ${condition}`;

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            console.log("Sucesfully Updated");
            console.log("Executing Third Declared CallBack");
            cb(result);
          });
    }
};
// Export the orm object for the model (burger.js).
module.exports = orm;