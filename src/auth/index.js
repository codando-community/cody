const Discord = require('discord.js')

const config = require('../../data/botconfig.json')
const data = require('../../data/alunos_ti_29.json')
const possibilities = require('./possibilities.json')

//array de dados capturados através da coversa com o bot
const userData = {
    course: null,
    ra: null,
    bd: null,
}

// inicio da conversa de autenticação
// module.exports = client => {
//     client.on('message', msg => {
//         if (matchPossibilities(msg.content, possibilities.autenticate) && msg.author !== client.user) {
//             if(msg.channel.type == 'dm') {
//                 msg.reply("Olá, sou Cody e vou te auxiliar nessa jornada!\nMe informe primeiro em qual curso está matriculado(ex: Ciência da Computação)")
//             } else {
//                 msg.reply("nós não podemos fazer esse procedimento por aqui, ele é sigiloso 🤫\nMe chame no privado para que eu possa te ajudar melhor 😉")
//             }
//         }
//     });
//     getCourse(client)
//     getRA(client)
//     // getBirthDate(client)
// }



// método para capturar o curso do usuário
const getCourse = client => {
    client.on('message', msg => {
        if (msg.author !== client.user) {
            if(matchPossibilities(msg.content, possibilities.courses)) {
                userData.course = msg.content
                msg.reply("Qual o número da sua matrícula/RA? (ex: ra=01234567)")
            }
        }
    });
}

// método para capturar o RA do usuário
const getRA = client => {
    client.on('message', msg => {
        if (msg.author != client.user) {
            if(msg.content.toLowerCase().indexOf("ra=") != -1) {
                let temp = msg.content.split("=")
                userData.ra = temp[temp.length-1]
                msg.reply("Qual a sua data de nascimento? (ex: 2000-03-31)")
            }
        }
    });
}

// método para capturar a data de nascimento do usuário
const getBirthDate = client => {
    client.on('message', msg => {
        if (msg.author != client.user) {
            if(msg.content.indexOf("-") != -1 && msg.channel.type == 'dm') {
                userData.bd = msg.content
                validate(client, msg)
            }
        }
    });
}

const validate = (client, msg) => {
    for (let i=0; i<Object.keys(data).length; i++) {
        if (data[i].Matricula === userData.ra) {
            if (data[i].Curso === userData.course) {
                // if (data[i].Dat_Nascimensto === userData.bd) {
                    acess(client, msg.author.id)
                    return msg.reply("Olá " +data[i].Nome + "\nSeu acesso aos outros canais do servidor acaba de ser liberado!\nPor favor, leia as regras e aproveite 😉")
                // }
            }
        }

        if (i+1 == Object.keys(data).length) {
            msg.reply("Oops, não encontrei o seu cadastro🤔\nVamos recomeçar:")
        }
    }
}

const acess = (client, userId) => {
    let role =  client.guilds.cache.find(g => g.id === config.guild.id).roles.cache.find(role => role.id === config.guild.roles.aluno)
    let member = client.guilds.cache.find(g => g.id === config.guild.id).members.cache.find(m => m.id === userId)
    member.roles.add(role).catch(console.error)
}

const matchPossibilities = (content, terms) => {
    for (let i = 0; i<terms.length; i++) {
        if (content.toLowerCase().indexOf(terms[i].toLowerCase()) != -1) {
            return true
        }
    }
    return false
}

// const verifyPossibilities = (content, possibilities) => {
//     for (let i = 0; i<possibilities.length; i++)
//         for (let j = 0; j<possibilities[i].length; i++)
//             if(content.toLowerCase().indexOf(possibilities[i][j].toLowerCase()) != -1)
//                 return true
            
//     return false
// }

// atribuir um novo cargo para a pessoa e assim ter acesso aos canais