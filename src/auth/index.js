const Discord = require('discord.js')
const data = require('../../data/')

const userData = {
    course: '',
    ra: '',
    birthDate: '',
}

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