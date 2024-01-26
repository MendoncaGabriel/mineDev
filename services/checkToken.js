// Middleware para verificar o token
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.render('loginAdm'); // Redireciona para a página de login
  }

  // Valida se o token é correto
  try {
    const secret = process.env.SECRET;
    const decodedToken = jwt.verify(token, secret);

    // Verifica se o usuário é um administrador
    if (decodedToken.role !== 'admin') {
      return res.render('acessoNegado'); // Redireciona para a página de acesso negado para não administradores
    }

    // Adicione informações do usuário ao objeto de solicitação se necessário
    req.user = decodedToken;

    // Avança para a próxima middleware ou rota
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token Inválido!" });
  }
}

module.exports = checkToken;
