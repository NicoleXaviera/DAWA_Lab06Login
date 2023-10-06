const mongoose = require('mongoose');
//const mysql = require('mysql')
const uri = "mongodb+srv://nicolexaviera:Tecsup2022@clusterdemo.prhd2br.mongodb.net/lab06login?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database is connected'));

// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'usbw',
//     database : 'contoso'
// })

//connection.connect().then(db => console.log('Database is connected'));

// connection.query('SELECT * FROM empleados', function(err, rows, fields) {
//     if (err) {
//         throw err;
//     }else{
//         console.log('Los empleados son: ', rows[0].Nombre);
//     }
//   });

// connection.end();

