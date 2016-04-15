# CassandraDemo
Demo how to connect to and use Cassandra with a variety of different languages. These examples are adapted from and expand upon those from the DataStax driver [documentation](https://academy.datastax.com/downloads/download-drivers).

All of these examples assume you have Cassandra installed locally and running. Please go [here](http://www.planetcassandra.org/cassandra/) for instructions on how to do that.


## Java
If you do not have [java](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed, please do so before running this test. This test is also reliant on [Maven](https://maven.apache.org/download.cgi) so you will need to install that as well.

1. Clone the repository to your local machine.
2. Navigate to the Java directory in the project.
3. Run 'mvn clean install'
4. Run 'mvn exec:java -Dexec.mainClass="com.kwolt.cassandraDemo.demo"'

## Node
If you do not have [node](https://nodejs.org/en/download/) installed, please do so before running this test.

1. Clone the repository to your local machine.
2. Navigate to the Node directory in the project.
3. Run 'npm install'
4. 'node demo.js'


## Python
If you do not have [python](https://www.python.org/downloads/) installed, please do so before running this test.

1. Clone the repository to your local machine.
2. Navigate to the Python directory in the project.
3. Run 'python demo.py'
