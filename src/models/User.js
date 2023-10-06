const { Schema, model } = require('mongoose');//
const bcrypt = require('bcryptjs');

//esto nomas crea la base de datos
const userSchema = new Schema({ //
    username: String,
    email: String,
    password: String
});

//cojunto de metodos, definimos encriptacion
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
};//este metodo recibe un password lo encripta y devuelve el valor enpcriptado


//
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}//retorna una comparativa de password, this.password y devuelve booleano

module.exports = model('User', userSchema); //Construyes el modelo y lo exportas



//este es el esquema 
//representacion logica de una entidad, campos y 
//