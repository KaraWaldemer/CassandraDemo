"use strict";
var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1']});

// Use async series to run functions in serial (one after another)
async.series([
    // Create Keyspace
    function (callback) {
        console.log("Creating Keyspace: 'demo'");
        client.execute("CREATE KEYSPACE IF NOT EXISTS demo WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1}", function (err, result) {
            // Run next function in series
            callback(err, null);
        });
    },
    // Connect to Keyspace
    function (callback) {
        console.log("Connecting to Keyspace: 'demo'");
        client.execute("USE demo", function (err, result) {
            //Run next function in series
            callback(err, null);
        });
    },
    // Create table
    function (callback) {
        console.log("Creating table: 'users'");
        client.execute("CREATE TABLE IF NOT EXISTS users (lastname varchar PRIMARY KEY, age int, city varchar, email varchar, firstname varchar)", function (err, result) {
            callback(err, null);
        });
    },
  // Insert Bob
  function (callback) {
      console.log("Inserting into table: 'users'");
    client.execute("INSERT INTO users (lastname, age, city, email, firstname) VALUES ('Jones', 35, 'Austin', 'bob@example.com', 'Bob')", function (err, result) {
      // Run next function in series
      callback(err, null);
    });
  },
  // Read users and print to console
  function (callback) {
      console.log("Selecting from table: 'users'");
    client.execute("SELECT lastname, age, city, email, firstname FROM users WHERE lastname='Jones'", function (err, result) {
      if (!err){
        if ( result.rows.length > 0 ) {
          var user = result.rows[0];
          console.log("name = %s, age = %d", user.firstname, user.age);
        } else {
          console.log("No results");
        }
      }

      // Run next function in series
      callback(err, null);
    });
  },
  // Update Bob's age
  function (callback) {
      console.log("Updating table: 'users'");
    client.execute("UPDATE users SET age = 36 WHERE lastname = 'Jones'", function (err, result) {
      // Run next function in series
      callback(err, null);
    });
  },
  // Read users and print to the console
  function (callback) {
      console.log("Selecting from table: 'users'");
    client.execute("SELECT firstname, age FROM users where lastname = 'Jones'", function (err, result) {
      var user = result.rows[0];
      console.log("name = %s, age = %d", user.firstname, user.age);

      // Run next function in series
      callback(err, null);
    });
  },
  // Delete Bob
  function (callback) {
      console.log("Deleting from table: 'users'");
    client.execute("DELETE FROM users WHERE lastname = 'Jones'", function (err, result) {
      if (!err) {
        console.log("Deleted");
      }

      // Run next function in series
      callback(err, null);
    });
  },
  // Read users and print to the console
  function (callback) {
      console.log("Selecting from table: 'users'");
    client.execute("SELECT * FROM users WHERE lastname='Jones'", function (err, result) {
      if ( result.rows.length > 0 ) {
        var user = result.rows[0];
        console.log("name = %s, age = %d", user.firstname, user.age);
      } else {
        console.log("No records");
      }

      // Run next function in series
      callback(err, null);
    });
  },
    //Drop keyspace
    function (callback) {
        console.log("Dropping keyspace: 'demo'");
        client.execute("DROP KEYSPACE demo", function (err, result) {
            callback(err, null);
        });
    }
], function (err, results) {
  // All finished, quit
  process.exit();
});