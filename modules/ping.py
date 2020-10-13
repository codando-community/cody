class Ping:
    def __init__(self, cody):
        self.cody = cody

    async def on_message(message):
        print('Message from {0.author}: {0.content}'.format(message))