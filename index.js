const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
        .authenticate()
        .then(() => {
              console.log("Conexão feita com o banco de dados!");
        })
        .catch((msgErro) => {
            console.log(msgErro);
        })

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//permite enviar dados de formulário via JSON

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(req, res) => {
        //Buscar no banco todas as perguntas
        Pergunta.findAll({ raw: true, order:[
            ['id','DESC']
        ] }).then(perguntas => {
            //testar 
            //console.log(perguntas);
    
            //Passar dinamicamente para index.ejs
            res.render("index",{
                perguntas: perguntas
            });
        });                  
});



app.get("/pergunta",(req, res) => {
    res.render("pergunta");
});

app.get("/discussao",(req, res) => {
    res.render("discussao");
});

app.post("/perguntar",(req, res) => {
     /* primeiro debug para ver se recebeu o formulário
     res.send("Recebeu o formulário!");
     */
    
    /*Segundo debug para ver se recebe os dados do formulário com body-parser
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    console.log(`Titulo: ${titulo} e descrição: ${descricao}`);
    */
    
   var titulo = req.body.titulo;
   var descricao = req.body.descricao;
   
   Pergunta.create({
       titulo: titulo,
       descricao: descricao
   }).then(() => {
       res.redirect("/");
   });    
});

//Vai para página de discussão de acordo com o id
app.get("/discussao/:id",(req, res) => {
    var id = req.params.id;
    //console.log(id);
    //Busca no banco uma pergunta especifica
    Pergunta.findOne({
        where: {id:id}
    }).then((pergunta) => {
        if(pergunta != undefined){

            //Todas as respostas vinculada a essa pergunta
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("discussao", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else{
            res.redirect("/");
        }

    });    
    /*
    res.render("discussao",{
        idPassado: id
    });*/

});

//Armazenar a resposta no banco
app.post("/responder",(req, res) => {
       var resposta = req.body.resposta;
       var id = req.body.id;

       /*  Teste:
       console.log(id);
       console.log(resposta);  
       */

       Resposta.create({
           corpo: resposta,
           PerguntaId: id
       }).then(() => {
        res.redirect("/discussao/"+id); 
       });
       
});



app.listen(8080,()=>{console.log("App rodando");});