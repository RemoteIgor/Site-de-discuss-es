const Sequelize = require("sequelize");//importa o sequelize
const connection = require("./database");//importa a conexão
                                   //perguntas é o nome da tabela
const Pergunta = connection.define('perguntas',{
	//Definiu os campos titulo e descricao
    titulo:{
        type: Sequelize.STRING, //Tipo do campo - STRING, TEXT, INTEGER, BOOLEAN....
        allowNull: false        //false- não ficar vazio, true- pode ficar vazio 
    },
    descricao:{
        type: Sequelize.TEXT, //TEXT são tipos de textos maiores
        allowNull: false
    }
});

//Sincroniza com o banco de dados
//force: false- se já existir no banco não vai forçar a criação da tabela
Pergunta.sync({force: false}).then(() => {});
//Exporta para ser usado em outros lugares
module.exports = Pergunta;