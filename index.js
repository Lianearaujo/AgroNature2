const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Cadastro = require("./database/Cadastro");
//const Lista = require("./database/Lista");
var path = require('path');
const req = require("express/lib/request");
const fs = require("fs");
const res = require("express/lib/response");


//BANCO DE DADOS ---------------------------------------------------------------
connection.authenticate().then(() => {console.log("Conexão feita com o banco de dados!")})
.catch((erro) => {
  console.log(erro)
});

//BIBLIOTECAS ------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//TESTES ------------------------------------------------------------------------

// if (req.url === "/"){
//   const lista = path.join(__dirname,'views', 'lista.html');
//   fs.readFileSync(lista, 'utf8', (err,data) => {
//     if (err) throw err;
//     console.log('funcionando');
//     //res.end(agendamentoConcluido)
//   })

// }



//ROTAS ------------------------------------------------------------------------
app.get("/", (req, res) => {
  //Cadastro.findAll()
  //.then((cadastro) => {
    res.render("index");
  //})

})





app.get("/cadastrar", (req, res) => {
  res.render("cadastro")
})




app.post("/salvaragendamento",(req, res) => {
  let nome = req.body.nome;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let complemento = req.body.complemento;
  let endereco = req.body.endereco;
  let data = req.body.data;
  
  Cadastro.create({
    nome: nome,
    email: email,
    telefone: telefone,
    complemento: complemento,
    endereco: endereco,
    data: data
  }).then(() => {
        res.redirect("/agendamentoConcluido")
      })
})



app.get("/lista", async(req, res) => {
  await Cadastro.findAll()
  .then((dataCadastros) =>{
      return res.json({
        erro:false,
        dataCadastros
      })
  }).catch(()=>{
    return res.status(400).json({
      erro:true
    })
  })
})


app.get("/agendamentoConcluido", (req, res) => {
    res.render('agendamento'); 
  })

//SERVIDOR LOCAL ---------------------------------------------------------------
app.listen(5656, () =>{
  console.log("A aplicação está funcionando!");
})