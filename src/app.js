const express = require('express');//ejecuta express
const app = express();//inicializa la libreria

app.use(express.json());
app.use(express.urlencoded({extended: false}));//habileta la ifnormacion ppor url
app.use(express.static('src/public'));

app.use(require('./controllers/authController'));//usar eñ elemento authcontroler

module.exports = app;//definimos que esto es un modulo y que hay que exportarlo

//app declara las caracteristicas de exprees y invoca a un controlador