# Bootcamp del Master en Full Stack Web Development

Este repositorio es una breve guía para que los alumnos del master tengan una base de nodejs y docker de acuerdo al temario impartido en el Bootcamp del Master en Full Stack Web Development de Three Points.

## Descripción de contenidos


* ide_intro: código de muestra en la explicación del IDE.
* node-npm_intro: ejemplos sencillos en node para levantar una app.
* docker_intro: **código semilla para la actividad.**
* db_sample: colección de muestra en formato json si el alumno desea usarla para la actividad.

## Dockerización Base de Datos MongoDB

Dado que en la actividad se pide que la app, desplegada en un Docker se comunique con la base de datos, también desplegada en un Docker container,
se pueden seguir los siguientes pasos para que la app se comunique con el container de mongo.

docker network create mynetwork
docker run --name mongodb-container --hostname mongodb-container -d -p
27017:27017 --network mynetwork mongo

Nos metemos en el container y ejecutando los comandos necesarios para
crear una nueva base de datos y colección 

docker cp ./users.json mongodb-container:/users.json

docker exec -it mongodb-container -db documents --collection users --file mongodb-container:/users.json -jsonArray
```

Ahora corremos el Dockerfile

docker build -t test/node-api .

docker run -p 8080:8080 -d --name test-node-api --network mynetwork test/node-api

```



## License
MIT License
Copyright (c) 2023