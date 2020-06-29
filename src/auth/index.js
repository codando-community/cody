const Discord = require('discord.js')

// TODO substituir por 'alunos_ti_a.json' => o arquivo está com alguns problemas de codificação (carcteres especiais), é necessário corrígí-los, grande maioria já corrigida
const data = require('../../data/')

//array de dados capturados através da coversa com o bot
const userData = {
    course: '',
    ra: '',
    birthDate: '',
}

// inteligência de chat: reconhecimento e termos semelhantes porém não exatos (nice to have! - não está implementado ainda)
const possibilities = {
    autenticate = ["autentica", "autenticar", "autenticação", "autenticar-me"],
    courses = [
        ["Sistemas de Informação", "Sistema de Informação", "Sistemas de Informaçao", "Sistemas de Informacão","Sistemas de Informacao", "Sistema de Informaçao", "Sistema de Informacão","Sistema de Informacao"],
        ["Ciência da Computação","Ciencia da Computaçao","Ciencia da Computacão","Ciencia da Computacao","Ciência da Computacão","Ciência da Computaçao","Ciência","Ciencia"],
        ["ADS","Análise e Desenvolvimento de Sistemas","Analise e Desenvolvimento de Sistemas"],
        ["Sistemas para Internet","Sistemas de Internet","Sistemas da Internet","Sistemas para a Internet"],
        ["Defesa Cibernética","Defesa Cibernetica","Defesa Cyber"],
        ["Engenharia da Computação","Engenharia da Computaçao", "Engenharia da Computacao","Engenharia da Computacão",]
        ["Gestão de Tecnologia da Informação","Gestão de Tecnologia da Informaçao","Gestão de Tecnologia da Informacão","Gestão de Tecnologia da Informacao","Gestão","Gestao","Gestão de Tecnologia de Informação","Gestão de Tecnologia de Informaçao","Gestão de Tecnologia de Informacão","Gestão de Tecnologia de Informacao],
        ["Redes de Computadores","Redes"],
        ["Segurança da Informação","Seguranca da Informação","Seguranca da Informacão","Seguranca da Informacao","Seguranca da Informaçao","Segurança da Informacao","Segurança da Informacão","Segurança de Informação","Seguranca de Informação","Seguranca de Informacão","Seguranca de Informacao","Seguranca de Informaçao","Segurança de Informacao","Seguraça de Informacão"],
        ["Banco de Dados","BD"],
        ["Jogos Digitais"]
    ]
}

// inicio da conversa de autenticação
module.exports = client => {
    client.on('message', msg => {
        if ((msg.content.toLowerCase().indexOf('autenticar') !== -1
        || msg.content.toLowerCase().indexOf('autenticação') !== -1)) {
            if(msg.channel.type == 'dm') {
                msg.reply("Olá, sou Cody e vou te auxiliar nessa jornada!\nMe informe primeiro em qual curso está matriculado(ex: --curso Ciência da Computação)")
                getCourse(client)
            } else {
                console.log(msg)
                msg.reply("nós não podemos fazer esse procedimento por aqui, ele é sigiloso 🤫\nMe chame no privado para que eu possa te ajudar melhor 😉")
            }
        }
    });
}

// método para capturar o curso do usuário
const getCourse = (client) => {
    client.on('message', msg => {
        if (msg.author != client.user) {
            if(msg.content.indexOf("--curso") != -1) {
                let temp = msg.content.split(" ")
                userData.course = temp[temp.length-1]
                console.log(userData)
                msg.reply("Qual o número da sua matrícula/RA (ex: --ra 01234567)?")
                getRA(client)
            } else {
                msg.reply("getCourse")
            }
        }
    });
}

// método para capturar o RA do usuário
const getRA = (client) => {
    client.on('message', msg => {
        if (msg.author != client.user) {
            if(msg.content.indexOf("--ra") != -1) {
                let temp = msg.content.split(" ")
                userData.ra = temp[temp.length-1]
                console.log(userData)
                msg.reply("Qual a sua data de nascimento? (ex: --dn 01/01/2000)")
                getBirthDate(client)
            } else {
                msg.reply("getRA")
            }
        }
    });
}

// método para capturar a data de nascimento do usuário
const getBirthDate = (client) => {
    client.on('message', msg => {
        if (msg.author != client.user) {
            if(msg.content.indexOf("--dn") != -1) {
                let temp = msg.content.split(" ")
                userData.dn = temp[temp.length-1]
                console.log(userData)
                validate(client, msg.channel)
            } else {
                msg.reply("getBirth")
            }
        }
    });
}

const validate = (client, channel) => {
    for (let i=0; i<data.page1.length; i++) {
        if (data.page1[i].course == userData.course) {
            if (data.page1[i].ra == userData.ra) {
                if (data.page1[i].bd == userData.birthDate) {
                    return console.log("certooo") //TA DANDO ERRO AQUI
                } else {
                    console.log("dn errado")
                }
            } else {
                console.log("aluno inexistente, tente novamente.")
            }
        } else {
            console.log("curso inexistente, tente novamente.")
        }
    }
}
