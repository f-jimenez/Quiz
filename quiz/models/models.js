var path = require('path');
require('dotenv').load();

// Postgress    DATABASE_URL = postgres://user:password@host:port/database
// SQLite       DATABASE_URL = dqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var db_name     = (url[6] || null);
var user        = (url[2] || null);
var password    = (url[3] || null);
var protocol    = (url[1] || null);
var dialect     = (url[1] || null);
var port        = (url[5] || null);
var host        = (url[4] || null);
var storage     = process.env.DATABASE_STORAGE;


// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(db_name, user, password, {
    dialect:dialect,
    protocol:protocol,
    port:port,
    host:host,
    storage:storage,    // solo SQLite (.env)
    omitNull: true      // solo Postgres
});

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definicion de la tabla Comment en comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definicion de tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
    // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
        if (count === 0) { // la tabla se inicializa solo si esta vacia
            Quiz.create({
                tema: 'Humanidades',
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            });
            Quiz.create({
                tema: 'Humanidades',
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa'
            })
            .then(function(){console.log('Base de datos inicializada')});
        }
    });
});