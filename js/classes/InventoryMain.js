// I create the Inventory class
class Inventory {
	// What to do when the class is initialized
	constructor() {
		this.items = [];
		this.inventory_container = document.querySelector("#inventory");
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

  drawInventory(c, camera) {
    if (this.displayInventory) {
			this.inventory_container.style.display = "grid";
    } else {
      this.inventory_container.style.display = "none";
    }

    if (this.renderInventory) {
      const durabilityScale = ["🟢", "🟡", "🟠", "🔴", "⚫"];
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

      this.inventory_container.innerHTML = inventory_slots.join("");
			this.renderInventory = false;
    }
  }

  // drawInventory(c, camera) {
  //   if (!this.showInventory) return;

  //   // Define the size and layout of the grid
  //   const boxSize = 50;
  //   const boxesPerRow = 4;
  //   const numRows = 3;

  //   // Draw the inventory box
  //   c.fillStyle = "rgba(0, 0, 0, 0.5)";
  //   c.fillRect(
  //     10 - camera.position.x,
  //     10 - camera.position.y,
  //     boxesPerRow * boxSize,
  //     numRows * boxSize
  //   );

  //   // Draw the items in a grid of boxes
  //   c.fillStyle = "white";
  //   this.items.forEach((item, index) => {
  //     const row = Math.floor(index / boxesPerRow);
  //     const col = index % boxesPerRow;

  //     const x = 10 + col * boxSize - camera.position.x;
  //     const y = 10 + row * boxSize - camera.position.y;

  //     // Draw the item name
  //     c.font = `${boxSize / 8}px Arial`;
  //     c.fillText(item.itemName, x + 5, y + 10);

  //     // Draw the item emoji
  //     c.font = `${boxSize / 3}px Arial`;
  //     c.fillText(item.emoji, x + 5, y + boxSize / 2 + 10);

  //     // Draw item stats
  //     c.font = `${boxSize / 9}px Arial`;
  // 		const offsetX = boxSize / 2 + 3;
  // 		const offsetY = 15;
  // 		const step = boxSize / 8 + 1
  //     c.fillText(`💕 ${item.itemStats.additionalHealth}`, x + offsetX, y + offsetY + step);
  //     c.fillText(`🦘 ${item.itemStats.jumpIncrease}`, x + offsetX, y + offsetY + step * 2);
  //     c.fillText(`🚧 ${item.itemStats.pushResistance}`, x + offsetX, y + offsetY + step * 3);

  //     // Draw item durability
  //     const durability = item.itemDurability / item.itemMaxDurability;
  //     const durabilityScale = ['🟢', '🟡', '🟠', '🔴', '⚫'];
  //     const numDurabilitySymbols = Math.floor(durability * 5);
  //     const durabilitySymbols = durabilityScale[numDurabilitySymbols];
  //     c.font = `${boxSize / 10}px Arial`;
  //     c.fillText(`Durability: ${durabilitySymbols}`, x + 4, y + boxSize - 5);

  //     // this.itemDurability = itemDurability; 🧊 🟢🟡🟠🔴⚫
  //     // this.itemMaxDurability = itemMaxDurability;
  //     // this.itemStats = {
  //     // 		additionalHealth: additionalHealth, 💕
  //     // 		jumpIncrease: jumpIncrease, 🦘
  //     // 		pushResistance: pushResistance, 🚧
  //     // };
  //     // // Draw the item sprite
  //     // if (!item.sprite) {
  //     //   console.error(
  //     //     `Item ${item.itemName} has no sprite, setting default sprite.`
  //     //   );
  //     //   item.sprite = new Sprite({
  //     //     position: { x: x, y: y },
  //     //     imageSrc: "./img/itemExample.png",
  //     //     boxSize: boxSize,
  //     //   });
  //     // }
  //     // item.sprite.position = { x: x, y: y };
  //     // item.sprite.update();

  //     // Draw the border for each box
  //     c.strokeStyle = "white";
  //     c.lineWidth = 2;
  //     c.strokeRect(x, y, boxSize, boxSize);
  //   });
  // }
  // GRAPHICAL PART // GRAPHICAL PART// GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART
  // GRAPHICAL PART // GRAPHICAL PART // GRAPHICAL PART
  // GRAPHICAL PART // GRAPHICAL PART
}