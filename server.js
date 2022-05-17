const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Cadastro = require("./database/Cadastro");
const Entrar = require("./database/Entrar");
const transporter = require("./database/nodemailer");
const md5 = require('md5');

//BANCO DE DADOS ---------------------------------------------------------------
connection.authenticate().then(() => {console.log("Conexão feita com o banco de dados!")})
.catch((erro) => {
  console.log(erro)
});

//BIBLIOTECAS ------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS ------------------------------------------------------------------------
app.get("/", (req, res) => {
  Cadastro.findAll()
  .then((cadastro) => {
    res.render("index", {cadastro: cadastro});
  })

})

app.get("/Entrar", (req, res) => {
  Cadastro.findAll()
  .then((cadastro) => {
    res.render("login", {cadastro: cadastro});
  })

})

app.post("/login", (req, res) => {
  let email = req.body.email;
  let senha = md5(req.body.senha);

  Cadastro.findOne({
    where: {email: email, senha: senha}
  }).then((cadastro) => {
    if(cadastro != undefined){
      res.render("obrigado")
    } else if (email == '' || senha == '' || cadastro == undefined) {
      res.redirect("/", {cadastro: cadastro})
    }
  })
    
})

app.get("/cadastrar", (req, res) => {
  res.render("cadastro")
})

app.post("/salvarcadastro",(req, res) => {
  let nome = req.body.nome;
  let email = req.body.email;
  let senha = md5(req.body.senha);
  let confisenha = md5(req.body.confisenha);
  
  Cadastro.create({
    nome: nome,
    email: email,
    senha: senha
  }).then(() => {
    if(senha != confisenha || nome == "" || email == "" || senha == "" || confisenha == ""){
      Cadastro.destroy({
        where: {
          nome: nome,
          email: email,
          senha: senha
        }
      }).then(() => {
        res.redirect("/cadastrar")
      })
      
       
    } else {
      res.redirect("/")
      transporter.sendMail({
        from: "Liane Araujo <lianearaujo177@gmail.com>",
        to: email,
        subject: "Obrigado por testar minha aplicação!",
        html: `
          <html>
          <body>
            <p>Olá <strong>${nome}</strong> Obrigado</p>
            <p>Teste</p><br><br>
            
          </body>
          </html>
        `
      }).then((msg) => {
        console.log(msg);
      }).catch((erro) => {
        console.log(erro);
      })
    }
    
  })
})

//SERVIDOR LOCAL ---------------------------------------------------------------
app.listen(8080, () =>{
  console.log("A aplicação está funcionando!");
})