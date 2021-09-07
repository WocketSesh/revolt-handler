const { Command } = require("../revolt-handler/main.js");

const unban = new Command({
	name: "unban",
	description: "Unbans a user",
	requiredRoles: [[], false],
});

unban.on("ran", (message, args) => {
	if (!args[0])
		return message.channel.sendMessage(
			"Invalid arguments, Expected: `!unban <user> <reason>`"
		);

	let user = args[0];
	let reason = args[1] ?? "No reason provided.";

	message.channel.server
		.unbanUser(user)
		.then((x) => {
			message.channel.sendMessage(
				`${message.author.username} unbanned ${user} for: ${reason}`
			);
		})
		.catch((e) => {
			message.channel.sendMessage(`Failed to unban ${user}`);
		});
});
