class Item {
    constructor(itemName, itemDescription, itemDurability, itemMaxDurability, additionalHealth, jumpIncrease, pushResistance, special, sprite, emoji) {
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
        this.emoji = emoji;
    }
}

function ItemGenerator() {
    let items = [];
    for (let i = 0; i < 12; i++) {
        if (i % 2 === 0) {
            items.push(
                new Item(
                    "Sword of Valor", // name
                    "A legendary sword that shines with a valorous light.", // description
                    75, // durability
                    100, // maxDurability
                    20, // additionalHealth 
                    1.5, // jumpIncrease
                    30, // pushResistance
                    "Fire Damage", // special
                    "./img/itemExample.png", // sprite
                    '🗡️' // emoji

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
                    "./img/itemExample.png",
                    '🔰'
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