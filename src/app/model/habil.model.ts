export abstract class HabilModel {
	constructor(object?: any) {
		if (object) {
			for (const key of Object.keys(object)) {
				this[key] = object[key];
			}
		}
	}
}