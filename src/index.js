const app = require('./app');//son constantes porque e manipula en init
const port = 3000;
require('./database');

async function init(){//asincronica porque cada vez que se dipara el init
    await app.listen(port);//await activa ell puerto pero se sigue ejecutando, para que espere 
    console.log(`Servidor en el puerto ${port} ....!!!`);
}

init();

//habilita el node para que atienda peticiones en el puerto 
//adiconalmente dispara dos librrias app y database 



