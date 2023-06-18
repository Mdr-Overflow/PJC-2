class Item {
    constructor(itemName, itemDescription, itemDurability, itemMaxDurability, additionalHealth, jumpIncrease, pushResistance, special, sprite) {
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemDurability = itemDurability;
        this.itemMaxDurability = itemMaxDurability;
        this.itemStats = {
            additionalHealth: additionalHealth,
            jumpIncrease: jumpIncrease,
            pushResistance: pushResistance,
            special: special
        };
        this.sprite = new InventoryItemSprite({
            position: { x: sprite.x, y: sprite.y },
            imageSrc: "./img/itemExample.png",
            boxSize: sprite.boxSize
        });
    }
}

function ItemGenerator() {
    let items = [];
    for (let i = 0; i < 12; i++) {
        if (i % 2 === 0) {
            items.push(
                new Item(
                    "Sword of Valor",
                    "A legendary sword that shines with a valorous light.",
                    75,
                    100,
                    20,
                    1.5,
                    30,
                    "Fire Damage",
                    "./img/itemExample.png"
                )
            );
        } else {
            items.push(
                new Item(
                    "Shield of Aegis",
                    "A sturdy shield that provides excellent protection.",
                    50,
                    100,
                    50,
                    0,
                    70,
                    "Damage Reflection",
                    "./img/itemExample.png"
                )
            );
        }
    }
    return items;
}

// ItemStore class
class ItemStore {
    constructor() {
        this.items = ItemGenerator();
    }

    getItem(name) {
        for (let item of this.items) {
            if (item.itemName === name) {
                return item;
            }
        }
        return null;  // Return null if the item is not found
    }
}