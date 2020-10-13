from discord import Client
import json

with open('data/settings.json') as f:
    settings = json.load(f)

cody = Client()

@cody.event
async def on_ready():
    print('Ahoy!')


# @cody.event
# async def on_member_join(member):
#     cody.user.send_message(member, 'batata')

@cody.event
async def on_message(message):
    if (message.channel.id == settings['CHANNEL_MEMES_ID']):
        if (message.author != cody.user):
            if (len(message.attachments)):
                await message.add_reaction('😂')

    if (message.channel.id == settings['CHANNEL_AVISOS_ID']):
        if (message.author != cody.user):
            await message.add_reaction('✅')
            await message.add_reaction('💯')
            await message.add_reaction('💖')

    if (message.content.lower().find('enviar para') != -1):
        if (message.content.lower().find('mensagem:') != -1):
            if len(message.mentions) > 0:
                for user in message.mentions:
                    await user.send(message.content.split('mensagem:')[1])

            elif len(message.role_mentions) > 0:
                for role in message.role_mentions:
                    for member in role.members:
                        await print(member) #mano do céu socorro

            elif len(message.channel_mentions) > 0:
                print('elif')

            # await message.channel.send('????')
            # await message.channel.send('Hello!')
            # print('aaaaaaaaaaaaaabeh')

cody.run(settings['BOT_TOKEN'])