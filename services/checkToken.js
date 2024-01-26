// Middleware para verificar o token
const jwt = require("jsonwebtoken");

async function checkToken(token) {
  if (!token) {
    return false
  }

  try {
    const secret = process.env.SECRET;
    const decodedToken = await jwt.verify(token, secret);
    if(decodedToken){
      return true
    }
  } 
  catch (error) {
    console.log("Token Inválido!: " + error)
  }
}

module.exports = checkToken;
