// server/server.js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

// Funções de manipulação de JSON
const loadJSON = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const saveJSON = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// Carrega usuários
const usersPath = './users.json';
let users = loadJSON(usersPath);

// Middleware de autenticação
function authenticate(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).send('Você precisa estar autenticado para acessar esta página.');
}

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.email;
        console.log("Login realizado com sucesso"); // Verifica se a condição passa
        res.status(200).json({ message: 'Login realizado com sucesso' });
    } else {
        console.log("Credenciais inválidas"); // Verifica se o erro ocorre aqui
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

// Rota de cadastro
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { email, password: hashedPassword };

    users.push(newUser);
    saveJSON(usersPath, users);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout bem-sucedido' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
