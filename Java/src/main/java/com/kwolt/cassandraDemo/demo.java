package com.kwolt.cassandraDemo;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.Session;

public class demo {
  public static void main(String[] args) {
    Cluster cluster;
    Session session;

    //Connect to the cluster and keyspace "demo"
    cluster = Cluster.builder().addContactPoint("127.0.0.1").build();
    session = cluster.connect("demo");
    System.out.println("Connected to Keyspace - " + session.getLoggedKeyspace());
    System.out.println("Disconnecting");
    cluster.close();
  }
}
