var a = [];

class Events {
	constructor() {}

	on(event, func) {
		this.event = event;
		if (typeof func != "function") return;
		this.func = func;

		a.push(this);
	}

	emit(event) {
		let e = a.filter((x) => x == this && x.event == event);
		if (!e[0]) return;

		e[0].func(...[...arguments].splice(1));
	}
}

module.exports = { Events };
