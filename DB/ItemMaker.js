function generateItem(itemName, itemDurability, itemMaxDurability, additionalHealth, jumpIncrease, pushResistance, special) {
    let item = {
        itemName: itemName,
        itemDurability: itemDurability,
        itemMaxDurability: itemMaxDurability,
        itemStats: {
            additionalHealth: additionalHealth,
            jumpIncrease: jumpIncrease,
            pushResistance: pushResistance,
            special: special
        }
    };

    return item;
}