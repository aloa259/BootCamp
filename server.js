const express = require('express');
const bodyParser = require('body-parser');
// App
const app = express();
const {userModel} = require('./models');
const mongoose = require('mongoose');

// Constants
const { promisify } =require('util');
const MongoClient = require ('mongodb').MongoClient;
const url = 'mongodb://mongodb-container:27017/documents';
//const dbName = 'documents';
const collectionName = 'users';
const hostname = '0.0.0.0';
const port = 8080;


app.use(bodyParser.json());// for parsing application/json

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});
  
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

// GET method route
app.get('/secret', function (req, res, next) {
    res.send('Never be cruel, never be cowardly. And never eat pears');
    console.log('This is a console.log message.');
});

/*
Your implementation here conexion a BD 
/*Conectarse al mongo dockerizado*/

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });
  

// // Connect to mongodb server
// const MongoClient = require('mongodb').MongoClient;
// /* Your url connection to mongodb container */
// const url = ...;

// GET method route
// Crear una ruta que, mediante un GET, devuelva todos los documentos en una colección
// GET todos los documentos
app.get('/api/get/all', async (req, res) => {
    try {
      const documents = await userModel.find({});
      return res.json({ documents });
    } catch (error) {
      console.log('Error ALL', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


// GET method route
// Query by a certain field(s)
// // Definir una ruta que, mediante un GET, devuelva sólo los documentos
//que cumplen la condición en base a un query sobre uno o varios campos
//de un documento

app.get('/api/get?first_name=admin', async (req, res) => {
    try {
      const documents = await userModel.findById(first_name);
      return res.json({ documents });
    } catch (error) {
      console.log('Error by ID', error);
      return res.status(500).json({ message: 'Internal server error 2' });
    }
  });

/* PUT method. Modifying the message based on certain field(s). 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
app.put('/api/put', async (req, res) => {
    const user_id = 1
    const email = 'admin@admin.com' 
    try {
        const newUser = new userModel;
      await newUser.findByIdAndUpdate({_id: user_id}, {email: email}, {new: true})
      .then(response =>  res.status(200).json(response))
      .catch(error => res.status(401).send(error))
    } catch (error) {
        const first_name="paty"
        const last_name="ramirez"
        const email= "aloa@upc.com"
        const saldo= "878945"
        const role = "admin"
        const newUser = new userModel.create({first_name, last_name, email, saldo, role});
          await newUser
                  .save()
                  .then(response => res.status(201).json({'status 201 User created': response}))
                  .catch(error => res.status(401).send(error))
    }
  });


/* DELETE method. Modifying the message based on certain field(s).
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
// ...
    app.delete('/api/delete', async(req, res) => {
        const user_id = 2
        const user = new userModel;
        await user.findById({_id:user_id}, async function (err, doc) {
          if (err){
              console.log('el usuario no existe')
              res.status(204).end()
          } else{
              //res.send(doc)
              await user.findByIdAndRemove(user_id);
              res.status(200).json({status: `Elemento con id:${user_id} eliminado`})
              }
          });
      });


app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);