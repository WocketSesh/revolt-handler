const { Events } = require("./EventEmitter/module");
const c = [];

/**
 * Create a new command object
 * @param {string} name - Name of command
 * @param {array} aliases - Array of command aliases
 * @param {string} description - Description of command
 * @param {string} requiredPermission - requiredPermission to run command
 * @example
 * const ping = new Command({
 *	name: "ping",
 *	aliases: ["p"],
 *	description: "Returns Pong!",
 * });
 */
class Command extends Events {
	constructor({ name, aliases, description, requiredPermission }) {
		super();
		this.name = name;
		this.aliases = aliases ?? [];
		this.description = description;
		this.requiredPermission = requiredPermission;

		c.push(this);
	}
}

/**
 * Checks sent message for a command
 * @param {message} message - Revolt message object
 * @param {string} prefix - Your bots prefix
 * @returns {void}
 * @example
 * client.on("message", async (message) => {
 *	checkForCommand(message, "!");
 * });
 */
const checkForCommand = (message, prefix) => {
	let recieved = new Date().getTime();

	if (!message || !message.content || !prefix) return;

	if (!message.content.startsWith(prefix)) return;

	let command = message.content.split(" ")[0].slice(prefix.length),
		args = message.content.split(" ").splice(1);

	let r = c.filter((x) => x.name == command || x.aliases.includes(command));

	if (!r[0]) return;

	r = r[0];

	r.emit("ran", message, args, recieved);
};

module.exports = { checkForCommand, Command };
