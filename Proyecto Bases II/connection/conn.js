var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6');
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'CONNECTION ERROR'));
dbMongo.once('open', function () {
  console.log('Connected: Mongo');
});

var redis = require('redis');
const clientRedis = redis.createClient({ url: 'redis://127.0.0.1:6379' });
const redisConnection = async () => {
  await clientRedis.connect()
  clientRedis.on('error', (err) => {
      console.error(`An error occurred with Redis: ${err}`)
  })
  console.log('Connected: Redis')
}
redisConnection();

var cassandra = require('cassandra-driver');
const clientCassandra = new cassandra.Client({
  contactPoints: ['h1', 'h2'],
  localDataCenter: 'datacenter1',
  keyspace: 'test'
});
clientCassandra.connect(function(err, result){
  console.log('Connected: Cassandra')
});

const { DocumentStore } = require('ravendb');
const store = new DocumentStore('http://localhost:8080', 'test');
store.initialize();
const session = store.openSession();
