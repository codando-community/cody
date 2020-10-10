from discord import Client
import settings

cody = Client()

@cody.event
async def on_ready():
    print('Logged on as {0}!'.format(cody.user))

# @cody.event
# async def on_member_join(member):
#     cody.user.send_message(member, 'batata')

@cody.event
async def on_message(message):
    print('Message from {0.author}: {0.content}'.format(message))

    if (message.channel.id == settings.CHANNEL_MEMES_ID):
        if (message.author != cody.user):
            if (len(message.attachments)):
                await message.add_reaction('😂')

    if (message.channel.id == settings.CHANNEL_AVISOS_ID):
        if (message.author != cody.user):
            await message.add_reaction('✅')
            await message.add_reaction('💯')
            await message.add_reaction('💖')

    if (message.content.lower().find('enviar para') != -1):
        if (message.content.lower().find('mensagem:') != -1):
            # await message.channel.send('Hello!')
            print('aaaaaaaaaaaaaabeh')



cody.run(settings.BOT_TOKEN)