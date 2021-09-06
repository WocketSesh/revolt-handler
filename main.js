const { Events } = require("./EventEmitter/module");
const c = [];

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

const checkForCommand = (message, prefix) => {
	let recieved = new Date().getTime();

	if (!message || !message.content || !prefix) return;

	if (!message.content.startsWith(prefix)) return;

	let command = message.content.split(" ")[0].slice(prefix.length),
		args = message.content.split(" ").splice(1);

	let r = c.filter((x) => x.name == command);

	if (!r[0]) r = c.filter((x) => x.aliases.includes(command));

	if (!r[0]) return;

	r = r[0];

	r.emit("ran", message, args, recieved);
};

module.exports = { checkForCommand, Command };
