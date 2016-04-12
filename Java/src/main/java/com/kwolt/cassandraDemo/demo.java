package com.kwolt.cassandraDemo;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;

public class demo {
  public static void main(String[] args) {
    Cluster cluster;
    Session session;

    //Connect to the cluster and keyspace "demo"
    cluster = Cluster.builder().addContactPoint("127.0.0.1").build();

    session = cluster.connect();
    System.out.println("Creating keyspace 'demo'");
    session.execute("CREATE KEYSPACE IF NOT EXISTS demo WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1}");
    session = cluster.connect("demo");
    System.out.println("Creating Table 'users'");
    session.execute("CREATE TABLE IF NOT EXISTS users (lastname varchar PRIMARY KEY, age int, city varchar, email varchar, firstname varchar)");
    System.out.println("Connected to Keyspace - " + session.getLoggedKeyspace());

    System.out.println("Inserting a new user");
    // Insert one record into the users table
    session.execute("insert into users (lastname, age, city, email, firstname) values ('Jones', 35, 'Austin', 'bob@example.com', 'Bob')");

    // Use select to get the user we just entered
    ResultSet results = session.execute("SELECT * FROM users WHERE lastname='Jones'");
    for (Row row : results) {
      System.out.format("A user named %s has been inserted and is %d years old.\n", row.getString("firstname"), row.getInt("age"));
    }

    // Update the same user with a new age
    session.execute("update users set age = 36 where lastname = 'Jones'");
    // Select and show the change
    results = session.execute("select * from users where lastname='Jones'");
    for (Row row : results) {
      System.out.format("User %s has been updated and is now %d years old.\n", row.getString("firstname"), row.getInt("age"));

    }

    System.out.println("Deleting Users with lastname of Jones");
    // Delete the user from the users table
    session.execute("DELETE FROM users WHERE lastname = 'Jones'");
    // Show that the user is gone
    results = session.execute("SELECT * FROM users where lastname='Jones'");
    System.out.format("There are now %d users with the last name Jones.\n", results.all().size());

    System.out.println("Deleting keyspace 'demo'");
    session.execute("DROP KEYSPACE demo");

    System.out.println("Disconnecting");
    cluster.close();
  }
}
