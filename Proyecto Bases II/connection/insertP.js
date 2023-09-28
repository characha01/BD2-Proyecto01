
// #########################################################################
// ########################   Redis   #############################
// #########################################################################

var redis = require('redis');
const clientRedis = redis.createClient({ url: 'redis://127.0.0.1:6379' });
const redisConnection = async () => {
    await clientRedis.connect();
}

function insertRedis(key, value){
    clientRedis.set(key, value, (err, reply) => {
        if (err) {
            console.error('Error al insertar en Redis:', err);
        } else {
            console.log('Insertado en Redis:', reply);
        }
    });
}

function get_(key){
    return new Promise((resolve, reject) => {
      clientRedis.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
}

redisConnection();

async function mainR() {
    try {
      insertRedis('miClave6','miValor6')
      //console.log('Valor de miClave:', value);
      // Aquí puedes usar el valor en otra parte de tu programa
    } catch (err) {
      console.error('Error al obtener el valor de miClave:', err);
    }
}

//mainR();

// #########################################################################
// ########################   Mongo   #############################
// #########################################################################
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6');
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'CONNECTION ERROR'));
dbMongo.once('open', function () {
  console.log('Connected: Mongo');
});

// Create Schema
const Schema = mongoose.Schema;
const firstSchema = new Schema ({ userName : String , password : Number});

// Create Model
const firstModel = mongoose.model("firstModel",firstSchema)

// Insert function
async function insertMongo(userName,password) {
  try{
    const newData = new firstModel({userName , password});
    await newData.save();
    console.log('Dato insertado en MongoDB:', newData);
  }catch(error){
    console.error('Error al insertar dato en MongoDB:', error);
  }
}

//Get Function
async function getMongo() {
  try{
    const data = await firstModel.find({});
    console.log('Datos obtenidos de MongoDB:', data);
  }catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
  }
}
async function mainM(){
  /*insertMongo('user1',1);
  insertMongo('user2',2);
  insertMongo('user3',3);
  insertMongo('user4',4);
  insertMongo('user5',5);*/
  getMongo();
  



}
mainM();

