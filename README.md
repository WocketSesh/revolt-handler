# Revolt Command Handler

#npm i revolt-handler

```js
const revolt = require("revolt.js");
const client = new revolt.Client();
const { Command, checkForCommand } = require("revolt-handler");

client.loginBot("token");

client.on("ready", () => console.log('Logged in')

const ping = new Command({
	name: "ping",
	aliases: ["p"],
	description: "Returns Pong!",
});

ping.on("ran", (message, args, exec) => {
	message.channel.sendMessage(`Pong! \`Took 0ms to execute\``).then((x) => {
		x.edit({
			content: `Pong! \`Took ${new Date().getTime() - exec}ms to execute\``,
		});
	});
});

client.on("message", async (message) => {
	checkForCommand(message, "!");
});
```
