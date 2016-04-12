from cassandra.cluster import Cluster

cluster = Cluster()
session = cluster.connect()

session.execute("CREATE KEYSPACE IF NOT EXISTS demo WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1}")
session = cluster.connect('demo')
session.execute("CREATE TABLE IF NOT EXISTS users (lastname varchar PRIMARY KEY, age int, city varchar, email varchar, firstname varchar)")

session.execute("insert into users (lastname, age, city, email, firstname) values ('Jones', 35, 'Austin', 'bob@example.com', 'Bob')")
result = session.execute("select * from users where lastname='Jones'")[0]
print 'User after input is named {} and is {} years old.'.format(result.firstname, result.age)

session.execute("update users set age=36 where lastname='Jones'")
result = session.execute("select * from users where lastname='Jones'")[0]
print 'User after update is named {} and is {} years old.'.format(result.firstname, result.age)

session.execute("delete from users where lastname='Jones'")
result = session.execute("select * from users where lastname='Jones'")
print 'Does user still exist? {}'.format(result.has_more_pages)

session.execute("DROP KEYSPACE demo")

cluster.shutdown()
