const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// -----------------------------
// VALIDADORES
// -----------------------------
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidUsername(username) {
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(username);
}

function isStrongPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

// -----------------------------
// MIDDLEWARE DE VALIDAÇÃO
// -----------------------------
server.post("/users", (req, res, next) => {
  const { email, username, password } = req.body;

  // ❗ Impedir que o POST receba id
  if ("id" in req.body) {
    delete req.body.id;
  }

  // Campos obrigatórios
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Email válido
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido." });
  }

  // Username válido
  if (!isValidUsername(username)) {
    return res.status(400).json({
      error:
        "O username deve ter pelo menos 3 caracteres e apenas letras, números ou _.",
    });
  }

  // Password forte
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error:
        "A password deve ter pelo menos 6 caracteres, incluindo letras e números.",
    });
  }

  // Verificar duplicados
  const users = router.db.get("users").value();
  const emailExists = users.some((u) => u.email === email);
  const usernameExists = users.some((u) => u.username === username);

  if (emailExists) {
    return res.status(400).json({ error: "Este email já está registado." });
  }

  if (usernameExists) {
    return res.status(400).json({ error: "Este username já está em uso." });
  }

  next();
});

// -----------------------------
// INICIAR SERVIDOR
// -----------------------------
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server com middleware ativo na porta 3000");
});
