// I create the Inventory class
class Inventory {
	// What to do when the class is initialized
	constructor() {
		this.items = [];
	}

	/**
	 * I look at what I carry in my inventory
	 * @returns {Boolean} true or false if there are items
	 */
	getItems () {
		if (this.items[0]) {
			console.log("You carry:");
			this.items.forEach(item=> {
				console.log(`* ${item.itemName}`);
			});
			return true;
		} else {
			console.log("You have nothing.");
			return false;
		}
	}

	/**
	 * I check if an item exists
	 * @param {String} item name
	 * @returns {Boolean} true or false if the item exists
	 */
	hasItem (name) {
		for (var i in this.items) {
			if (name == this.items[i].itemName) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * I add an item to the inventory
	 * @param {String} item name
	 * @param {String} item description
	 * @param {String} item durability
	 * @param {String} item maxDurability
	 * @param {String} item health
	 * @param {String} item jump power
	 * @param {String} item resistance
	 * @param {String} item special
	 * @param {String} item image source
	 * @returns {Number} the number of items in the inventory
	 */
	addItem(name, desc, durability, maxDurability, health, jump, resistance, special, sprite) {
        this.items.push(new Item(name,
			desc,
			durability, 
			maxDurability, 
			health, 
			jump, 
			resistance, 
			special, 
			sprite));
		
		return this.items.length;
	}

	/**
	 * I remove an item from inventory
	 * @param {String} item name
	 * @returns {Boolean} true or false if the item has been removed successfully
	 */
	removeItem (name) {
		this.items.forEach(inventory => {
			if (name == inventory.name) {
				this.items.pop(inventory.name);
				return true;
			} else {
				return false;
			}
		});
	}
}

// BackPack inherits methods and properties from Inventory
class BackPack extends Inventory {
    constructor() {
        super();
        this.showInventory = false;
    }

   




	/**
	 * I add an item to the inventory
	 * @param {String} item name
	 * @param {String} item description
	 * @param {String} item durability
	 * @param {String} item maxDurability
	 * @param {String} item health
	 * @param {String} item jump power
	 * @param {String} item resistance
	 * @param {String} item special
	 * @param {String} item image source
	 * @returns {Number} the number of items in the inventory
	 */
	addItem (Item) {
		this.size = 12;
		if (this.items.length >= this.size) {
			console.log("backpack is full");
			return false;
		} else {
			

			super.addItem(Item.itemName, 
				Item.itemDescription, 
				Item.itemDurability,
				Item.itemMaxDurability, 
				Item.additionalHealth, 
				Item.jumpIncrease, 
				Item.pushResistance, 
				Item.special, 
				Item.sprite);



			return true;
		}
	}

	

	drawInventory(c, camera) {
		if (!this.showInventory) return;
	
		// Define the size and layout of the grid
		const boxSize = 25;
		const boxesPerRow = 4;
		const numRows = 3;
	
		// Draw the inventory box
		c.fillStyle = 'rgba(0, 0, 0, 0.5)';
		c.fillRect(10 - camera.position.x, 10 - camera.position.y, boxesPerRow * boxSize, numRows * boxSize);
	
		// Draw the items in a grid of boxes
		c.fillStyle = 'white';
		c.font = `${boxSize / 5}px Arial`;
		this.items.forEach((item, index) => {
			const row = Math.floor(index / boxesPerRow);
			const col = index % boxesPerRow;
	
			const x = 10 + col * boxSize - camera.position.x;
			const y = 10 + row * boxSize - camera.position.y;
	
			// Draw the item name
			c.fillText(item.itemName, x, y + 20);
	
			// Draw the item sprite
			if (!item.sprite) {
				console.error(`Item ${item.itemName} has no sprite, setting default sprite.`);
				item.sprite = new Sprite({
					position: { x: x, y: y },
					imageSrc: "./img/itemExample.png",
					boxSize: boxSize
				});
			}
			item.sprite.position = { x: x, y: y };
			item.sprite.update();
	
			// Draw the border for each box
			c.strokeStyle = 'white';
			c.lineWidth = 2;
			c.strokeRect(x, y, boxSize, boxSize);
		});
	}
// GRAPHICAL PART // GRAPHICAL PART// GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART
// GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART
// GRAPHICAL PART // GRAPHICAL PART

}