class Item {
    constructor(itemName, itemDescription, itemDurability, itemMaxDurability, additionalHealth, jumpIncrease, pushResistance, special, sprite, emoji, type) {
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
        this.type = type;
    }
}

function ItemGenerator() {
    let items = [];

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
            '🗡️', // emoji
            'left_arm' //type
        )
    );
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
            '🔰', // emoji
            'right_arm' //type
        )
    );
    items.push(
        new Item(
            "Great Helmet", // name
            "Nice helmet.", // description
            100, // durability
            100, // maxDurability
            10, // additionalHealth 
            0.5, // jumpIncrease
            10, // pushResistance
            "Damage Reflection", // special
            "./img/itemExample.png", // sprite
            '⛑️', // emoji
            'head' //type
        )
    );
    items.push(
        new Item(
            "Simple T-shirt", // name
            "Your basic T-shirt", // description
            10, // durability
            60, // maxDurability
            1, // additionalHealth 
            0.0, // jumpIncrease
            2, // pushResistance
            "Damage Reflection", // special
            "./img/itemExample.png", // sprite
            '🎽', // emoji
            'body' //type
        )
    );
    items.push(
        new Item(
            "Fancy Shoes", // name
            "Your basic T-shirt", // description
            100, // durability
            150, // maxDurability
            10, // additionalHealth 
            2.5, // jumpIncrease
            10, // pushResistance
            "Damage Reflection", // special
            "./img/itemExample.png", // sprite
            '👞', // emoji
            'legs' // type
        )
    );
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