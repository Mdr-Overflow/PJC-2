// I create the Inventory class

const mapToEquipmentArray = (item) => {
  switch(item.type) {
    case "left_arm" : return 0;
    case "head" : return 1;
    case "body" : return 2;
    case "legs" : return 3;
    case "right_arm" : return 4;
    default: return -1;
  }
}

const mapFromIndexToHeroModel = (index) => {
  switch(index) {
    case 0: return "left_arm";
    case 1: return "head";
    case 2: return "body";
    case 3: return "legs";
    case 4: return "right_arm";
    default: return null;
  }
}
class Inventory {
	// What to do when the class is initialized
	constructor() {
		this.items = [];
		this.inventory_container = document.querySelector("#inventory");
		
    this.backpack_container = document.querySelector('#backpack');
    
		this.hero_container = document.querySelector('#hero');
    this.hero_stats = document.querySelector('#hero-stats')
		this.hero_model = {
      left_arm : document.querySelector("#hero-model #left-arm"),     // 0
			head : document.querySelector("#hero-model #head"),             // 1
			body : document.querySelector("#hero-model #body"),             // 2
			legs : document.querySelector("#hero-model #legs"),             // 3
			right_arm : document.querySelector("#hero-model #right-arm"),   // 4
		};
    this.hero_equipment = [null, null, null, null, null];
    
    this.current_backpack_item = null;
    this.current_hero_item = null;

    this.durabilityScale = ['⚫', '🔴', '🟠', '🟡', '🟢', '👌'];
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
    emoji,
    type
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
        emoji,
        type
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
   * @param {String} item type
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
        Item.emoji,
        Item.type
      );

      return true;
    }
  }

  showInventory() {
    this.displayInventory = !this.displayInventory;
    this.renderInventory = this.displayInventory;
  }

  selectBackpackItem(itemName) {
    this.current_backpack_item = this.items.find(item => item.itemName == itemName);
    this.renderInventory = true;
  }

  equipCurrentBackpackItem() {
    this.items = this.items.filter(item => item.itemName != this.current_backpack_item?.itemName);
    const equipIndex = mapToEquipmentArray(this.current_backpack_item);
    if(equipIndex < 0) return;

    if(this.hero_equipment[equipIndex] != null) {
      this.items.push(this.hero_equipment[equipIndex])
    }
    this.hero_equipment[equipIndex] = this.current_backpack_item;
    this.current_backpack_item = null;
    this.renderInventory = true;

	// HANDLE PLAYER


  }

  dropCurrentBackpackItem() {
    this.items = this.items.filter(item => item.itemName != this.current_backpack_item?.itemName);
    this.current_backpack_item = null;
    this.renderInventory = true;
  }

  performBackpackItemAction(action) {
    if(action == null || action.length == 0) return;

    switch (action) {
      case 'equip': this.equipCurrentBackpackItem(); break
      case 'drop': this.dropCurrentBackpackItem(); break
    }
  }

  selectHeroItem(itemName) {
    this.current_hero_item = this.hero_equipment.find(item => item?.itemName == itemName);
    this.renderInventory = true;
  }

  unequipCurrentHeroItem() {
    this.items.push(this.current_hero_item);
    this.hero_equipment[mapToEquipmentArray(this.current_hero_item)] = null;
    this.current_hero_item = null;
    this.renderInventory = true;
  }

  dropCurrentHeroItem() {
    this.hero_equipment[mapToEquipmentArray(this.current_hero_item)] = null;
    this.renderInventory = true;
  }

  performHeroItemAction(action) {
    if(action == null || action.length == 0) return;

    switch (action) {
      case 'unequip': this.unequipCurrentHeroItem(); break
      case 'drop': this.dropCurrentHeroItem(); break
    }
  }

	renderBackpack() {
      const inventory_slots = this.items.map(
        (item) => /*html*/ `<div class="inventory-slot ${item.itemName == this.current_backpack_item?.itemName ? 'current' : ''}">
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
              this.durabilityScale[
                Math.floor((item.itemDurability / item.itemMaxDurability) * 5)
              ]
            }
					</div>
          <div class="action-section">
            <button data-action="equip">equip</button>
            <button data-action="drop">drop</button>
          </div>
				</div>`
      );

      this.backpack_container.innerHTML = inventory_slots.join("");
	}

	renderHeroSection() {
    this.hero_equipment.forEach((item, index) => {
      if(item) {
        this.hero_model[item.type].innerHTML = /*html*/`
        <div class="inventory-slot ${item.itemName == this.current_hero_item?.itemName ? 'current' : ''}">
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
              this.durabilityScale[
                Math.floor((item.itemDurability / item.itemMaxDurability) * 5)
              ]
            }
          </div>
          <div class="action-section">
            <button data-action="unequip">unequip</button>
            <button data-action="drop">drop</button>
          </div>
        </div>
        `; 
      } else {
        this.hero_model[mapFromIndexToHeroModel(index)].innerHTML = '';
      }
    })
	}

  renderStatsSection() {
    const stats = this.hero_equipment.reduce((acc, current) => {
      if(current) {
        acc.additionalHealth += current.itemStats.additionalHealth;
        acc.jumpIncrease += current.itemStats.jumpIncrease;
        acc.pushResistance += current.itemStats.pushResistance
      }
      return acc;
    }, {
      additionalHealth: 0,
      jumpIncrease: 0,
      pushResistance: 0,
    })
    
    const currentHealth = 40;
    const maxHealth = 50
    const totalHealth = maxHealth + stats.additionalHealth;
    const healthPercent = Math.round((currentHealth / totalHealth) * 100)
    this.hero_stats.innerHTML = /* html */ `
      <div class="stats">
        <p class="item-title">Stats</p>
        <div>🦘Jump Strength: ${stats.jumpIncrease}</div>
        <div>🚧 Push Resistance: ${stats.pushResistance}</div>
        <div>💕 Health: ${currentHealth}/${totalHealth}</div>
        <div class="health-bar">
          <div style="width: ${healthPercent}%;">${healthPercent}%</div>
        </div>
      </div>
      <div>
        <p class="item-title">Coins</p>
        <div class="character-currency">
            <p>🟡<span class="currency-gold">1</span></p>
            <p>⚪<span class="currency-silver">99</span></p>
            <p>🟤<span class="currency-copper">99</span></p>
        </div>
      </div>
    `;
  }
  drawInventory(c, camera) {
    if (this.displayInventory) {
			this.inventory_container.style.display = "grid";
    } else {
      this.inventory_container.style.display = "none";
    }

    if (this.renderInventory) {
      this.renderBackpack();
      this.renderHeroSection();
      this.renderStatsSection();
			this.renderInventory = false;
    }
  }

  // GRAPHICAL PART // GRAPHICAL PART
}