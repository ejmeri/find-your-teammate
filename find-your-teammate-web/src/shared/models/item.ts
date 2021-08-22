export class Item {
	id: string;
	text: string;

	constructor(id: string, text: string) {
		this.id = id;
		this.text = text;
	}

	public static of(id: string, text: string): Item {
		return new Item(id, text);
	}
}
