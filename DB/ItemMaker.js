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

// Example usage:
let swordOfValor = generateItem("Sword of Valor", 75, 100, 20, 1.5, 30, "Fire Damage");
let shieldOfAegis = generateItem("Shield of Aegis", 50, 100, 50, 0, 70, "Damage Reflection");

console.log(swordOfValor);
console.log(shieldOfAegis);