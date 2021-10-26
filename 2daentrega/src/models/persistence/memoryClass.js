export default function Memory() {
	this.connection = [];
	this.inicializateSchemas = async () => {
		this.connection.products = [];
		this.connection.cart = [];
		return 'Arrays en memoria inicializados';
	};
	this.create = (objectName, items) => {
		this.connection[objectName].push(items);
		return items;
	};
	this.find = (objectName) => this.connection[objectName];
	this.findById = (objectName, id) =>
		this.connection[objectName].find((p) => p.id == id) || false;

	this.update = (objectName, id, items) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		let product = this.findById(objectName, id);
		index && (this.connection[objectName][index] = {id: product.id, ...items});
		return this.findById(objectName, id);
	};
	this.remove = (objectName, id) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		if (index > -1) {
			this.connection[objectName].splice(index, 1);
			return 'Removed';
		} else {
			return false;
		}
	};
	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}
