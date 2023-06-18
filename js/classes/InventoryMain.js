// I create the Inventory class
class Inventory {
	// What to do when the class is initialized
	constructor() {
		this.items = [];
		this.inventory_container = document.querySelector("#inventory");
		this.backpack_container = document.querySelector('#backpack');
		this.hero_container = document.querySelector('#hero')
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
	 * @param {String} item emoji of item
	 * @returns {Number} the number of items in the inventory
	 */
	addItem(
    name,
    desc,
    durability,
    maxDurability,
    health,
    jump,
    resistance,
    special,
    sprite,
    emoji
  ) {
    this.items.push(
      new Item(
        name,
        desc,
        durability,
        maxDurability,
        health,
        jump,
        resistance,
        special,
        sprite,
        emoji
      )
    );

    return this.items.length;
  }

  /**
   * I remove an item from inventory
   * @param {String} item name
   * @returns {Boolean} true or false if the item has been removed successfully
   */
  removeItem(name) {
    this.items.forEach((inventory) => {
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
    this.displayInventory = false;
    this.renderInventory = false;
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
   * @param {String} item emoji of item
   * @returns {Number} the number of items in the inventory
   */
  addItem(Item) {
    this.size = 12;
    if (this.items.length >= this.size) {
      console.log("backpack is full");
      return false;
    } else {
      super.addItem(
        Item.itemName,
        Item.itemDescription,
        Item.itemDurability,
        Item.itemMaxDurability,
        Item.itemStats.additionalHealth,
        Item.itemStats.jumpIncrease,
        Item.itemStats.pushResistance,
        Item.special,
        Item.sprite,
        Item.emoji
      );

      return true;
    }
  }

  showInventory() {
    this.displayInventory = !this.displayInventory;
    this.renderInventory = this.displayInventory;
  }

	renderBackpack() {
		const durabilityScale = ['⚫', '🔴', '🟠', '🟡', '🟢'];
      const inventory_slots = this.items.map(
        (item) => /*html*/ `<div class="inventory-slot">
					<p class="item-title">${item.itemName}</p>
					<p class="item-emoji">${item.emoji}</p>
					<div class="item-stats">
						<p title="Additional Health">💕 ${item.itemStats.additionalHealth}</p>
						<p title="Jump Increase">🦘${item.itemStats.jumpIncrease}</p>
						<p title="Push Resistance">🚧 ${item.itemStats.pushResistance}</p>
					</div>
					<div
						title="${item.itemDurability} / ${item.itemMaxDurability}"
						class="item-durability"
					>
						Durability:
						${
              durabilityScale[
                Math.floor((item.itemDurability / item.itemMaxDurability) * 5)
              ]
            }
					</div>
				</div>`
      );

      this.backpack_container.innerHTML = inventory_slots.join("");
	}

  drawInventory(c, camera) {
    if (this.displayInventory) {
			this.inventory_container.style.display = "grid";
    } else {
      this.inventory_container.style.display = "none";
    }

    if (this.renderInventory) {
      this.renderBackpack();
			this.renderInventory = false;
    }
  }

  // GRAPHICAL PART // GRAPHICAL PART
}