var express = require('express');
var router = express.Router();
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminSchema = require('../database/model/userAdmin.js')


router.post('/login', async (req, res)=>{
    const {user, pass} = req.body

    if(!user || !pass){
        return res.json({msg: 'Algo esta faltando!'})
    }

    const userAdmin = await adminSchema.findOne({user: user})
    if(userAdmin){
       
    //verificar senha confere com cadastro
    const checkPassword = await bcrypt.compare(pass, userAdmin.pass)
    if(!checkPassword ){
		return res.status(422).json({msg: 'Senha invalida'})
	}

    try{
		const secret = process.env.SECRET
		const token = jwt.sign(
			{
				pass: userAdmin.pass
			}, secret
		)

	    res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})

	
		
	}catch(erro){
		console.log(erro)
		res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
	}
        

    }else{
       return  res.status(200).json({msg:'usuario adm não encontrado!'})
    }

    res.status(200).json({msg:'ok', admin: userAdmin, })
})

// router.post('/newUserAdmin', async (req, res)=>{
//     const {user, pass} = req.body

//     if(!user || !pass){
//         return res.json({msg: 'Algo esta faltando!'})
//     }

//     const userAdmin = await adminSchema.findOne({user: user})
//     if(userAdmin){
//         // criar senha hash
//         const salt = await bcrypt.genSalt(12);
//         const passwordHash = await bcrypt.hash(pass, salt);

//         // criar usuário
//         const newUser = new adminSchema({
//             user: user,
//             pass: passwordHash,
//         });

//         try{
//             await newUser.save();

//             // criar e assinar token
//             const secret = process.env.SECRET;
//             const token = jwt.sign({ id: user._id }, secret);
//         }catch{
//             res.status(500).json({ msg: 'Erro!' });

//         }

//     }else{
//        return  res.status(200).json({msg:'usuario adm não encontrado!'})
//     }

//     res.status(200).json({msg:'ok', admin: userAdmin, })
// })


module.exports = router;