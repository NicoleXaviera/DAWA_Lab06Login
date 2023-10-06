const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');//llamamos la palabra secreta
const verifyToken = require('./verifyToken');

const User = require('../models/User');

__dirname='src/'
router.get('/',async(req,res,next)=>{
    res.sendFile('login.html',{root:__dirname + '/public/'})

}
);

router.post('/sinup', async (req, res, next) => {
    const { username, email, password } = req.body; //dentro del body recibe, lo asignamos en unas ola linea
    const user = new User(
       {
          username: username,
          email: email,
          password: password
       } //forzamos tenerlo dentro de un json
    );

    //console.log(user)
    //res.json({message: 'Received'})
    
    user.password = await user.encryptPassword(user.password)//chanco el paswaord con el mtodo wait que en algun momento lo va a ejecutar
    await user.save();//pasword encriptado , una propiedad propia de moggose save que guarda n la base de datos

    const token = jwt.sign({id: user._id}, config.secret, { //tokerizo al usario con el underlineid _ID, le envio json resumido 
        expiresIn: 60 * 60 * 24
    })
    
    res.json({auth: true, token: token})
    
})

router.get('/dashboard', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    //const user = await User.findById(req.userId);
    if(!user){
        return res.status(404).send('No user found....!!!');
    }

    res.json(user);
    //res.sendFile(__dirname + '../public/dashboard.html');
})

router.get('/register', (req, res, next) =>{
    res.sendFile(__dirname + '../public/register.html')
})


//usuarios que ya exiten en bd
router.post('/sinin', async (req, res, next) => {
    const { email, password } = req.body; 
    //console.log(email, password);
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(404).send("The user doesn't exists");
    }

    const validPassword = await user.validatePassword(password);
    //console.log(passwordIsValid);
    if(!validPassword){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });
    
    res.json({auth: true, token});
})

// router.get('/dashboard', verifyToken, (req, res, next) => {
//     res.json('dashboard');
// })


module.exports = router